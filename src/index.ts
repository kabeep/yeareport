import fs from 'node:fs';

import { cacheDir, Operator } from './constant';
import type { Argv } from './type';
import { add, clear, printer, remove, show } from './action';
import { Fail } from './util';

type Action = {
    type: Operator;
} & Argv;

async function yeareport (action: Action) {
    const { type, ...rest } = action;

    const hasCacheDir = fs.existsSync(cacheDir);
    !hasCacheDir && fs.mkdirSync(cacheDir);

    switch (type) {
        case Operator.ADD:
            return await add(rest);
        case Operator.REMOVE:
            return remove();
        case Operator.CLEAR:
            return clear();
        case Operator.PRINT:
            return await printer(rest);
        case Operator.SHOW:
            return show();
        default:
            throw new Fail('operator less!');
    }
}

export default yeareport;
