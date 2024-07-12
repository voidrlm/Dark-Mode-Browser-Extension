setTheme();
chrome.runtime.onMessage.addListener(function (request) {
    if (request.args === 'clicked') {
        setTheme('clicked');
    }
});
var intervalId;
var isDarkModeOn = JSON.parse(localStorage.getItem('darkModeService')) === true;
if (isDarkModeOn) {
    runService('start');
} else {
    runService('stop');
}
function setTheme(parameter) {
    var darkMode = JSON.parse(localStorage.getItem('darkModeService'));
    var newDomain = JSON.parse(localStorage.getItem('darkModeService')) === null;
    if (parameter === 'clicked') {
        darkMode = newDomain ? true : !darkMode;
        localStorage.setItem('darkModeService', darkMode);
        if (darkMode) runService('start');
        else runService('stop');
    }

    var theme = darkMode ? 'invert(1)' : 'invert(0)';
    document.documentElement.style.filter = theme;
    document.documentElement.style.backgroundColor = 'white';
    if (document.body) {
        updateHeight();
        updateImages(theme);
    }
    let elementList = ['img', 'video', 'iframe', 'embed', 'fa', 'responsive-player'];
    let prefixedElementList = elementList.map((element) => `.${element}`);
    let combinedList = [...elementList, ...prefixedElementList];
    themeMapper(combinedList, theme);
}
function runService(action) {
    if (action == 'start') {
        intervalId = setInterval(function () {
            setTheme();
        }, 100);
    } else {
        clearInterval(intervalId);
    }
}
function updateHeight() {
    let newHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
    );
    if (typeof updateHeight.prevHeight === 'undefined') {
        updateHeight.prevHeight = newHeight;
    }
    if (newHeight != updateHeight.prevHeight) {
        document.documentElement.style.height = newHeight + 'px';
        updateHeight.prevHeight = newHeight;
    }
}

function updateImages(theme) {
    let imagesCount = document.images.length;
    if (typeof updateImages.prevCount === 'undefined') {
        updateImages.prevCount = imagesCount;
    }
    if (imagesCount != updateImages.prevCount) {
        for (let e = 0; e < document.images.length; e++) {
            document.images[e].style.filter = theme;
        }
        updateImages.prevCount = imagesCount;
    }
}
function themeMapper(elementList, theme) {
    for (let i = 0; i < elementList.length; i++) {
        mapTheme(elementList[i], theme);
    }
}

function mapTheme(parameter, theme) {
    let elements = document.querySelectorAll(parameter);
    for (let t = 0; t < elements.length; t++) {
        elements[t].style.filter = theme;
    }
}
