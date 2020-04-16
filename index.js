var crux = document.getElementById('crux');
crux.value = chrome.extension.getBackgroundPage().document.getElementById('crux').value;

var win = window;

document.getElementById("download-button").addEventListener("click", function() {

	var blob = new Blob([crux.value], {type: "text/plain"});
	var url = URL.createObjectURL(blob);

	console.log('url: '+url);

	chrome.downloads.download({
    	url: url,
    	filename: 'crux',
    	conflictAction: "uniquify"
    });
});

chrome.downloads.onChanged.addListener(function (downloadDelta) {
	crux.value = '';
	win.close();
});
