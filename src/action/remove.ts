import fs from 'node:fs';
import path from 'node:path';
import { cacheDir } from '../constant';
import { Fail, getRepoName } from '../util';

function remove () {
    const repo = getRepoName();
    const filePath = path.resolve(cacheDir, repo);
    if (fs.existsSync(filePath))
        fs.unlinkSync(filePath);
    else
        throw new Fail(`${filePath} does not exist`);
}

export default remove;
