import "./styles.css";
import useFakeFetch from "./hooks/useFakeFetch";
import { useEffect } from "react";
import PostEditor from "./component/PostEditor";

export default function App() {
  return (
    <div className="App">
      <h1>
        my simple useFetch example
        <span role="img" aria-labelledby="smile emoji">
          😀
        </span>
      </h1>
      <PostEditor />
    </div>
  );
}
