import "./styles.css";

import PostEditor from "./component/PostEditor";
import NetworkSpeed from "./component/NetworkSpeed";

export default function App() {
  return (
    <div className="App">
      <h1>
        my simple useFetch example
        <span role="img" aria-labelledby="smile emoji">
          😀
        </span>
      </h1>
      <NetworkSpeed />
      <PostEditor />
      <span>face</span>
      <p
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        https://github.com/ChangHyun2
      </p>
    </div>
  );
}
