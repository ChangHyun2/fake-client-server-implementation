import React, { useEffect, useCallback } from "react";
import styled from "styled-components";

/*
  value: float
  onChange => 프로그래스바 mosemouve 이벤트 발생 시  (value) => {}
  onMouseDown => 프로그래스바 mousedown일 때  (value) => {}
  onMouseUp => 프로그래스바 mouseup일 때 (value) => {}
*/

const StyledProgress = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  ${({ colors }) => `
    &:hover {
      & .progress {
        &__ball::after {
          background-color: ${colors.active.ball};
        }
        &__train {
          background-color: ${colors.active.train};
        }
      }
    }
    & .progress{
        &__rail{
          background-color: ${colors.rail};
        }
        &__ball::after{
          background-color:${colors.ball};
        }
        &__train{
          background-color:${colors.train};
        }
      }
  `};
`;

const Rail = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  border-radius: 1em;
  top: 50%;
  transform: translateY(-50%);
  ${({ size }) => `
    height: ${size * 100}%;
  `};
`;

const Ball = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${({ offset }) => `
      transform:translateX(-${100 - offset}%);
  `}
  &::after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 100%;
    right: 0;
    transform: translateX(50%);
    ${({ length }) => `
      width:${length}px;
      height:${length}px;
  `}
  }
`;

const Train = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${({ offset }) => `
    transform:translateX(-${100 - offset}%);
  `}
`;

export default React.forwardRef(function Progress(
  { value, onChange, onMouseDown, onMouseUp, max = 100, min = 0, colors },
  ref
) {
  const progressRef = React.useRef(null);
  const [isMoving, setIsMoving] = React.useState(false);
  const [ballLength, setBallLength] = React.useState(0);

  const handleMouseDown = useCallback(
    (e) => {
      console.log("onmousedown");
      setIsMoving(true);

      if (onMouseDown) {
        const mouseX = e.pageX;
        const { left, width } = progressRef.current.getBoundingClientRect();

        let progressValue = ((mouseX - left) / width) * (max - min);

        progressValue =
          progressValue > max ? max : progressValue < min ? min : progressValue;
        onMouseDown(progressValue.toFixed(3));
      }
    },
    [onMouseDown, max, min]
  );

  const handleMouseMove = useCallback(
    (e) => {
      console.log("onmousemove");
      e.preventDefault();

      const mouseX = e.pageX;
      const { left, width } = progressRef.current.getBoundingClientRect();

      let progressValue = ((mouseX - left) / width) * (max - min);

      progressValue =
        progressValue > max ? max : progressValue < min ? min : progressValue;

      if (onChange) {
        onChange(progressValue.toFixed(3));
      }
    },
    [onChange, max, min]
  );

  const handleMouseUp = useCallback(
    (e) => {
      console.log("onmouseup");
      setIsMoving(false);

      const mouseX = e.pageX;
      const { left, width } = progressRef.current.getBoundingClientRect();

      let progressValue = ((mouseX - left) / width) * (max - min);

      progressValue =
        progressValue > max ? max : progressValue < min ? min : progressValue;

      if (onMouseUp) {
        onMouseUp(progressValue.toFixed(3));
      }
    },
    [onMouseUp, max, min]
  );

  useEffect(() => {
    if (isMoving) {
      console.log("moving, add listeners");
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      console.log("stopped, remove listeners");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [isMoving, handleMouseUp, handleMouseMove]);

  useEffect(() => {
    const progressBoundingRect = progressRef.current.getBoundingClientRect();
    setBallLength(progressBoundingRect.height);
  }, []);

  return (
    <StyledProgress
      colors={colors}
      ref={progressRef}
      onMouseDown={handleMouseDown}
    >
      <input data-isactive={isMoving} ref={ref} value={value} type="hidden" />
      <Rail className="progress__rail" size={0.6}>
        <Train
          className="progress__train"
          offset={(value / (max - min)) * 100}
        />
      </Rail>
      <Ball
        className="progress__ball"
        length={ballLength}
        offset={(value / (max - min)) * 100}
      ></Ball>
    </StyledProgress>
  );
});
