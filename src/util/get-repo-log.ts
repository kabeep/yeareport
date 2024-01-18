import { execSync } from 'node:child_process';
import { workingDir } from '../constant';
import type { Argv } from '../type';
import { Fail } from './exception';
import getUsernameOfGitConfig from './get-username-of-git-config';

function getRepoLog(argv: Argv) {
    try {
        const { since = getFirstDayOfLastYear(), before = getFirstDayOfThisYear(), author: originalAuthor } = argv;

        const author =
            originalAuthor === 'auto'
                ? getUsernameOfGitConfig()
                : `${(originalAuthor && `--author=${originalAuthor} `) || ''}`;

        const gitCommand = `git log --pretty="format:%ad %s" --date="format:%F" ${author} --since=${since} --before=${before}`;
        return execSync(`${gitCommand}`, {
            encoding: 'utf-8',
            cwd: workingDir,
            stdio: 'pipe',
        });
    } catch {
        throw new Fail('Can not get history of log from repository');
    }
}

function getFirstDayOfThisYear() {
    const year = new Date().getFullYear();
    return `${year}-01-01`;
}

function getFirstDayOfLastYear() {
    const year = new Date().getFullYear() - 1;
    return `${year}-01-01`;
}

export default getRepoLog;
