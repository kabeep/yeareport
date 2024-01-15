import { execSync } from 'node:child_process';
import { workingDir } from '../constant';
import type { Argv } from '../type';
import { Fail } from './exception';
import getLastYearFirstDay from './get-first-day-of-last-year';
import getUsernameOfGitConfig from './get-username-of-git-config';

function getRepoLog (argv: Argv) {
    try {
        const { date = getLastYearFirstDay(), username = getUsernameOfGitConfig() } = argv;

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

export default getRepoLog;
