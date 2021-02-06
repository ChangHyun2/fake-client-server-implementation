import network from "./network";

function Client(origin) {
  this.origin = origin;

  this.catch = (message) => {
    console.log("client catch response", message);
    return message;
  };
  this.promises = [];

  network.push(this);
  console.log(`client ${origin} is connected to network`);
}

export default Client;
