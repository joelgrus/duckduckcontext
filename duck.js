// Code by joelgrus@gmail.com
// https://github.com/joelgrus
// feel free to use it however you like

// Given a bang (e.g. "!g") returns the onclick function
// that sends the selected text to DuckDuckGo with the bang prepended
function sendSearch(bang) {
  var url = "https://duckduckgo.com/?q=" + bang + "+";
  return function(info, tab) {
    var selectedText = info.selectionText;
    chrome.tabs.create({"url" : url + encodeURIComponent(selectedText)});
  }
}

// these are the bangs I care about
// TODO: add more bangs, allow use to choose which ones appear
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

// we only want to change the context menu for selections
var selectionContext = ["selection"];             

// parent item to hold the bangs
// TODO: create icon             
var parent = chrome.contextMenus.create({
    "title": "!bang search",
    "contexts" : selectionContext});

// for each bang, add it under the parent item    
for (var i = 0; i < bangs.length; i++) {
    bang = bangs[i][0];
    title = bangs[i][1];
    var child = chrome.contextMenus.create({
        "title": title, 
        "parentId": parent,
        "contexts" : selectionContext,
        "onclick" : sendSearch(bang)
    });
}

