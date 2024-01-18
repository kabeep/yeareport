import type { BackgroundColor, ForegroundColor, Modifiers } from 'chalk';

export type ChalkStyle = typeof BackgroundColor | typeof ForegroundColor | typeof Modifiers;
