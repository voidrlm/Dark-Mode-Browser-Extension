chrome.action.onClicked.addListener((tab) => {
    if (!tab.url.includes('chrome://')) {
        chrome.tabs.sendMessage(tab.id, { args: 'clicked' }, function (response) {
            console.log(response);
        });
    }
});
