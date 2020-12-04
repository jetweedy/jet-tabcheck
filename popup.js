
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //// Do stuff when the popup comes up:
    //// e.g. Send a message to the content script:
    //	chrome.tabs.sendMessage(tabs[0].id, {action: "messageFromPopup", data:"popping up!"}, function(response) {});  
});


document.addEventListener('DOMContentLoaded', function () {
	//// Fetch the background page and run a callback on it within this page
	chrome.runtime.getBackgroundPage(function(bg) {
        document.querySelector("#cbZoomActive").checked = bg.DATA.FocusCheckStatus;
	});
    //// Send a message to the background to save a new status whenever the box is checked/unchecked:
    document.querySelector("#cbZoomActive").onchange = function() {
        chrome.runtime.sendMessage({action: "setZoomCheckActive", status:this.checked}, function(response) {});
    };
});
