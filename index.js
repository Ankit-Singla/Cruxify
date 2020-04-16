var crux = document.getElementById('crux');
crux.value = chrome.extension.getBackgroundPage().document.getElementById('crux').value;

var win = window;

// function download(filename, text) {
//     var element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', filename);

//     element.style.display = 'none';
//     document.body.appendChild(element);

//     element.click();

//     document.body.removeChild(element);
// }

// document.getElementById("download-button").addEventListener("click", function(){
//     download('crux.txt', crux.value);
// }, false);


// part-2

// function download(filename, text) {
//     var element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', filename);

//     element.style.display = 'none';
//     document.body.appendChild(element);
//     return element;
// }

// document.getElementById("download-button").addEventListener("click", function(){
//     download('crux.txt', crux.value).then(function(element) {
//     	crux.value = '';
//     	win.close();
//     });
// }, false);


// part-3

// document.getElementById("download-button").addEventListener("click", function(){
// 	var filename = 'crux.txt';
// 	var text = crux.value;

//     var promise = new Promise(function(resolve, reject) {
// 		var element = document.createElement('a');
// 	    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
// 	    element.setAttribute('download', filename);

// 	    element.style.display = 'none';
// 	    document.body.appendChild(element);

// 	    element.click();

// 	    document.body.removeChild(element);

// 	    resolve();
// 	});

// 	promise.then(function(result) {
// 		crux.value = '';
// 		win.close();
// 	}).catch(function(error) {
//   		console.log("Failed!", error);
// 	})
// }, false);



// part-4

document.getElementById("download-button").addEventListener("click", function() {

	console.log('download button clicked!');

	var blob = new Blob([crux.value], {type: "text/plain"});

	console.log('blob created!');

	var url = URL.createObjectURL(blob);

	console.log('url: '+url);

	chrome.downloads.download({
    	url: url,
    	filename: 'crux.txt',
    	conflictAction: "uniquify"
    });
});

chrome.downloads.onChanged.addListener(function (downloadDelta) {
	crux.value = '';
	win.close();
});

// chrome.downloads.onCreated.addListener(function(item) {
	
// 	console.log('onCreated!');
// 	while(item.state != "complete") {

// 	}

// 	crux.value = '';
// });
