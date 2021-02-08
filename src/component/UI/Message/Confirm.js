import React from "react";
import styled from "styled-components";
import { zIndex } from "../../variable";

const ConfirmToast = styled.div`
  position: absolute;
`;

export default function ({ message, onAccept, onCancel }) {
  return (
    <ConfirmToast>
      <p>{message}</p>
      <div>
        <button onClick={onAccept}>확인</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </ConfirmToast>
  );
}
