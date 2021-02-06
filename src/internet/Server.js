import network from "./network";
import http from "./http";

function Server({ scheme = "http", domain }) {
  this.domain = domain;
  this.scheme = scheme;
  this.listen = (port, callback) => {
    this.origin = `${scheme}://${domain}:${port}`;
    this.routers = {}; /*
    {
      get: {
        '/user/': (req, ,res) => { res.send('callback is executed')}
      },
      post:{},
    }
    */
    network.push(this);
    callback();
    console.log(`server ${this.origin} is connected to network`);
  };
  this.Router = function Router(server, path, cb) {
    this.server = server;
    this.path = path;
    this.callback = cb;
    this.catch = async (request) => {
      console.log("server catch request", request);
      const client = request.headers.host;

      request.body = JSON.parse(request.body);

      const resolveResponse = () =>
        new Promise((resolve, reject) => {
          const server = this.server;
          const message = { headers: { server } };
          const resolver = {
            send: (sentence) => {
              message.body = sentence;
              message.headers.server = server;
              resolve(message);
            },
            json: (json) => {
              message.body = JSON.stringify(json);
              message.headers.server = server;
              resolve(message);
            },
            status: (code) => {
              message.status = code;
              return resolver;
            },
            setHeaders: (headers) => {
              message.headers = { ...message.headers, ...headers };
              return resolver;
            }
          };

          try {
            this.callback(request, resolver);
          } catch (e) {
            reject(e);
          }
        });

      const response = await resolveResponse();

      return http(client, response);
    };
  };
  this.route = (method, path, cb) => {
    if (!this.routers[method]) {
      this.routers[method] = {};
    }

    const server = this.origin;
    this.routers[method][path] = new this.Router({ server }, path, cb);
  };
  this.get = (path, cb) => this.route("GET", path, cb);
  this.post = (path, cb) => this.route("POST", path, cb);
  this.put = (path, cb) => this.route("PUT", path, cb);
  this.delete = (path, cb) => this.route("DELETE", path, cb);
  this.patch = (path, cb) => this.route("PATCH", path, cb);
}

export default Server;
