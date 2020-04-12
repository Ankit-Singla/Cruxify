chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.event == "copy") {
			var clipboardAccessor = document.getElementById('clip');
			clipboardAccessor.focus();
			document.execCommand('paste');
			var copiedText = clipboardAccessor.value;

			var crux = document.getElementById('crux');
			crux.value += crux.value + copiedText;
		}
		sendResponse({}); // synchronous [use "return true;" to asynchronously send response]
	}
);
