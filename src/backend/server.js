import Server from "../internet/Server";
import { TimeoutPromise } from "../utils/TimeoutPromise";
import Card from "./model/Card";

require("./MyDB");

const server = new Server({ domain: "localhost", scheme: "http" });
server.listen(3000, () => console.log("listening 3000 port..."));

server.get("/cards", async (req, res) => {
  try {
    const cards = await Card.getAll();
    console.log(cards);

    res.status(200).json(cards);
  } catch (e) {
    const error = new Error("can not get cards");
    error.status = 409;
    throw new Error(error);
  }
});

server.post("/cards", async (req, res) => {
  const { title, content } = req.body;
  try {
    const card = await Card({ title, content });

    res.status(201).json(card);
  } catch (e) {
    const error = new Error("card is not created");
    error.status = 409;
    throw error;
  }
});

server.put("/cards", async (req, res) => {
  const { id, data } = req.body;

  try {
    const updated = await Card.update(id, data);
    if (!updated) {
      res.status(204);
    }
    res.status(200).json(updated);
  } catch (e) {
    const error = new Error("conflict with updating card");
    error.status = 409;
    throw error;
  }
});

server.delete("/cards", async (req, res) => {
  const { id, data } = req.body;

  try {
    const deleted = await Card.delete(id, data);
    if (!deleted) {
      res.status(204);
    }
    res.status(200).json(deleted);
  } catch (e) {
    const error = new Error("conflict with deleting card");
    error.status = 409;
    throw error;
  }
});
