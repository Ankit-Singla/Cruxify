chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.event == "copy") {
			var clipboardAccessor = document.getElementById('clip');
			
			// prevents accidentally copying the same piece of text twice
			var previousPaste = clipboardAccessor.value;
			clipboardAccessor.value = "";

			clipboardAccessor.focus();
			document.execCommand('paste');
			var copiedText = clipboardAccessor.value;

			// currently copied text is same as previously copied text, return
			if(copiedText.localeCompare(previousPaste) == 0) {
				return true;
			}

			var crux = document.getElementById('crux');
			crux.value += (copiedText+"\n");
		}
		sendResponse({});
	}
);
