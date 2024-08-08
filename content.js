setTheme();
chrome.runtime.onMessage.addListener(function (request) {
  if (request.args === "clicked") {
    setTheme("clicked");
  }
});
var currentDomain = getDomain();
var htmlBg;
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
      htmlBg = window.getComputedStyle(
        document.documentElement
      ).backgroundColor;
      console.log(htmlBg);
      var elementsToIgnore = `
       img,
      svg,
      video,
      iframe,
      embed,
      article,
      .fa,
      .preview,
      picture,
      path,
      nav,
      footer,
      [class*="footer"],
      [class*="avatar"],
      [style*="png"],
      .redTxt,
      .greenTxt,
      .rdtxt,
      .grntxt,
      .advBar,
      .slick-slider,
      .arrow_class,
      #navbar,
      #navFooter,
      #globalHeader,
      .picker,
      .imgHolder,
      canvas,
      .bg-light,
      #main-banner-wrapper,
      .priceChange,
      .percent-change,
      .sparkline-wrapper,
      .market-up-down,
      .positive,
      .negative,
      .index_val,
      code
    `;
      const darkThemeStyles = `
      body {
        filter: invert(1);
        background-color: #121212 !important;
      }
      .bg-light {
        background-color: #121212 !important;
        color: #FFFFFF;
      }
      ${elementsToIgnore} {
        filter: invert(1);
      }
      nav, footer {
        background: #121212;
        background-color: #121212;
        color: #FFFFFF;
      }
      code {
        filter: none;
      }
      .market-up-down,.index_val,.fk-modal-visible {
        filter: none;
      }
      .fk-modal-visible [style*="background-image"]{ 
      filter: invert(1);
      }
     .footer,footer,footer a,footer p,footer nav,.footer-bg{
      filter: none !important;
      background-color: #FFFFFF !important;
      color: #121212 !important;
      }
      [id*="cover"]{
      filter: none !important;
      }
      .feature{
      filter: invert(1);
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
      el.style.setProperty("filter", "none", "important"); // Ensure correct styling for fullscreen elements
    });
  } else {
    document.querySelectorAll("video, iframe").forEach((el) => {
      el.style.filter = "invert(1)"; // Ensure correct styling for fullscreen elements
    });
  }
};
function getDomain() {
  const currentUrl = window.location.href;
  var hostname = new URL(currentUrl).hostname.toLowerCase();
  const domainParts = hostname.split(".").reverse();
  if (domainParts.length >= 2) {
    hostname = domainParts[1];
  }
  return hostname;
}

function domainExcluded() {
  console.log(currentDomain);
  currentDomain = getDomain();
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
    "geeksforgeeks",
    "mozilla",
    "stackoverflow",
    "figma",
    "tradingview",
    "ndtv",
    "sciencenews",
    "usnews",
    "chartjs",
    "vuetifyjs",
    "westerndigital",
    "gopro",
    "theverge",
    "firstpost",
    "anydesk",
    "techspot",
    "yahoo",
    "hotstar",
    "netflix",
    "leetcode",
    "jio",
    "max",
    "primevideo",
    "hulu",
    "twitch",
  ];
  return exclusionList.some((domainName) => domainName == currentDomain);
}
