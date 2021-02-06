import Client from "./internet/Client";
import http from "./internet/http";

const client = new Client("http://localhost:5000");
window.client = client;
client.fetch = async (server, options = {}) => {
  const { method = "GET", headers = {}, body = {} } = options;
  const host = {
    origin: window.client.origin
  };
  const message = {
    method,
    headers: {
      host,
      // browser default headers...
      ...headers
    },
    body: JSON.stringify(body)
  };

  const { origin, path } = server;
  try {
    const response = await http({ origin, path }, message);
    return {
      raw: response,
      json: () => JSON.parse(response.body)
    };
  } catch (e) {
    throw new Error(e);
  }
};
