const enUS = require('./en-US.js');
const zhCN = require('./zh-CN.js');
const jaJP = require('./ja-JP.js');
const hiIN = require('./hi-IN');
const baseGetLocale = require('./get-locale.js');

function getLocale() {
    switch (baseGetLocale()) {
        case 'zh': {
            return zhCN;
        }

        case 'hi': {
            return hiIN;
        }

        case 'ja': {
            return jaJP;
        }

        default: {
            return enUS;
        }
    }
}

module.exports = getLocale();
