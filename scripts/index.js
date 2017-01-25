console.log("hey!");

window.onload = () => {
    var peer = new SimplePeer({
        initiator: location.hash === "#1",
        /*config: {
            iceServers: [
                { url: 'stun:stun01.sipphone.com' },
                { url: 'stun:stun.ekiga.net' },
                { url: 'stun:stun.fwdnet.net' },
                { url: 'stun:stun.ideasip.com' },
                { url: 'stun:stun.iptel.org' },
                { url: 'stun:stun.rixtelecom.se' },
                { url: 'stun:stun.schlund.de' },
                { url: 'stun:stun.l.google.com:19302' },
                { url: 'stun:stun1.l.google.com:19302' },
                { url: 'stun:stun2.l.google.com:19302' },
                { url: 'stun:stun3.l.google.com:19302' },
                { url: 'stun:stun4.l.google.com:19302' },
                { url: 'stun:stunserver.org' },
                { url: 'stun:stun.softjoys.com' },
                { url: 'stun:stun.voiparound.com' },
                { url: 'stun:stun.voipbuster.com' },
                { url: 'stun:stun.voipstunt.com' },
                { url: 'stun:stun.voxgratia.org' },
                { url: 'stun:stun.xten.com' },
                {
                    url: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
                {
                    url: 'turn:192.158.29.39:3478?transport=udp',
                    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    username: '28224511:1379330808'
                },
                {
                    url: 'turn:192.158.29.39:3478?transport=tcp',
                    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                    username: '28224511:1379330808'
                }
            ]
        },*/
        reconnectTimer: 1000 * 5,
        trickle: false
    });

    if (SimplePeer.WEBRTC_SUPPORT) {
        console.log("WebRTC's supported, so uh, that's a first step.");
    }
    else {
        console.error("No WebRTC support in the first place lol");
        document.getElementById("messages").textContent += "Error: " + "WebRTC isn't supported on your browser/machine :(" + "\n";
    }

    if (location.hash === "#1") {
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

    peer.on("connect", function () {
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

    peer.on("close", function () {
        document.getElementById("messages").textContent += "Status: " + "Your peer just left you :( it's ok man." + "\n";
    });

    peer.on("error", function (err) {
        console.error("Encountered a peer error!");
        console.error(err);
        document.getElementById("messages").textContent += "Error: " + err + "\n";
    });
};