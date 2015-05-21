var lastReceived = 0;
var isWait = false;

var fetch = function () {
    if (isWait) return;
    isWait = true;
    $.getJSON("/lp/fetch?lastReceived=" + lastReceived, function (data) {
        if (data == null) return;
        $.each(data, function (i, event) {
            switch (event.Type) {
            case 0: // JOIN
                if (event.User == $('#uname').text()) {
                    $("#chatbox li").first().before("<li>You joined the chat room.</li>");
                } else {
                    $("#chatbox li").first().before("<li>" + event.User + " joined the chat room.</li>");
                }
                break;
            case 1: // LEAVE
                $("#chatbox li").first().before("<li>" + event.User + " left the chat room.</li>");
                break;
            case 2: // MESSAGE
                $("#chatbox li").first().before("<li><b>" + event.User + "</b>: " + event.Content + "</li>");
                  //this.store.update('holditem',{id:1,profit:999999});

                break;
            }

            lastReceived = event.Timestamp;
        });
        isWait = false;
    });
}

// Call fetch every 0.5 seconds
setInterval(fetch, 500);

fetch();

