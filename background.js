chrome.browserAction.onClicked.addListener(function(tab) {
	getCurrentTabUrl(function(url) {
		var newURL = getAndIncrementLastNumber(url);
		if(url.toLowerCase() === newURL.toLowerCase()) {
			alert("This URL doesn't have sequence/number at the end");
		}
		else {
			chrome.tabs.update(tab.id, {url: newURL});
		}
	});    
});

/**
* Get and increment the last number of the url string
* @param {function(string)} str - URL String encoded
*/
function getAndIncrementLastNumber(str) {
	//(/\d+)(?!.*/\d)
	// /\d+$/
    return str.replace(/\d+$/, function(s) {
        return +s+1;
    });
}

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
	var url = tab.url;
    //var url = encodeURIComponent(tab.url);

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}