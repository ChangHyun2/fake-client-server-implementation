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
  };
  this.Router = function Router(server, path, cb) {
    this.server = server;
    this.path = path;
    this.callback = cb;
    this.catch = async (request) => {
      const client = request.headers.host;

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
              console.log(message);
              message.body = JSON.stringify(json);
              message.headers.server = server;
              resolve(message);
            },
            status: (code) => {
              message.status = code;
            },
            setHeaders: (headers) =>
              (message.headers = { ...message.headers, ...headers })
          };

          try {
            this.callback(message, resolver);
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
  network.push(this);
}

export default Server;
