import "./backend/server";
import "./server";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.client
  .fetch({
    origin: "http://localhost:3000",
    path: "/cards"
  })
  .then((res) => res.json())
  .then((data) => console.log(data));

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
