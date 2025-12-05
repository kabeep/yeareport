import enUS from './en-US';
import zhCN from './zh-CN';
import baseGetLocale from './get-locale';

function getLocale() {
    switch (baseGetLocale()) {
        case 'zh': {
            return zhCN;
        }

        default: {
            return enUS;
        }
    }
}

export default getLocale();
