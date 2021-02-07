import React, { useEffect } from "react";
import styled from "styled-components";
import * as networkSpeed from "../variable/requestSpeed";
import Progressbar from "./Progressbar";

// value, onChange, onMouseDown, onMouseUp, max = 100, min = 0, colors
const StyledSpeedController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    width: 50px;
    text-align: left;
  }

  .value {
    margin-left: 7px;
  }
`;

const SpeedController = ({ name }) => {
  const [value, setValue] = React.useState(
    networkSpeed[name.toUpperCase() + "_SPEED"]
  );

  useEffect(() => {
    networkSpeed[name.toUpperCase() + "_SPEED"] = value * 50;
  }, [value, name]);

  return (
    <StyledSpeedController>
      <label>{name}</label>
      <div style={{ height: "13px", width: "200px" }}>
        <Progressbar
          colors={{
            rail: "#333",
            ball: "#eee",
            train: "#bbb",
            active: {
              train: "#ccc",
              ball: "#fff"
            }
          }}
          onMouseDown={setValue}
          onChange={setValue}
          size={20}
          min={0}
          max={100}
          value={value}
        />
      </div>
      <div className="value">{(value / 20).toFixed(1) + " sec / req"}</div>
    </StyledSpeedController>
  );
};

export default function NetworkSpeed() {
  return (
    <div>
      <h2>network speed</h2>
      <SpeedController name="Fetch" />
      <SpeedController name="DB" />
    </div>
  );
}
