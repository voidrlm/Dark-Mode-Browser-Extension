function switchToNightMode() {
  chrome.storage.sync.get("dark", (t) => {
    console.log(t);
    if (!t.dark) {
      console.log("Dark");
      document.documentElement.style.filter = "invert(1)";
      document.documentElement.style.backgroundColor = "black";
      document.documentElement.style.height =
        Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        ) + "px";
      for (let e = 0; e < document.images.length; e++) {
        document.images[e].style.filter = "invert(1)";
      }
      let e = document.querySelectorAll("video");
      for (let t = 0; t < e.length; t++) {
        e[t].style.filter = "invert(1)";
      }

      chrome.storage.sync.set({ dark: 1 });
    } else {
      console.log("Light");
      document.documentElement.style.filter = "invert(0)";
      document.documentElement.style.backgroundColor = "";
      for (let e = 0; e < document.images.length; e++) {
        document.images[e].style.filter = "invert(0)";
      }
      let e = document.querySelectorAll("video");
      for (let t = 0; t < e.length; t++) {
        e[t].style.filter = "invert(0)";
      }
      chrome.storage.sync.set({ dark: 0 });
    }
  });
}
chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: switchToNightMode,
    });
  }
});
