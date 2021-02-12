import network from "./network";

export function Client(origin) {
  this.origin = origin;

  this.catch = (message, isError) => {
    console.log("client catch response", message);
    if (isError) {
      throw message;
    }
    return message;
  };
  this.promises = [];

  network.push(this);
  console.log(`client ${origin} is connected to network`);
}

export default Client;
