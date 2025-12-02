import enUS from './en-US';
import zhCN from './zh-CN';
import jaJP from './ja-JP';
import hiIN from './hi-IN';
import baseGetLocale from './get-locale';

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

export default getLocale();
