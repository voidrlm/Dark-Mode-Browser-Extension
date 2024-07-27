setTheme();
chrome.runtime.onMessage.addListener(function (request) {
  if (request.args === "clicked") {
    setTheme("clicked");
  }
});
var intervalId;
var isDarkModeOn = JSON.parse(localStorage.getItem("darkModeService")) === true;
if (isDarkModeOn) {
  runService("start");
} else {
  runService("stop");
}
function setTheme(parameter) {
  var darkMode = JSON.parse(localStorage.getItem("darkModeService"));
  var newDomain = JSON.parse(localStorage.getItem("darkModeService")) === null;
  if (parameter === "clicked") {
    darkMode = newDomain ? true : !darkMode;
    localStorage.setItem("darkModeService", darkMode);
    if (darkMode) runService("start");
    else runService("stop");
  }

  if (darkMode) {
    if (document.body) {
      // Apply inversion filter to the entire page
      const darkThemeStyles = `
  body {
    filter: invert(1) hue-rotate(180deg);
    background-color: #121212; 
  }
  img, video, iframe, embed, .fa, .responsive-player {
    filter: invert(1) hue-rotate(180deg); /* Restore original colors for specific elements */
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
        document.head.appendChild(styleSheet);
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
    console.log(1);
    document.querySelectorAll("video, iframe").forEach((el) => {
      el.style.filter = "none"; // Ensure correct styling for fullscreen elements
    });
  } else {
    console.log(0);
    document.querySelectorAll("video, iframe").forEach((el) => {
      el.style.filter = "invert(1) hue-rotate(180deg)"; // Ensure correct styling for fullscreen elements
    });
  }
};
