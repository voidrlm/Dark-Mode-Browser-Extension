setTheme();
chrome.runtime.onMessage.addListener(function (request) {
    if (request.args === 'clicked') {
        setTheme('clicked');
    }
});
var darkModeInvoker = JSON.parse(localStorage.getItem('darkModeService')) === true;
var newDomain = JSON.parse(localStorage.getItem('darkModeService')) === null;

if (darkModeInvoker || newDomain) {
    console.log(`%c${getDomain() + ': DARK MODE SERVICE RUNNING...'}`, 'background: #FFFF00; color: #000000');
    setInterval(function () {
        setTheme();
    }, 500);
}

function setTheme(parameter) {
    var darkModeInvoker = JSON.parse(localStorage.getItem('darkModeService')) === true;
    var newDomain = JSON.parse(localStorage.getItem('darkModeService')) === null;
    var domain = getDomain();
    let notRequiredDomains = [
        'apple.com',
        'localhost',
        'twitter.com',
        'imgur.com',
        'udemy.com',
        'linkedin.com',
        'netflix.com',
        'outlook.live.com',
        'quora.com',
        'bing.com',
        'finance.yahoo.com',
        'open.spotify.com',
        'wetransfer.com',
        'nbc.com',
        'chess.com',
        'genius.com',
        'wazirx.com',
        'opensea.io',
        'nasdaq.com',
        'investing.com',
    ];
    let inbuildDarkThemeDomains = [
        'youtube.com',
        'github.com',
        'instagram.com',
        'stackoverflow.com',
        'developer.mozilla.org',
        'superuser.com',
        'discord.com',
        'chat.openai.com',
        'freecodecamp.org',
        'facebook.com',
        'web.whatsapp.com',
        'twitch.tv',
        'reddit.com',
        'tradingview.com',
        'w3schools.com',
        'kite.zerodha.com',
    ];
    if (parameter === 'clicked') {
        if (newDomain) {
            localStorage.setItem('darkModeService', false);
        } else {
            darkModeInvoker = !darkModeInvoker;
            localStorage.setItem('darkModeService', darkModeInvoker);
        }
    }
    if (inbuildDarkThemeDomains.includes(domain)) {
        var isLightTheme = !darkModeInvoker;
        if (newDomain) {
            setInvokerValue(true);
        }

        if (domain === 'w3schools.com') {
            if (isLightTheme) {
                document.querySelectorAll('body')[0].setAttribute('class', ' ');
                localStorage.setItem('preferredmode', 'light');
                localStorage.setItem('preferredpagemode', 'light');
            } else {
                document.querySelectorAll('body')[0].setAttribute('class', '  darktheme darkpagetheme');
                localStorage.setItem('preferredmode', 'dark');
                localStorage.setItem('preferredpagemode', 'dark');
            }
        }
        if (domain === 'kite.zerodha.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('data-theme', 'light');
                localStorage.setItem('__storejs_kite_theme', JSON.stringify('light'));
            } else {
                document.querySelectorAll('html')[0].setAttribute('data-theme', 'dark');
                localStorage.setItem('__storejs_kite_theme', JSON.stringify('dark'));
            }
        }
        if (domain === 'youtube.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].removeAttribute('light');
                document.querySelectorAll('html')[0].removeAttribute('dark');
            } else {
                document.querySelectorAll('html')[0].setAttribute('dark', true);
            }
        }
        if (domain === 'github.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('data-color-mode', 'light');
                document.querySelectorAll('html')[0].setAttribute('data-light-theme', 'light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('data-color-mode', 'dark');
                document.querySelectorAll('html')[0].setAttribute('data-dark-theme', 'dark');
            }
        }
        if (domain === 'stackoverflow.com') {
            if (isLightTheme) {
                document.querySelectorAll('body')[0].setAttribute('class', 'user-page unified-theme');
            } else {
                document.querySelectorAll('body')[0].setAttribute('class', 'user-page unified-theme theme-dark');
            }
        }
        if (domain === 'superuser.com') {
            if (isLightTheme) {
                document.querySelectorAll('body')[0].setAttribute('class', 'question-page unified-theme');
            } else {
                document.querySelectorAll('body')[0].setAttribute('class', 'question-page unified-theme theme-dark');
            }
        }
        if (domain === 'developer.mozilla.org') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('class', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        }
        if (domain === 'discord.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('class', 'theme-light');
                localStorage.setItem('ThemeStore', JSON.stringify({ _state: { theme: 'light' }, _version: 0 }));
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', 'theme-dark');
                localStorage.setItem('ThemeStore', JSON.stringify({ _state: { theme: 'dark' }, _version: 0 }));
            }
        }
        if (domain === 'instagram.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('class', '_9dls js-focus-visible _aa4c');
                localStorage.setItem('igt', 'light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', '_9dls js-focus-visible _aa4d');
                localStorage.setItem('igt', 'dark');
            }
            if (parameter === 'clicked') {
                window.location.reload();
            }
        }
        if (domain === 'chat.openai.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('class', 'light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', 'dark');
            }
        }
        if (domain === 'freecodecamp.org') {
            if (isLightTheme) {
                document.querySelectorAll('body')[0].setAttribute('class', 'light-palette');
            } else {
                document.querySelectorAll('body')[0].setAttribute('class', 'dark-palette');
            }
        }
        if (domain === 'facebook.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('class', '_9dls __fb-light-mode');
                localStorage.setItem('igt', 'light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', '_9dls __fb-dark-mode');
                localStorage.setItem('igt', 'dark');
            }
            if (parameter === 'clicked') {
                window.location.reload();
            }
        }
        if (domain === 'web.whatsapp.com') {
            if (isLightTheme) {
                document.querySelectorAll('body')[0].setAttribute('class', 'web light');
                localStorage.setItem('theme', 'light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', 'web dark');
                localStorage.setItem('theme', 'body');
            }
            if (parameter === 'clicked') {
                window.location.reload();
            }
        }
        if (domain === 'twitch.tv') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('class', 'tw-root--theme-light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', 'tw-root--theme-dark');
            }
        }
        if (domain === 'reddit.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('class', 'theme-beta theme-light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', 'theme-beta theme-dark');
            }
        }
        if (domain === 'tradingview.com') {
            if (isLightTheme) {
                document.querySelectorAll('html')[0].setAttribute('class', 'theme-light');
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', 'theme-dark');
            }
        }
    } else if (!notRequiredDomains.includes(domain)) {
        var theme = newDomain || darkModeInvoker ? 'invert(1)' : 'invert(0)';
        document.documentElement.style.filter = theme;
        document.documentElement.style.backgroundColor = 'white';
        document.documentElement.style.height =
            Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight,
            ) + 'px';
        for (let e = 0; e < document.images.length; e++) {
            document.images[e].style.filter = theme;
        }

        //MAPPING STARTS ---------------------------------------
        //COMMON
        let classList = ['.btn', 'button', '.button', 'video', 'iframe', 'embed', '.img'];
        themeMapper(classList);

        //AMAZON
        if (domain.slice(0, 6) === 'amazon') {
            classList = [
                '.a-button',
                '.a-icon',
                '.navLeftFooter',
                '.action-inner',
                '.a-badge-label',
                '.a-meter-bar a-meter-filled',
                '.nav-logo-link',
                '.icp-nav-flag',
            ];
            themeMapper(classList, theme);
        }
        if (domain === 'moneycontrol.com') {
            classList = ['.green', '.red', '.changea', '.advBar', '.d', '.c', '.grntxt', '.rdtxt'];
            themeMapper(classList, theme);
        }
        if (domain === 'nseindia.com') {
            classList = [
                '.lowVal',
                '.highVal',
                '.greenTxt',
                '.redTxt',
                '.arrowIndicator',
                '.arrow',
                '#advances',
                '#declines',
                '.highcharts-point',
                '.highcharts-color-1',
                '.multi_arrows_up',
                '.multi_arrows_down',
                '#livepreopenadvances',
                '#liveMrkStockAdv',
                '#livepreopendeclines',
                '#liveMrkStockDec',
            ];
            themeMapper(classList, theme);
        }
    } else {
        setInvokerValue(false);
        console.log(`%c${'DARK MODE - IGNORED'}`, 'background: #FFFF00; color: #000000');
    }
}

function mapTheme(parameter, theme) {
    let elements = document.querySelectorAll(parameter);
    for (let t = 0; t < elements.length; t++) {
        elements[t].style.filter = theme;
    }
}

function setInvokerValue(value) {
    localStorage.setItem('darkModeService', value);
}
function getDomain() {
    let domain = window.location.hostname.replace('www.', '');
    domain = domain.replace('in.', '');
    domain = domain.replace('us.', '');
    domain = domain.replace('eu.', '');
    return domain;
}

function themeMapper(elementList, theme) {
    for (let i = 0; i < elementList.length; i++) {
        mapTheme(elementList[i], theme);
    }
}
