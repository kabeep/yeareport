import intersection from 'lodash.intersection';
import startCase from 'lodash.startcase';
import fs from 'node:fs';
import path from 'node:path';
import { cacheDir, downloadDir, PrettyEmoji, workingDir } from '../constant';
import type { Argv } from '../type';
import type { LogLineRecord } from '../util';
import { Fail, getCacheFiles, getLogLineRecord, Markdown, readByLine } from '../util';

type InvertedIndex = Record<'type' | 'month' | 'date', Record<string, number[]>>;

async function printer(argv: Argv) {
    const { pretty, output, appendType = [] } = argv;

    const cacheFiles = getCacheFiles();

    const { collection, invertedIndex } = await createReader(appendType)(cacheFiles);

    const file = defaultMarkdown(
        new Markdown(),
        collection,
        invertedIndex,
        pretty,
    ).value();

    const filename = `annualize_${Date.now()}.md`;

    if (output) {
        const outputPath = path.resolve(workingDir, output);
        const isDir = fs.statSync(outputPath).isDirectory();
        if (isDir) {
            fs.writeFileSync(path.resolve(outputPath, filename), file, 'utf-8');
        } else {
            throw new Fail(`${outputPath} is not a directory`);
        }
    } else {
        fs.writeFileSync(path.resolve(downloadDir, filename), file, 'utf-8');
    }
}

function defaultMarkdown(
    md: Markdown,
    collection: LogLineRecord[],
    invertedIndex: Record<string, InvertedIndex & { count: number }>,
    pretty = false,
) {
    for (const [project, projectInvertedIndexes] of
        Object.entries<InvertedIndex & { count: number }>(invertedIndex)) {
        md = md.title(
            1,
            `${project} (${projectInvertedIndexes.count})`,
            pretty && PrettyEmoji.PROJECT,
        );
        for (const [month, monthIndexes] of sortedInvertedIndexDates(
            Object.entries<number[]>(projectInvertedIndexes.month),
        )) {
            md = md.title(
                2,
                `${month} (${monthIndexes.length})`,
                pretty && PrettyEmoji.MONTH,
            );
            for (const [type, typeIndexes] of
                Object.entries<number[]>(projectInvertedIndexes.type)) {
                const indexes = intersection(monthIndexes, typeIndexes);

                if (indexes.length === 0) {
                    continue;
                }

                md = md
                    .title(
                        3,
                        `${startCase(type)} (${indexes.length})`,
                        pretty
                        && (
                            PrettyEmoji[type.toUpperCase() as keyof typeof PrettyEmoji]
                            || PrettyEmoji.UNKNOWN
                        ),
                    )
                    .list(indexes.map((index) => collection[index].text));
            }
        }
    }

    return md;
}

function sortedInvertedIndexDates(dates: Array<[string, number[]]>) {
    return dates.sort(([a], [b]) => b.localeCompare(a));
}

function createReader(appendType: string[]) {
    const createInvertedIndex = (keys: Array<keyof InvertedIndex>) =>
        Object.fromEntries<Record<string, number[]>>(
            keys.map<[keyof InvertedIndex, Record<string, number[]>]>((item) => [
                item,
                {},
            ]),
        ) as InvertedIndex;

    return async (cacheFiles: string[]) => {
        const collection: LogLineRecord[] = [];

        const invertedIndex: Record<string, InvertedIndex & {
            count: number
        }> = {};

        for (const filename of cacheFiles) {
            const list = await readByLine(path.resolve(cacheDir, filename));
            const projectInvertedIndex = createInvertedIndex([
                'type',
                'month',
                'date',
            ]);

            let count = 0;
            for (const element of list) {
                const record = getLogLineRecord(element, appendType);
                if (!record) {
                    continue;
                }

                const refer = collection.length;
                collection.push(record);

                const { date, month, type } = record;
                pushToPropertyAsArray(projectInvertedIndex.type, type, refer);
                pushToPropertyAsArray(projectInvertedIndex.date, date, refer);
                pushToPropertyAsArray(projectInvertedIndex.month, month, refer);
                count++;
            }

            invertedIndex[filename] = { ...projectInvertedIndex, count };
        }

        return { collection, invertedIndex };
    };
}

function pushToPropertyAsArray(
    object: Record<string, any>,
    property: string,
    value: any,
) {
    (
        object[property] ?? (
            object[property] = []
        )
    ).push(value);
}

export default printer;
