function updateList(data) {
    $('li').remove();

    data.forEach(function (item) {
        $('ul').append(
            '<li><a href="http://' + item.domain + '" target="_blank">' + item.name + '</a></li>'
        );
    })
}

$(document).ready(function () {
    var port = chrome.extension.connect({name: "Sample Communication"});

    port.postMessage(" 111Hi BackGround");
    port.onMessage.addListener(function(data) {
        console.log('data', data);
        updateList(data);
    });


});



