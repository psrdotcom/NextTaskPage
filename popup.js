/*
* MIT License
* 
* Copyright (c) 2022 Suresh Raju Pilli
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/


'use strict';

let previous = document.getElementById('previous');
let next = document.getElementById('next');

previous.onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    let newURL = getAndDecreaseLastNumber(url);
    if (url.toLowerCase() === newURL.toLowerCase()) {
      console.info("This URL doesn't have sequence/number at the end. \nPlease try this extension   on valid URL ending with number.");
    } else {
      chrome.tabs.update(tabs[0].id, { url: newURL });
    }
  });
};

next.onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let url = tabs[0].url;
    let newURL = getAndIncreaseLastNumber(url);
    if (url.toLowerCase() === newURL.toLowerCase()) {
      console.info("This URL doesn't have sequence/number at the end. \nPlease try this extension on valid URL ending with number.");
    } else {
      chrome.tabs.update(tabs[0].id, { url: newURL });
    }
  });
};

/**
* Get and decrease the last number of the url string
* @param {function(string)} str - URL String encoded
*/
function getAndDecreaseLastNumber(str) {
  return str.replace(/(\d+)(?!.*\d)/, function (s) {
    let beforeLength = s.length;
    let updatedVal = parseInt(s) - 1;
    if (updatedVal > 0) {
      let afterLength = updatedVal.toString().length;
      if (afterLength < beforeLength) {
        for (let i = 0; i < beforeLength - afterLength; i++) {
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
    let beforeAddlen = s.length;
    s = parseInt(s) + 1;
    let afterAddLen = s.toString().length;
    if (afterAddLen < beforeAddlen) {
      for (let i = 0; i < beforeAddlen - afterAddLen; i++) {
        s = '0' + s;
      }
    }
    return s;
  });
}