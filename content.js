chrome.runtime.onMessage.addListener(
	function(request, sender) {
		switch(request.action) {
			case "messageFromBackground":
//				console.log("message from background: ", request.data);
				break;
			case "messageFromPopup":
//				console.log("message from popup", request.data);
				break;
			case "refreshPage":
				window.location.reload();
				break;
			case "obscurePage":
                console.log("OBSCURE PAGE!");
                var cover = document.createElement("div");
                cover.style.height = "100%";
                cover.style.width = "100%";
                cover.style.position = "fixed";
                cover.style.top = "0px"
                cover.style.left = "0px";
                cover.innerHTML = "&nbsp;";
                cover.style.zIndex = 100000;
                cover.style.backgroundColor = "#ddd";
                cover.style.textAlign = "left";
                cover.style.padding = "10%";
                document.body.appendChild(cover);
                var btn = document.createElement("button");
                btn.style.fontSize = "3em";
                btn.style.padding = "5%";
                btn.innerHTML = "Show";
                btn.onclick = () => {
                    cover.parentNode.removeChild(cover);
                };
                cover.appendChild(btn);
				break;
            default:
                break;
	}
});

//// Send a message from content to background
setTimeout(function() {
    chrome.runtime.sendMessage({action: "runOnTabFocus"}, function(response) {});
    window.addEventListener("focus", () => {
        chrome.runtime.sendMessage({action: "runOnTabFocus"}, function(response) {});
    });
}, 100);
