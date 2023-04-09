setTheme();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.args === 'clicked') {
        setTheme('clicked');
    }
});
function setTheme(parameter) {
    var domain = window.location.hostname.replace('www.', '');
    let notRequiredDomains = ['apple.com', 'youtube.com', 'instagram.com', 'bing.com', 'localhost'];
    if (!notRequiredDomains.includes(domain)) {
        let current = JSON.parse(localStorage.getItem('darkModeData'));
        console.log(current);
        if (parameter === 'clicked') {
            if (current === null || !current) {
                localStorage.setItem('darkModeData', JSON.stringify({}));
                current = {};
            }
            if (Object.keys(current).length === 0) {
                let data = { domain: domain, isDark: true };
                localStorage.setItem('darkModeData', JSON.stringify(data));
            } else {
                current.isDark = !current.isDark;
                localStorage.setItem('darkModeData', JSON.stringify(current));
            }
        }
        var theme = current === null || current.isDark ? 'invert(1)' : 'invert(0)';
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
    }
}
function mapTheme(parameter, theme) {
    let elements = document.querySelectorAll(parameter);
    for (let t = 0; t < elements.length; t++) {
        elements[t].style.filter = theme;
    }
}
