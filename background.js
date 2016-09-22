var data = [];
var UserInfo;

var request = function () {
    $.ajax({
        url: "http://www.softomate.net/ext/employees/list.json",
        cache: false,
        success: function (response) {
            data = response;
        }
    });
};

request();

setInterval(request, 60 * 60 * 1000);

chrome.identity.getProfileUserInfo(function (userInfo) {
    UserInfo = userInfo;
});

var port = chrome.extension.connect({name: "Sample Communication"});
chrome.extension.onConnect.addListener(function(port) {
    port.postMessage(data);
});

chrome.tabs.onUpdated.addListener(function (tabId, changedInfo, tab) {
    var matchSite;

    if (data.length === 0) {
        return;
    }

    if (tab.status !== "complete") {
        return;
    }

    data.forEach(function (item) {
        if (tab.url.match(item.domain)) {
            matchSite = item;
            matchSite.messageProcessed = item.message.replace('%username%', UserInfo.email)
        }
    });

    if (matchSite) {
        chrome.tabs.executeScript(tabId, {
            file: 'content.js'
        }, function () {
            //console.log('executeScript complited');

            chrome.tabs.sendMessage(tabId, matchSite);
        });
    }
});

