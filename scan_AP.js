var wifiscanner = require('node-wifiscanner');
var http = require('http');
var post_options = {
     hostname: 'ENTER_IP',
     port: 80,
     path: '/pi',
     method: 'POST',
     headers: {'Content-Type': 'application/json'}
};
// Static Variables 
var node1 = {
            rssi: 0,
            ssid: 0
};
var node2 = {
            rssi: 0,
            ssid: 0
};
var node3 = {
            rssi: 0,
            ssid: 0
};
// Please adjust the interval(in miliseconds) 
setInterval(function() {
    wifiscanner.scan(function(err, data) {
        if (err) {
                console.log("Error : " + err);
                return;
        }
    filter_AP(data); // filter access point
    var arr = [];
    arr.push(node1); arr.push(node2); arr.push(node3);
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
        });
    });
    if (arr[0].rssi != 0)
    {
        post_req.write(JSON.stringify(arr));
        post_req.end();
    }
    });     
}, 500);


function filter_AP(data) {

    for (i=0; i<data.length; i++) {
        if (data[i].ssid == 'Node1') {
            node1.ssid = data[i].ssid;
            node1.rssi = data[i].rssi;
        }
        if (data[i].ssid == 'Node2') {
            node2.ssid = data[i].ssid;
            node2.rssi = data[i].rssi;
        }
        if (data[i].ssid == 'Node3') {
            node3.ssid = data[i].ssid;
            node3.rssi = data[i].rssi;
        }
    }
}




