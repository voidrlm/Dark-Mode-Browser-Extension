setTheme();
addListen();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.args === 'clicked') {
        setTheme('clicked');
    }
});
function addListen() {
    document.body.addEventListener('keyup', setTheme);
    document.body.addEventListener('scroll', setTheme);
    document.body.addEventListener('mousemove', setTheme);
}

function setTheme(parameter) {
    var domain = window.location.hostname.replace('www.', '');
    let notRequiredDomains = ['apple.com', 'bing.com', 'localhost', 'twitter.com', 'imgur.com', 'udemy.com'];
    let inbuildDarkThemeDomains = [
        'youtube.com',
        'github.com',
        'instagram.com',
        'stackoverflow.com',
        'developer.mozilla.org',
        'superuser.com',
        'discord.com',
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

        //AMAZON
        if (domain === 'amazon.com' || domain === 'amazon.in') {
            mapTheme('.a-button', theme);
            mapTheme('.a-icon', theme);
            mapTheme('.navLeftFooter', theme);
            mapTheme('.action-inner', theme);
            mapTheme('.icp-nav-flag', theme);
            mapTheme('.nav-logo-link', theme);
        }

        //COMMON
        mapTheme('.btn', theme);
        mapTheme('button', theme);
        mapTheme('.button', theme);
        mapTheme('video', theme);
        mapTheme('iframe', theme);
        mapTheme('embed', theme);
        mapTheme('.img', theme);
    }
}
function mapTheme(parameter, theme) {
    let elements = document.querySelectorAll(parameter);
    for (let t = 0; t < elements.length; t++) {
        elements[t].style.filter = theme;
    }
}
function customFontColor(parameter, color) {
    let elements = document.querySelectorAll(parameter);
    for (let t = 0; t < elements.length; t++) {
        elements[t].style = 'color:' + color + ' !important;';
    }
}
