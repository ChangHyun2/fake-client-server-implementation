import Server from "../internet/Server";
import { TimeoutPromise } from "../utils/TimeoutPromise";
import Card from "./model/Card";

require("./MyDB");

const server = new Server({ domain: "localhost", scheme: "http" });
server.listen(3000, () => console.log("listening 3000 port..."));

server.get("/cards", async (req, res) => {
  const cards = await Card.getAll();

  res.status(200).json({ cards });
});

server.post("/cards", async (req, res) => {});
