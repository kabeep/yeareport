function baseGetLocale () {
    let locale;

    if (global.chrome && global.chrome.runtime && typeof global.chrome.runtime.getManifest === 'function') {
        locale = global.chrome.runtime.getManifest();
        if (locale && locale.current_locale) {
            return locale.current_locale;
        }
    }

    locale = (global.navigator && (
        (global.navigator.languages && global.navigator.languages[0]) ||
        global.navigator.language ||
        global.navigator.userLanguage
    ));

    if (!locale && global.navigator && global.navigator.userAgent) {
        locale = global.navigator.userAgent.match(/;.(\w+-\w+)/i);
        if (locale) return locale[1];
    }

    if (!locale) {
        locale = (global.clientInformation || Object.create(null)).language;
    }

    if (!locale) {
        if (global.Intl && typeof global.Intl.DateTimeFormat === 'function') {
            locale =
                global.Intl.DateTimeFormat().resolvedOptions && global.Intl.DateTimeFormat().resolvedOptions().locale;
        }
        if (!locale && ['LANG', 'LANGUAGE'].some(Object.hasOwnProperty, process.env)) {
            return (process.env.LANG || process.env.LANGUAGE || String())
                .replace(/[.:].*/, '')
                .replace('_', '-');
        }
    }
    return locale;
}

module.exports =  function () {
    return baseGetLocale().split('-').shift();
}
