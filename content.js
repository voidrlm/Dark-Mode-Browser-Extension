setTheme();
chrome.runtime.onMessage.addListener(function (request) {
    if (request.args === 'clicked') {
        setTheme('clicked');
    }
});
var darkModeInvoker = JSON.parse(localStorage.getItem('darkModeService')) === true;
var newDomain = JSON.parse(localStorage.getItem('darkModeService')) === null;

if (darkModeInvoker || newDomain) {
    console.log(`%c${'DARK MODE SERVICE RUNNING...'}`, 'background: #FFFF00; color: #000000');
    setInterval(function () {
        setTheme();
    }, 100);
}

function setTheme(parameter) {
    var darkModeInvoker = JSON.parse(localStorage.getItem('darkModeService')) === true;
    var newDomain = JSON.parse(localStorage.getItem('darkModeService')) === null;
    var domain = window.location.hostname.replace('www.', '');
    domain = domain.replace('in.', '');
    domain = domain.replace('us.', '');
    domain = domain.replace('eu.', '');
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
        mapTheme('.btn', theme);
        mapTheme('button', theme);
        mapTheme('.button', theme);
        mapTheme('video', theme);
        mapTheme('iframe', theme);
        mapTheme('embed', theme);
        mapTheme('.img', theme);
        //AMAZON
        if (domain.slice(0, 6) === 'amazon') {
            mapTheme('.a-button', theme);
            mapTheme('.a-icon', theme);
            mapTheme('.navLeftFooter', theme);
            mapTheme('.action-inner', theme);
            mapTheme('.icp-nav-flag', theme);
            mapTheme('.nav-logo-link', theme);
            mapTheme('.a-meter-bar a-meter-filled', theme);
            mapTheme('.a-badge-label', theme);
        }
        if (domain === 'moneycontrol.com') {
            mapTheme('.rdtxt', theme);
            mapTheme('.grntxt', theme);
        }
    }
}

function mapTheme(parameter, theme) {
    let elements = document.querySelectorAll(parameter);
    for (let t = 0; t < elements.length; t++) {
        elements[t].style.filter = theme;
    }
}
function customFontColor(parameter, color = 'rgb(255, 255, 255)') {
    document.querySelectorAll(parameter).forEach((e) => (e.style.color = color));
}

function customBackgroundColor(parameter, color = 'rgb(0, 0, 0)') {
    document.querySelectorAll(parameter).forEach((e) => (e.style.backgroundColor = color));
}

function setInvokerValue(value) {
    localStorage.setItem('darkModeService', value);
}
