import { execSync } from 'node:child_process';
import path from 'node:path';
import { workingDir } from '../constant';
import { Fail } from './exception';

function getRepoName() {
    try {
        const repoPath = execSync('git rev-parse --show-toplevel', {
            encoding: 'utf-8',
            cwd: workingDir,
            stdio: 'pipe',
        }).trim();

        return path.basename(repoPath);
    } catch {
        throw new Fail('Directory is not a repository for git');
    }
}

export default getRepoName;
