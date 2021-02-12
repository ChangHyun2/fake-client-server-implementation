import "./client";
import ReactDOM from "react-dom";
import App from "./App";
import Loading from "./component/UI/Loading";
import { initBackend } from "./backend/server";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <div style={{ textAlign: "center" }}>
    <p>loading server...</p>
    <Loading />
  </div>,
  rootElement
);

initBackend
  .then(() => ReactDOM.render(<App />, rootElement))
  .catch((e) => console.error(e))
  .finally();

import("./example");
