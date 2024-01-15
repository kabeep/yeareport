import fs from 'node:fs';
import path from 'node:path';
import { cacheDir } from '../constant';
import type { Argv } from '../type';
import { Fail, getRepoLog, getRepoName } from '../util';

async function add (argv: Argv) {
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

export default add;
