from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer

ADDR = "localhost"
PORT = 8000

class RequestHandler(BaseHTTPRequestHandler):        
    def do_POST(self):
        length = int(self.headers['Content-length'])
        print self.rfile.read(length)
        self.send_response(200, "OK")
        self.end_headers()
        self.wfile.write("serverdata")

httpd = HTTPServer((ADDR, PORT), RequestHandler)
httpd.serve_forever()