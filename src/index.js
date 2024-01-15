import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import groupBy from 'lodash.groupby';
import startCase from 'lodash.startcase';

import operator from './operator.js';
import { Fail } from './exception.js';

const workingDir = process.cwd();
const downloadDir = path.resolve(process.env.HOME, 'Downloads');
const cacheDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../', '.cache');

async function yeareport (action) {
    const { type, ...rest } = action;

    const hasCacheDir = fs.existsSync(cacheDir);
    !hasCacheDir && fs.mkdirSync(cacheDir);

    switch (type) {
        case operator.ADD.name:
            return await handleAdd(rest);
        case operator.REMOVE.name:
            return handleRemove();
        case operator.CLEAR.name:
            return handleClear();
        case operator.PRINT.name:
            return handlePrint(rest);
        case operator.SHOW.name:
            return handleShow();
        default:
            throw new Fail('operator less!');
    }
}

async function handleAdd (argv) {
    const { overwrite = false } = argv;

    const repo = getRepoName();
    const log = getRepoLog(argv);
    const filePath = path.resolve(cacheDir, repo);

    const isExists = fs.existsSync(filePath);
    if (isExists && !overwrite)
        throw new Fail('File does exists, please remove first');
    else {
        overwrite && isExists && fs.unlinkSync(filePath);
        fs.writeFileSync(filePath, log, 'utf-8');
    }
}

function handleRemove () {
    const repo = getRepoName();
    const filePath = path.resolve(cacheDir, repo);
    if (fs.existsSync(filePath))
        fs.unlinkSync(filePath);
    else
        throw new Fail(`${filePath} does not exist`);
}

function handleClear () {
    const caches = getCacheList();

    for (const filename of caches) {
        fs.unlinkSync(path.resolve(cacheDir, filename));
    }
}

function handlePrint (argv) {
    const { pretty, typeFirst, typeOnly, output } = argv;

    const caches = getCacheList()

    let md;
    if (typeFirst)
        md = printMdByTypeFirst(caches, pretty);
    else if (typeOnly)
        md = printMdByTypeOnly(caches, typeOnly);
    else
        md = printMd(caches, pretty);

    if (output) {
        const outputPath = path.resolve(workingDir, output)
        const isDir = fs.statSync(outputPath).isDirectory();
        if (isDir)
            fs.writeFileSync(path.resolve(outputPath, getMdName(typeOnly)), md, 'utf-8');
        else
            throw new Fail(`${outputPath} is not a directory`);
    } else {
        fs.writeFileSync(
            path.resolve(downloadDir, getMdName(typeOnly)),
            md,
            'utf-8',
        )
    }
}

function getMdName (typeOnly) {
    return `yeareport_${typeOnly ? `${startCase(typeOnly)}Only_` : ''}${+new Date()}.md`
}

function prettyType (type, isPretty) {
    if (!isPretty) return type;

    const symbols = {
        feat: '🎉',
        chore: '🧹',
        fix: '🐞',
        perf: '🚀',
        enhance: '🌟',
        refactor: '🔨',
        to: '🧩',
        bump: '⚙️',
        initial: '📦',
    }

    return `${symbols[type.toLowerCase()]} ${type}`;
}

function printMd (caches, pretty) {
    const collection = Object.create({});

    for (const filename of caches) {
        const content = fs.readFileSync(path.resolve(cacheDir, filename), { encoding: 'utf-8' });
        collection[filename] = groupBy(content.split('\n').map(getLogRecord).filter(Boolean), 'type');
    }

    let md = '';
    for (const [filename, bunch] of Object.entries(collection)) {
        md += getMdWithNewLine(`# ${filename}`);

        for (const [type, list] of Object.entries(bunch)) {
            md += getMdWithNewLine(`## ${prettyType(type, pretty)} (${list?.length || 0})`);
            list.forEach(rec => {
                md += getMdWithNewLine(`- ${rec?.date}: ${rec?.desc}`);
            });
        }
    }
    return md;
}

