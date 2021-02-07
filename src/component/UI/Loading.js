import React from "react";
import styled, { keyframes } from "styled-components";

// https://codepen.io/changhyun2/pen/GRjEYzO

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  10%{
    background-position: 0% 50%;
  }
`;

const flick = keyframes`
  0%, 80%, 100%{
    opacity: 0;
  }
  30%, 50%{
    opacity: 1;
  }
`;

const StyledLoading = styled.span`
  .loading-dot {
    display: inline-block;
    background: linear-gradient(-90deg, #666, #999, #bbb, #fff);
    background-size: 600% 600%;
    animation: ${gradient} 1s infinite, ${flick} 1s infinite;
    line-height: 1;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background-color: #000;

    :nth-child(2) {
      animation-delay: 0.2s;
    }
    :last-child {
      animation-delay: 0.4s;
    }
    :not(:last-child) {
      margin-right: 3px;
    }
  }
`;

export default function Loading(props) {
  return (
    <StyledLoading {...props}>
      <span class="loading-dot"></span>
      <span class="loading-dot"></span>
      <span class="loading-dot"></span>
    </StyledLoading>
  );
}
