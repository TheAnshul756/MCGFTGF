var btn = document.getElementById("getModal");
btn.onclick = function () {
    console.log("button clicked");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "get-modal"});
    });
}