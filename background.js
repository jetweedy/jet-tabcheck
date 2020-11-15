
//// This all runs the first time the page is loaded:

var DATA = {};
//// Initialize storage DATA.FocusCheckStatus by getting/setting if necessary
////chrome.storage.sync.get(["Keys","to","fetch"], function(toPerformOnThisReturnedVar) {
chrome.storage.sync.get([], function(data) {
	DATA = data;
	if (typeof DATA.FocusCheckStatus == "undefined") { DATA.FocusCheckStatus = false; }
	//// This line is necessary anywhere else that data is updated later
	////chrome.storage.sync.set({"Key":DATA.ValueForKey}, function () { /**/ });
	chrome.storage.sync.set({"FocusCheckStatus":DATA.FocusCheckStatus}, function () { /**/ });
});



//// Listen for messages
chrome.runtime.onMessage.addListener(
	function(request, sender) {
		switch(request.action) {
            case "setZoomCheckActive":
				if (typeof DATA.FocusCheckStatus == "undefined") { DATA.FocusCheckStatus = false; }
                DATA.FocusCheckStatus = request.status;
                chrome.storage.sync.set({"FocusCheckStatus":DATA.FocusCheckStatus}, function () { /**/ });
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {action: "refreshPage", data:DATA.FocusCheckStatus}, function(response) {});  
                    
				});
                break;
			case "runOnTabFocus":
				//// Increment the DATA.FocusCheckStatus variable (to demonstrate a persistent change)
				if (typeof DATA.FocusCheckStatus == "undefined") { DATA.FocusCheckStatus = false; }
                if (DATA.FocusCheckStatus) {
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                        chrome.tabs.sendMessage(tabs[0].id, {action: "obscurePage"}, function(response) {});  
                    });
                }
//				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//					chrome.tabs.sendMessage(tabs[0].id, {action: "messageFromBackground", data:DATA.FocusCheckStatus}, function(response) {});  
//				});
				break;
             default:
                break;
	}
});





