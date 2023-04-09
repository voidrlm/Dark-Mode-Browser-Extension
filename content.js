setTheme();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.args === 'clicked') {
        setTheme('clicked');
    }
});
function setTheme(parameter) {
    var domain = window.location.hostname.replace('www.', '');
}
function mapTheme(parameter, theme) {
    let elements = document.querySelectorAll(parameter);
    for (let t = 0; t < elements.length; t++) {
        elements[t].style.filter = theme;
    }
}
