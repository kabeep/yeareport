import chalk, { Chalk } from 'chalk';
import type { ChalkStyle } from '../type';
import { isString } from './index';

class Exception extends Error {
    private readonly prefix: string;

    constructor (name: string, message: string, styles: ChalkStyle | ChalkStyle[]) {
        super(message);
        this.name = name;
        this.prefix = createChain(styles)(` ${name} `);
    }

    toString () {
        return `${this.prefix} ${this.message}`;
    }
}

class Info extends Exception {
    constructor (message: string) {
        super('Info', message, ['bgBlueBright']);
    }
}

class Success extends Exception {
    constructor (message: string) {
        super('Success', message, ['bgGreen', 'black']);
    }
}

class Warning extends Exception {
    constructor (message: string) {
        super('Warning', message, ['bgYellow', 'black']);
    }
}

class Fail extends Exception {
    constructor (message: string) {
        super('Error', message, ['bgRed', 'black']);
    }
}

function createChain (styles: string | string[] = [], chain?: Chalk) {
    const isArray = Array.isArray(styles);
    const isILLegal = !isArray && !isString;

    if (isILLegal)
        throw new TypeError('Unexpected style input for function createChain');

    isString(styles) && (
        styles = [styles]
    );

    const style = (
        styles as string[]
    ).pop() as string;
    const isEmpty = !styles.length;

    let nextChain = createPalette(chain || chalk, style);

    if (!nextChain) {
        nextChain = chain || chalk;
        if (!isEmpty)
            throw new ReferenceError(`Unexpected section ${style} for function createChain with chalk`);
        else
            console.log(`ReferenceWarn: Unexpected section ${style} for function createChain with chalk`);
    }

    if (isEmpty)
        return nextChain;
    else
        return createChain(styles, nextChain);
}

function createPalette (chain: Chalk, style: string | ChalkStyle) {
    let nextChain;

    if (isBgRgb(style))
        nextChain = chain.bgRgb(...normalizeRgb(style, 'bg:'));
    else if (isRgb(style))
        nextChain = chain.rgb(...normalizeRgb(style));
    else if (isBgHex(style))
        nextChain = chain.bgHex((
            style as string
        ).replace(/^bg:/, ''));
    else if (isHex(style))
        nextChain = chain.hex(style);
    else
        nextChain = chain[style as ChalkStyle];

    return nextChain;
}

function normalizeRgb (color: string, prefix = '') {
    const str = color.replace(/\s/g, '').replace(new RegExp(`^${prefix}`), '');
    const [r, g, b] = str.split(',').map(Number);
    return [r, g, b] as const;
}

function isRgb (value: string | ChalkStyle): value is string {
    const regular = /^(?:\d{1,3},){2}\d{1,3}$/;
    return regular.test(value.replace(/\s/g, ''));
}

function isBgRgb (value: string | ChalkStyle): value is string {
    const regular = /^bg:(?:\d{1,3},){2}\d{1,3}$/;
    return regular.test(value.replace(/\s/g, ''));
}

function isHex (value: string | ChalkStyle): value is string {
    const regular = /^#[0-9a-fA-F]{1,3}([0-9a-fA-F]{3})?$/;
    return regular.test(value.replace(/\s/g, ''));
}

function isBgHex (value: string | ChalkStyle): value is string {
    const regular = /^bg:#[0-9a-fA-F]{1,3}([0-9a-fA-F]{3})?$/;
    return regular.test(value.replace(/\s/g, ''));
}

export { Info, Success, Warning, Fail };
