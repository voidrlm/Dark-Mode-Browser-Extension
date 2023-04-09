setTheme();
addListen();
chrome.runtime.onMessage.addListener(function (request) {
    if (request.args === 'clicked') {
        setTheme('clicked');
    }
});
function addListen() {
    document.body.addEventListener('click', setTheme);
    document.body.addEventListener('keyup', setTheme);
    document.body.addEventListener('scroll', setTheme);
    document.body.addEventListener('mousemove', setTheme);
}

function setTheme(parameter) {
    var domain = window.location.hostname.replace('www.', '');
    domain = domain.replace('in.', '');
    domain = domain.replace('us.', '');
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
    ];
    let current = JSON.parse(localStorage.getItem('darkModeData'));
    if (parameter === 'clicked') {
        if (!current) {
            localStorage.setItem('darkModeData', JSON.stringify({}));
            current = {};
        }
        if (current === null || Object.keys(current).length === 0) {
            let data = { domain: domain, isDark: true };
            localStorage.setItem('darkModeData', JSON.stringify(data));
        } else {
            current.isDark = !current.isDark;
            localStorage.setItem('darkModeData', JSON.stringify(current));
        }
    }
    if (inbuildDarkThemeDomains.includes(domain)) {
        var isLightTheme = current === null || !current.isDark;
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
            } else {
                document.querySelectorAll('html')[0].setAttribute('class', 'dark');
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
        var theme = current === null || current.isDark ? 'invert(1)' : 'invert(0)';
        var dark = current !== null && current.isDark;
        document.documentElement.style.filter = theme;
        document.documentElement.style.backgroundColor = 'black';
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
