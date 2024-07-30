setTheme();
chrome.runtime.onMessage.addListener(function (request) {
  if (request.args === "clicked") {
    setTheme("clicked");
  }
});

var intervalId;
var isDomainExcluded = domainExcluded();
var isDarkModeOn =
  JSON.parse(localStorage.getItem("darkModeService")) === true &&
  !isDomainExcluded;

if (isDarkModeOn) {
  runService("start");
} else {
  runService("stop");
}
function setTheme(parameter) {
  const currentUrl = window.location.href;
  // Check if the URL ends with .pdf
  const isPdf = currentUrl.toLowerCase().endsWith(".pdf");
  var darkMode = JSON.parse(localStorage.getItem("darkModeService"));
  var newDomain = JSON.parse(localStorage.getItem("darkModeService")) === null;
  if (parameter === "clicked") {
    darkMode = newDomain ? true : !darkMode;
    localStorage.setItem("darkModeService", darkMode);

    if (darkMode && !isDomainExcluded) runService("start");
    else runService("stop");
    if (isDomainExcluded) {
      alert(
        "The website is either already set to the optimal configuration or has a dark theme option in-built."
      );
    }
  }
  if (!isPdf && darkMode && !isDomainExcluded) {
    if (document.body) {
      // Apply inversion filter to the entire page
      const darkThemeStyles = `
  body {
    filter: invert(1) hue-rotate(180deg);
    background-color: #121212; 
  }
  img, video, iframe, embed, .fa, .responsive-player, #navbar-main, #navFooter,
  .colordivbig, .colordvaline, .colordivb, .colordiv, .preview, path, .color,
  .hero-image, #document-container, .lazyloaded, .footer-navigation, .site-footer,
  .imgHolder, [style*=".jpg"], [style*=".jpeg"], [style*=".png"], [style*=".gif"],
  img[src*=".jpg"], img[src*=".jpeg"], img[src*=".png"], img[src*=".gif"],.picker {
    filter: invert(1) hue-rotate(180deg); 
  }
`;
      document.addEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      let styleSheet = document.getElementById("dark-theme-styles");
      if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "dark-theme-styles";
        styleSheet.type = "text/css";
        document.body.appendChild(styleSheet);
      }
      styleSheet.innerText = darkThemeStyles;
    }
  } else {
    const styleSheet = document.getElementById("dark-theme-styles");
    if (styleSheet) {
      styleSheet.remove();
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    }
  }
}
function runService(action) {
  if (action == "start") {
    intervalId = setInterval(function () {
      setTheme();
    }, 100);
  } else {
    clearInterval(intervalId);
  }
}

// Function to handle fullscreen changes
const handleFullscreenChange = () => {
  const isFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  if (isFullscreen) {
    document.querySelectorAll("video, iframe").forEach((el) => {
      el.style.filter = "none"; // Ensure correct styling for fullscreen elements
    });
  } else {
    document.querySelectorAll("video, iframe").forEach((el) => {
      el.style.filter = "invert(1) hue-rotate(180deg)"; // Ensure correct styling for fullscreen elements
    });
  }
};

function domainExcluded() {
  const currentUrl = window.location.href;
  var hostname = new URL(currentUrl).hostname.toLowerCase();
  const domainParts = hostname.split(".").reverse();
  if (domainParts.length >= 2) {
    hostname = domainParts[1];
  }
  console.log(hostname);
  var exclusionList = [
    "google",
    "youtube",
    "x",
    "reddit",
    "facebook",
    "instagram",
    "canva",
    "github",
    "whatsapp",
    "slack",
    "trello",
    "spotify",
    "chatgpt",
    "apple",
    "coinmarketcap",
    "w3schools",
  ];
  return exclusionList.some((domainName) => domainName == hostname);
}
