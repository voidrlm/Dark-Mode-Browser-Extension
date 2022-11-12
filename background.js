function switchToNightMode() {
  document.body.style.backgroundColor = "#000000";
}
chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: switchToNightMode,
    });
  }
});
