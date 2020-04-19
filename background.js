chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		var crux = document.getElementById('crux');

		// handles copy event from content script
		if(request.event == "copy") {
			var clipboardAccessor = document.getElementById('clip');
			
			// prevents accidentally copying the same piece of text twice
			var previousPaste = clipboardAccessor.value;
			clipboardAccessor.value = "";

			// records clipboard contents inside clipboardAccessor
			clipboardAccessor.focus();
			document.execCommand('paste');
			var copiedText = clipboardAccessor.value;

			// currently copied text is same as previously copied text, return
			if(copiedText.localeCompare(previousPaste) == 0) {
				return true;
			}

			// update the crux
			crux.value += (copiedText+"\n");

		} else if(request.event == "cruxChange") { // handles crux change event from popup
			crux.value = request.data; // to record manual changes made to the crux by user
		}

		sendResponse({});
	}
);
