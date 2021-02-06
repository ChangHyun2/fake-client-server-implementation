import Server from "../internet/Server";
import { TimeoutPromise } from "../utils/TimeoutPromise";
import Card from "./model/Card";

require("./MyDB");

const server = new Server({ domain: "localhost", scheme: "http" });
server.listen(3000, () => console.log("listening 3000 port..."));
server.get("/posts", async (req, res) => {
  const data = await TimeoutPromise((res, rej) => res(3), 1000);
  res.json({
    posts: ["a", "b", "c"],
    data
  });
});
