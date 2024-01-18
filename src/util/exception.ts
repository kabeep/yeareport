import chalk, { type Chalk } from 'chalk';
import type { ChalkStyle } from '../type';
import { isString } from './index';

class Exception extends Error {
    private readonly prefix: string;

    constructor(name: string, message: string, styles: ChalkStyle | ChalkStyle[]) {
        super(message);
        this.name = name;
        this.prefix = createChain(styles)(` ${name} `);
    }

    toString() {
        return `${this.prefix} ${this.message}`;
    }
}

class Info extends Exception {
    constructor(message: string) {
        super('Info', message, ['bgBlueBright']);
    }
}

class Success extends Exception {
    constructor(message: string) {
        super('Success', message, ['bgGreen', 'black']);
    }
}

class Warning extends Exception {
    constructor(message: string) {
        super('Warning', message, ['bgYellow', 'black']);
    }
}

class Fail extends Exception {
    constructor(message: string) {
        super('Error', message, ['bgRed', 'black']);
    }
}

function createChain(styles: string | string[] = [], chain?: Chalk) {
    const isArray = Array.isArray(styles);
    const isILLegal = !isArray && !isString;

    if (isILLegal) throw new TypeError('Unexpected style input for function createChain');

    isString(styles) && (styles = [styles]);

    const style = styles.pop()!;
    const isEmpty = styles.length === 0;

    let nextChain = createPalette(chain || chalk, style);

    if (!nextChain) {
        nextChain = chain || chalk;
        if (isEmpty) {
            console.log(`ReferenceWarn: Unexpected section ${style} for function createChain with chalk`);
        } else {
            throw new ReferenceError(`Unexpected section ${style} for function createChain with chalk`);
        }
    }

    if (isEmpty) return nextChain;
    return createChain(styles, nextChain);
}

function createPalette(chain: Chalk, style: string | ChalkStyle) {
    let nextChain;

    if (isBgRgb(style)) nextChain = chain.bgRgb(...normalizeRgb(style, 'bg:'));
    else if (isRgb(style)) nextChain = chain.rgb(...normalizeRgb(style));
    else if (isBgHex(style)) nextChain = chain.bgHex((style as string).replace(/^bg:/, ''));
    else if (isHex(style)) nextChain = chain.hex(style);
    else nextChain = chain[style as ChalkStyle];

    return nextChain;
}

function normalizeRgb(color: string, prefix = '') {
    const rgb = color.replaceAll(' ', '').replace(new RegExp(`^${prefix}`), '');
    const [r, g, b] = rgb.split(',').map(Number);
    return [r, g, b] as const;
}

function isRgb(value: string | ChalkStyle): value is string {
    const regular = /^(?:\d{1,3},){2}\d{1,3}$/;
    return regular.test(value.replaceAll(' ', ''));
}

function isBgRgb(value: string | ChalkStyle): value is string {
    const regular = /^bg:(?:\d{1,3},){2}\d{1,3}$/;
    return regular.test(value.replaceAll(' ', ''));
}

function isHex(value: string | ChalkStyle): value is string {
    const regular = /^#[\da-fA-F]{1,3}([\da-fA-F]{3})?$/;
    return regular.test(value.replaceAll(' ', ''));
}

function isBgHex(value: string | ChalkStyle): value is string {
    const regular = /^bg:#[\da-fA-F]{1,3}([\da-fA-F]{3})?$/;
    return regular.test(value.replaceAll(' ', ''));
}

export { Info, Success, Warning, Fail };