function printMdByTypeFirst (caches, pretty) {
    const collection = Object.create({});

    for (const filename of caches) {
        const content = fs.readFileSync(path.resolve(cacheDir, filename), { encoding: 'utf-8' });
        content.split('\n').filter(Boolean).forEach(item => {
            const record = getLogRecord(item);
            if (record) {
                !collection[record.type] && (collection[record.type] = {});
                !collection[record.type][filename] && (collection[record.type][filename] = []);
                collection[record.type][filename].push(record);
            }
        });
    }

    let md = '';
    for (const [type, bunch] of Object.entries(collection)) {
        md += getMdWithNewLine(`# ${prettyType(type, pretty)}`);

        for (const [filename, list] of Object.entries(bunch)) {
            md += getMdWithNewLine(`## ${filename} (${list?.length || 0})`);
            list.forEach(rec => {
                md += getMdWithNewLine(`- ${rec?.date}: ${rec?.desc}`);
            });
        }
    }
    return md;
}

function printMdByTypeOnly (caches, type) {
    const collection = Object.create({});

    for (const filename of caches) {
        const content = fs.readFileSync(path.resolve(cacheDir, filename), { encoding: 'utf-8' });
        content.split('\n').filter(Boolean).forEach(item => {
            const record = getLogRecord(item);
            record?.type?.toLowerCase() === type?.toLowerCase() && (collection[filename] || (collection[filename] = [])).push(record);
        });
    }

    let md = '';
    for (const [filename, list] of Object.entries(collection)) {
        md += getMdWithNewLine(`# ${filename} (${list?.length || 0})`);

        list.forEach(rec => {
            md += getMdWithNewLine(`- ${rec?.date}: ${rec?.desc}`);
        });
    }
    return md;
}

function handleShow () {
    return getCacheList();
}

function getMdWithNewLine (msg) {
    return `${msg || ''}

`;
}

function getLogRecord (content) {
    if (!content) return null;

    const match = content.match(/(\d{4}-\d{2}-\d{2})(.*)/);
    const date = match?.[1] || 'unknown-date';
    const title = match?.[2] || '';

    const signs = ['feat', 'chore', 'fix', 'perf', 'enhance', 'refactor', 'to', 'Bump', 'Initial'];
    const regular = new RegExp(`^(${signs.join('|')}):?(.*)`, 'i');
    const descMatch = title.trim().match(regular);
    const type = descMatch?.[1];
    const desc = descMatch?.[2];
    return type && desc ? { date, type: startCase(type), desc: desc.trim() } : null;
}

function getCacheList () {
    return fs.readdirSync(cacheDir, { encoding: 'utf-8' });
}

function getRepoName () {
    try {
        const repoPath = execSync('git rev-parse --show-toplevel', {
            encoding: 'utf-8',
            cwd: workingDir,
            stdio: 'pipe',
        }).trim();

        return path.basename(repoPath);
    } catch (_) {
        throw new Fail('Directory is not a repository for git');
    }
}

function getRepoLog (argv) {
    try {
        const { date = getLastYearFirstDay(), username = getGitUsername() } = argv;

        const gitCommand = `git log --pretty="format:%ad %s" --date="format:%F" --author ${username} --since=${date}`;
        return execSync(`${gitCommand}`, {
            encoding: 'utf-8',
            cwd: workingDir,
            stdio: 'pipe',
        });
    } catch (_) {
        throw new Fail('Can not get history of log from repository');
    }
}

function getGitUsername () {
    const throwError = () => { throw new Fail('Git username does not exists') };

    try {
        const username = execSync('git config --global user.name', {
            encoding: 'utf-8',
            cwd: workingDir,
            stdio: 'pipe',
        });

        if (!username)
            throwError();

        return username.trim();
    } catch (_) {
        throw new Fail('Can not get username of git from global config');
    }
}

function getLastYearFirstDay () {
    const year = new Date().getFullYear() - 1;
    return `${year}-01-01`;
}

export { operator };

export default yeareport;
