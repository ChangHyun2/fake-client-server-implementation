import network from "./network";

function Client(origin) {
  this.origin = origin;

  this.catch = (message) => {
    console.log(message, "catched in client");
    return message;
  };
  this.promises = [];

  network.push(this);
}

export default Client;
