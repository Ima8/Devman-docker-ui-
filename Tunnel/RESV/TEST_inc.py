import httplib

sip = "128.199.93.151"
port = "7331"
conn = httplib.HTTPConnection(sip + ":" + port)
cmd = "pwd"
flow = "{\"text\":\"MTI3LjAuMC4x ODA= dW5kZWZpbmVk\"}"
conn.request("POST", "/", flow)
response = conn.getresponse()
conn.close()

print(response.read())