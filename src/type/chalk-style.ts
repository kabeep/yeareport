import type { BackgroundColor, ForegroundColor, Modifiers } from 'chalk';

type DisableChalkStyle =
    | 'level'
    | 'rgb'
    | 'hex'
    | 'ansi256'
    | 'bgRgb'
    | 'bgHex'
    | 'bgAnsi256';

export type ChalkStyle = typeof BackgroundColor | typeof ForegroundColor | typeof Modifiers;
