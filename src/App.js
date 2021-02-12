import "./styles.css";

import PostEditor from "./component/PostEditor";
import NetworkSpeed from "./component/NetworkSpeed";

export default function App() {
  return (
    <div className="App">
      <a
        href="https://github.com/ChangHyun2/fake-client-server-implementation"
        target="_blank"
      >
        <img
          height={30}
          width={40}
          alt={"githubicon"}
          src={`https://unpkg.com/simple-icons@v4/icons/github.svg`}
        />
      </a>
      <h1 style={{ fontSize: "24px" }}>
        Fake Server & Client & DB<span> </span>
        <span role="img" aria-labelledby="smile emoji">
          😀
        </span>
      </h1>
      <NetworkSpeed />
      <PostEditor />
    </div>
  );
}
