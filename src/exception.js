import chalk from 'chalk'

class Exception extends Error {
    constructor (name, message, styles) {
        super(message);
        this.name = name;
        this.prefix = createChain(styles)(` ${name} `);
    }

    toString () {
        return `${this.prefix} ${this.message}`;
    }
}

class Info extends Exception {
    constructor (message) {
        super('Info', message, ['bgBlueBright'])
    }
}

class Success extends Exception {
    constructor (message) {
        super('Success', message, ['bgGreen', 'black'])
    }
}

class Warning extends Exception {
    constructor (message) {
        super('Warning', message, ['bgYellow', 'black']);
    }
}

class Fail extends Exception {
    constructor (message) {
        super('Error', message, ['bgRed', 'black'])
    }
}

function createChain (styles = [], chain) {
    const isArray = Array.isArray(styles);
    const isString = typeof styles === 'string';
    const isILLegal = !isArray && !isString;

    if (isILLegal)
        throw new TypeError('Unexpected style input for function createChain')

    if (!isArray)
        styles = [styles];

    const style = styles.pop();
    const isEmpty = !styles.length;

    let nextChain = createPalette(chain, style);

    if (!nextChain) {
        nextChain = chain;
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

function createPalette (chain, style) {
    let nextChain;

    if (isBgRgb(style))
        nextChain = (chain || chalk).bgRgb(...normalizeRgb(style, 'bg:'));
    else if (isRgb(style))
        nextChain = (chain || chalk).rgb(...normalizeRgb(style));
    else if (isBgHex(style))
        nextChain = (chain || chalk).bgHex(style.replace(/^bg:/, ''));
    else if (isHex(style))
        nextChain = (chain || chalk).hex(style);
    else
        nextChain = (chain || chalk)[style];

    return nextChain;
}

function normalizeRgb (style, prefix = '') {
    const str = style.replace(/\s/g, '').replace(new RegExp(`^${prefix}`), '');
    const strList = str.split(',');
    return strList.map(Number);
}

function isRgb (style) {
    const regular = /^(?:\d{1,3},){2}\d{1,3}$/;
    return regular.test(style.replace(/\s/g, ''));
}

function isBgRgb (style) {
    const regular = /^bg:(?:\d{1,3},){2}\d{1,3}$/;
    return regular.test(style.replace(/\s/g, ''));
}

function isHex (style) {
    const regular = /^#[0-9a-fA-F]{1,3}([0-9a-fA-F]{3})?$/;
    return regular.test(style.replace(/\s/g, ''));
}

function isBgHex (style) {
    const regular = /^bg:#[0-9a-fA-F]{1,3}([0-9a-fA-F]{3})?$/;
    return regular.test(style.replace(/\s/g, ''));
}

export { Info, Success, Warning, Fail };
