var crux = document.getElementById('crux');
crux.value = chrome.extension.getBackgroundPage().document.getElementById('crux').value;

var win = window;

document.getElementById("download-button").addEventListener("click", function() {
	// hides the download shelf while saving the crux to the local filesystem
	chrome.downloads.setShelfEnabled(false);

	var blob = new Blob([crux.value], {type: "text/plain"});
	var url = URL.createObjectURL(blob);
	console.log('url: '+url);

	// tries to download the crux file
	chrome.downloads.download({
    	url: url,
    	filename: 'crux',
    	conflictAction: "uniquify" // appends a number to filename to resolve filename conflict 
    							   // if filename already exists in the download directory chosen by the user
    });
});

// either download was successful or was interrupted
chrome.downloads.onChanged.addListener(function (downloadDelta) {
	// enables the download shelf for future downloads
	chrome.downloads.setShelfEnabled(true);

	// download has completed successfully
	if(downloadDelta.state.current == "complete") {
		// clear the crux value stored in the background page
		chrome.extension.getBackgroundPage().document.getElementById('crux').value = '';

		// clears the crux and shuts the popup window
		crux.value = '';
		win.close();
	}
});

// crux change event sends a message to background script to record manual changes to crux by the user
crux.addEventListener('change', function() {
	chrome.extension.sendMessage({event: "cruxChange", data: crux.value});
});
