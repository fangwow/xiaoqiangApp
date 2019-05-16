var __webSocket = function(callback) {
    var url = "ws://192.168.31.171:8081/websocket/" + localStorage.userId
    var webSocket;
    var commWebSocket;
    if ("WebSocket" in window) {
        webSocket = new WebSocket(url);
        //连通之后的回调事件
        webSocket.onopen = function () {
            //webSocket.send( document.getElementById('username').value+"已经上线了");
            console.log("已经连通了websocket");
        };

        //接收后台服务端的消息
        webSocket.onmessage = function (evt) {
            callback(evt)
        };

        //连接关闭的回调事件
        webSocket.onclose = function () {
            console.log("连接已关闭...");
        };
    }
    else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }

    function closeWebSocket() {
        //直接关闭websocket的连接
        webSocket.close();
    }

    function send() {
        var message = 'message'
        webSocket.send(JSON.stringify(message));
    }

    var connection = function() {
        websocket = new WebSocket(url);
    }
    var count = 0
    var MAX = 1000
    var newWebsocket = function() {
        count = count + 1
        log("reconnection...【" + count + "】")
        //1与服务器已经建立连接
        if (count >= MAX || websocket.readyState == 1) {
            clearTimeout(t)
        } else {
            //2已经关闭了与服务器的连接
            if (websocket.readyState == 3) {
                connection()
            }
            //0正尝试与服务器建立连接,2正在关闭与服务器的连接
            t = setTimeout(function() {
                newWebsocket()
            }, 5000);
        }
    }
    return {
        closeWebSocket: closeWebSocket,
        send: send,
    }
}