'use strict';

/**
 * Register a callback function with the commands api, which will be called when
 * one of our registered commands is detected.
 */
chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var url = tabs[0].url, newURL;
    if (command === 'previous-page') {
      newURL = getAndDecreseLastNumber(url);
    } else if (command === 'next-page') {
      newURL = getAndIncreaseLastNumber(url);
    }
    if (url.toLowerCase() === newURL.toLowerCase()) {
      alert("This URL doesn't have sequence/number at the end. \nPlease try this extension on valid URL ending with number.");
    } else {
      chrome.tabs.update(tabs[0].id, { url: newURL });
    }
  });
});

/**
* Get and decrease the last number of the url string
* @param {function(string)} str - URL String encoded
*/
function getAndDecreseLastNumber(str) {
  return str.replace(/(\d+)(?!.*\d)/, function (s) {
    var beforeLength = s.length;
    var updatedVal = parseInt(s) - 1;
    if (updatedVal > 0) {
      var afterLength = updatedVal.toString().length;
      if (afterLength < beforeLength) {
        for (var i = 0; i < beforeLength - afterLength; i++) {
          updatedVal = '0' + updatedVal;
        }
      }
      s = updatedVal;
    }
    return s;
  });
}

/**
* Get and increase the last number of the url string
* @param {function(string)} str - URL String encoded
*/
function getAndIncreaseLastNumber(str) {
  return str.replace(/(\d+)(?!.*\d)/, function (s) {
    var beforeAddlen = s.length;
    s = parseInt(s) + 1;
    var afterAddLen = s.toString().length;
    if (afterAddLen < beforeAddlen) {
      for (var i = 0; i < beforeAddlen - afterAddLen; i++) {
        s = '0' + s;
      }
    }
    return s;
  });
}
