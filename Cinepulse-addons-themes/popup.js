const themeFiles = {
  themeViolet: "style.css",
  themeCyber: "ocean-dark.css",
  themeSunset: "fire-dark.css"
};

chrome.storage.sync.get('lastTheme', data => {
  if (data.lastTheme) {
    document.getElementById(data.lastTheme).classList.add('active');
  }
});

Object.keys(themeFiles).forEach(themeId => {
  const button = document.getElementById(themeId);
  button.addEventListener('click', () => {
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    chrome.storage.sync.set({ themeEnabled: themeId, lastTheme: themeId }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTabId = tabs[0].id;
        Object.values(themeFiles).forEach(file => {
          chrome.scripting.removeCSS({ target: { tabId: activeTabId }, files: [file] });
        });
        chrome.scripting.insertCSS({
          target: { tabId: activeTabId },
          files: [themeFiles[themeId]]
        });
      });
    });
  });
});

document.getElementById('themeDefault').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    Object.values(themeFiles).forEach(file => {
      chrome.scripting.removeCSS({ target: { tabId }, files: [file] });
    });
    chrome.storage.sync.remove(['themeEnabled', 'lastTheme']);
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  });
});
