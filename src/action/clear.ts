import fs from 'node:fs';
import path from 'node:path';
import { cacheDir } from '../constant';
import { getCacheFiles } from '../util';

function clear() {
    const caches = getCacheFiles();

    for (const filename of caches) {
        fs.unlinkSync(path.resolve(cacheDir, filename));
    }
}

export default clear;
