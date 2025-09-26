chrome.storage.sync.get(['themeEnabled', 'lastTheme'], data => {
  if (data.themeEnabled) {
    const themeFiles = {
      themeViolet: "style.css",
      themeCyber: "ocean-dark.css",
      themeSunset: "fire-dark.css"
    };

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL(themeFiles[data.themeEnabled]);
    document.head.appendChild(link);
  }
});
