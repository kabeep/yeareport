import { execSync } from 'node:child_process';
import { workingDir } from '../constant';
import { Fail } from './exception';

function getUsernameOfGitConfig() {
    const throwError = () => {
        throw new Fail('Git username does not exists');
    };

    try {
        const username = execSync('git config --global user.name', {
            encoding: 'utf-8',
            cwd: workingDir,
            stdio: 'pipe',
        });

        if (!username) {
            throwError();
        }

        return username.trim();
    } catch {
        throw new Fail('Can not get username of git from global config');
    }
}

export default getUsernameOfGitConfig;
