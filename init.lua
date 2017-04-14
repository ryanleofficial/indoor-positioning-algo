print("ESP8266 Server")
wifi.setmode(wifi.STATIONAP);
wifi.ap.config({ssid="Node1",pwd="12345678"}); -- Change the ssid whatever
print("Server IP Address:",wifi.ap.getip())

-- It also can be a server 
sv = net.createServer(net.TCP) 
sv:listen(80, function(conn)
   conn:on("receive", function(conn, receivedData) 
       print("Received Data: " .. receivedData)         
   end) 
    conn:on("sent", function(conn) 
     collectgarbage()
    end)
end)
