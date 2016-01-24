import httplib

conn = httplib.HTTPConnection("localhost:8000")
conn.request("POST", "/testurl", "TEST_DATA")
response = conn.getresponse()
conn.close()

print(response.read())