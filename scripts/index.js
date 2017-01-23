console.log("hey!");

window.onload = () => {
    var peer = new SimplePeer({
        initiator: location.hash === "#1",
        trickle: false
    });

    if(SimplePeer.WEBRTC_SUPPORT) {
        console.log("WebRTC's supported, so uh, that's a first step.");
    }
    else {
        console.error("No WebRTC support in the first place lol");
        document.getElementById("messages").textContent += "Error: " + "WebRTC isn't supported on your browser/machine :(" + "\n";
    }

    if(location.hash === "#1") {
        document.getElementById("yourId").setAttribute("placeholder", "Wait a second...");
    }

    peer.on("signal", function (data) {
        console.log("Take me down to new york city, where the yorks are new and the city is city");
        document.getElementById("yourId").value = JSON.stringify(data);
    });

    document.getElementById("connect").addEventListener("click", function () {
        var otherId = JSON.parse(document.getElementById("otherId").value);
        peer.signal(otherId);
        console.log("Signalling the other guy...");
        console.log("Here's our peer object instance by the way:");
        console.log(peer);
    });

    peer.on("connect", function() {
        document.getElementById("messages").textContent += "Status: " + "Your peer just successfully connected! Tickle me upside-down and call me bamboozled, it worked!" + "\n";
    });

    document.getElementById("send").addEventListener("click", function () {
        var yourMessage = document.getElementById("yourMessage").value;
        document.getElementById("yourMessage").value = "";
        peer.send(yourMessage);
        document.getElementById("messages").textContent += "Me: " + yourMessage + "\n";
    });

    peer.on("data", function (data) {
        document.getElementById("messages").textContent += "Them: " + data + "\n";
    });

    peer.on("close", function() {
        document.getElementById("messages").textContent += "Status: " + "Your peer just left you :( it's ok man." + "\n";
    });

    peer.on("error", function (err) {
        console.error("Encountered a peer error!");
        console.error(err);
        document.getElementById("messages").textContent += "Error: " + err + "\n";
    });
};