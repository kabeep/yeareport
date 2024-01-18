import fs from 'node:fs';
import { add, clear, printer, remove, show } from './action';
import { cacheDir, Operator } from './constant';
import type { Argv } from './type';
import { Fail } from './util';

type Action = {
    type: Operator;
} & Argv;

async function yeareport(action: Action) {
    const { type, ...rest } = action;

    const hasCacheDir = fs.existsSync(cacheDir);
    !hasCacheDir && fs.mkdirSync(cacheDir);

    switch (type) {
        case Operator.ADD: {
            await add(rest);
            return;
        }

        case Operator.REMOVE: {
            remove();
            return;
        }

        case Operator.CLEAR: {
            clear();
            return;
        }

        case Operator.PRINT: {
            await printer(rest);
            return;
        }

        case Operator.SHOW: {
            return show();
        }

        default: {
            throw new Fail('operator less!');
        }
    }
}

export default yeareport;
