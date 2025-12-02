import { getLeapMonth, toSolar } from '@kabeep/lunar-date-fns';
import { execSync } from 'node:child_process';
import { workingDir } from '../constant';
import type { Argv } from '../type';
import { Fail } from './exception';
import getUsernameOfGitConfig from './get-username-of-git-config';

function getRepoLog(argv: Argv) {
    try {
        const {
            since = getFirstDayOfThisYear(argv.lunar),
            before = getLastDayOfThisYear(argv.lunar),
            author: originalAuthor,
        } = argv;

        const author =
            originalAuthor === 'auto'
                ? getUsernameOfGitConfig()
                : `${(originalAuthor && `--author=${originalAuthor}`) || ''}`;

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

function getFirstDayOfThisYear(isLunar = false) {
    const year = new Date().getFullYear();
    if (isLunar) {
        const date = toSolar({
            year,
            month: 1,
            day: 1,
            isLeapMonth: getLeapMonth(year) === 1,
        });
        if (date === -1) throw new Fail('Can not get the first day of the lunar year');

        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    return `${year}-01-01`;
}

function getLastDayOfThisYear(isLunar = false) {
    const year = new Date().getFullYear();
    if (isLunar) {
        const date = toSolar({
            year: year + 1,
            month: 1,
            day: 1,
            isLeapMonth: getLeapMonth(year) === 1,
        });
        if (date === -1) throw new Fail('Can not get the first day of the lunar year');
        const lastDay = new Date(+date - 24 * 60 * 60 * 1000);

        return `${lastDay.getFullYear()}-${lastDay.getMonth() + 1}-${lastDay.getDate()}`;
    }

    return `${year}-12-31`;
}

export default getRepoLog;
