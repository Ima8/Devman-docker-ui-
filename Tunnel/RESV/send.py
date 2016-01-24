import httplib
from os import system
from urllib2 import urlopen

def send_cmd(ip, port, scmd):
    #sip = "127.0.0.1"
    conn = httplib.HTTPConnection(ip + ":" + port)
    conn.request("POST", "/", scmd)
    conn.close()
send_cmd(raw_input(), raw_input(), raw_input())