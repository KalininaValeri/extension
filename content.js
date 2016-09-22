function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function addMessage(data) {
    var div = document.createElement('div');
    var button = document.createElement('button');
    document.body.appendChild(div);
    div.innerHTML = '<p>' + data.messageProcessed + '</p>';
    div.appendChild(button);
    button.innerText = 'Закрыть';
    div.style.cssText = '' +
        'background: red;' +
        'width: 200px;' +
        'height: 150px;' +
        'position: fixed;' +
        'right: 0%;' +
        'bottom: 0%;' +
        'z-index: 1000;' +
        'color: yellow !important;';

    button.addEventListener('click', function () {
        div.remove();
        setCookie('closeMessage', true);
    })
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var countMessage;

        if (getCookie('closeMessage')) return;

        countMessage = Number(getCookie('countMessage'));

        if (countMessage > 2) return;

        setCookie('countMessage', ++countMessage);

        addMessage(request);
    }
);

