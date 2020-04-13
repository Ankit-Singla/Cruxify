chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.event == "copy") {
			var clipboardAccessor = document.getElementById('clip');
			clipboardAccessor.focus();
			document.execCommand('paste');
			var copiedText = clipboardAccessor.value;
			// log
			console.log("copied text: "+copiedText);

			var crux = document.getElementById('crux');
			crux.value += (copiedText+"\n");
			//log
			console.log("crux value: "+crux.value);

			clipboardAccessor.value = "";
		}
		sendResponse({}); // synchronous [use "return true;" to asynchronously send response]
	}
);
