// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function sendSearch(bang) {
  var url = "https://duckduckgo.com/?q=" + bang + "+";
  return function(info, tab) {
    var selectedText = info.selectionText;
    chrome.tabs.create({"url" : url + encodeURIComponent(selectedText)});
  }
}

// Create one test item for each context type.

// only care about context menu for selection:

var bangs = [["!g" , "Google"],
             ["!m" , "Google Maps"],
             ["!gi", "Google Images"],
             ["!yt", "YouTube"],
             ["!a" , "Amazon"], 
             ["!w" , "Wikipedia"],
             ["!n" , "News"],
             ["!tpb", "Pirate Bay"],
             ["!so", "Stack Overflow"],
             ["!crunchbase", "Crunchbase"]
             
             ];

var parent = chrome.contextMenus.create({
    "title": "!bang search",
    "contexts" : ["selection"]});
             
for (var i = 0; i < bangs.length; i++) {
    bang = bangs[i][0];
    title = bangs[i][1];
    var child = chrome.contextMenus.create({
        "title": title, 
        "parentId": parent,
        "contexts" : ["selection"],
        "onclick" : sendSearch(bang)
    });
}

