// background.js
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({todoList: []}, function() {
        console.log('Todo list is initialized.');
    });
});

