// @ts-ignore Could not find a declaration file for module 'linebyline'.
import readLine from 'linebyline';

async function readByLine (filepath: string) {
    return new Promise<string[]>((resolve) => {
        // const collection: LogLineRecord[] = [];
        // const [projects, types, calendars] = new Array<number[]>(3).fill([]);
        const contents: string[] = [];

        const listener = readLine(filepath);

        listener.on('line', (line: string) => {
            contents.push(line);
        });

        listener.on('end', () => {
            resolve(contents);
        })
    }).catch((err) => {
        throw new Error(`${filepath} can not read because: ${err}`);
    });
}

export default readByLine;
