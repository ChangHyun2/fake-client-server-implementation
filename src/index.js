import "./backend/server";
import "./client";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
// (async () => {
//   await window.client
//     .fetch(
//       {
//         origin: "http://localhost:3000",
//         path: "/cards"
//       },
//       { method: "POST", body: { title: "hello" } }
//     )
//     .then((res) => res.json())
//     .then((data) => console.log(data, "POST CARD"));

//   await window.client
//     .fetch({
//       origin: "http://localhost:3000",
//       path: "/cards"
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data, "GET CARD");
//     });

// await window.client
//   .fetch(
//     {
//       origin: "http://localhost:3000",
//       path: "/cards"
//     },
//     { method: "UPDATE", body: { data: { title: "hi" } } }
//   )
//   .then((res) => res.json())
//   .then((data) => console.log(data, "UPDATE CARD"));

// await window.client
//   .fetch(
//     {
//       origin: "http://localhost:3000",
//       path: "/cards"
//     },
//     { method: "DELETE", body: { data: { title: "hello" } } }
//   )
//   .then((res) => res.json())
//   .then((data) => console.log(data));
// })();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
