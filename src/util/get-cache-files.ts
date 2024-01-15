import fs from 'node:fs';
import { cacheDir } from '../constant';

function getCacheFiles (): string[] {
    return fs.readdirSync(cacheDir, { encoding: 'utf-8' });
}

export default getCacheFiles;
