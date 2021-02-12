// example
import { Server, Client, http } from "./internet";
import { TimeoutPromise } from "./utils";

const exampleServer = new Server({ domain: "localhost", scheme: "http" });
exampleServer.listen(4000, () => console.log("listening 4000 port..."));
exampleServer.get("/nums", async (req, res) => {
  try {
    const nums = await TimeoutPromise((res) => res([1, 2, 3, 4]), 1000);
    res.json(nums);
  } catch (e) {
    res.json({ status: 400, message: "error" });
  }
});

const exampleClient = new Client("http://localhost:6000");
window.exampleClient = exampleClient;

exampleClient.fetch = async (server, options = {}) => {
  const { method = "GET", headers = {}, body = {} } = options;
  const host = {
    origin: window.exampleClient.origin
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

window.exampleClient
  .fetch(
    {
      origin: "http://localhost:4000",
      path: "/nums"
    },
    {
      method: "GET"
    }
  )
  .then((res) => res.json())
  .then((data) => console.log(data, "asdasdsa"))
  .catch((e) => {
    throw new Error(e);
  });
