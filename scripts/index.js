console.log("hey!");

window.onload = () => {
    var peer = new SimplePeer({
        initiator: location.hash === "#1",
        trickle: false
    });

    peer.on("signal", function (data) {
        console.log("Take me down to new york city, where the yorks are new and the city is city");
        document.getElementById("yourId").value = JSON.stringify(data);
    });

    document.getElementById("connect").addEventListener("click", function () {
        var otherId = JSON.parse(document.getElementById("otherId").value);
        peer.signal(otherId);
    });

    document.getElementById("send").addEventListener("click", function () {
        var yourMessage = document.getElementById("yourMessage").value;
        peer.send(yourMessage);
    });

    peer.on("data", function (data) {
        document.getElementById("messages").textContent += data + "\n";
    });
};