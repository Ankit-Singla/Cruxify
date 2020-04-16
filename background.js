chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.event == "copy") {
			var clipboardAccessor = document.getElementById('clip');
			clipboardAccessor.focus();
			document.execCommand('paste');
			var copiedText = clipboardAccessor.value;

			var crux = document.getElementById('crux');
			crux.value += (copiedText+"\n");

			clipboardAccessor.value = "";
		}
		sendResponse({});
	}
);
