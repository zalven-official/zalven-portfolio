/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Line } from 'react-lineto';
import useWindowDimensions from '../helpers/useWindowDimensions';
import useIsMounted from '../helpers/useIsMounted';
import useFrameLoop from '../helpers/useFrameLoop';
import useMousePointerPosition from '../helpers/useMousePointerPosition';
import { getRandomInt } from '../helpers/randomizer';

interface CircleProperties {
  speedX: number;
  speedY: number;
  randomX: number;
  randomY: number;
  radius: number;
}
interface LineProperties {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}
function generateCircles(
  numberOfCircles: number,
  width: number,
  height: number
) {
  const result: Array<CircleProperties> = [];
  for (let i = 0; i < numberOfCircles; i += 1) {
    const randomX = getRandomInt(0, width);
    const randomY = getRandomInt(0, height);
    const speedX = getRandomInt(1, 7);
    const speedY = getRandomInt(1, 7);
    const radius = 10;
    const circleProps = { randomX, randomY, speedX, speedY, radius };
    result.push(circleProps);
  }
  return result;
}
function moveCircles(
  circles: Array<CircleProperties>,
  lines: Array<LineProperties>,
  width: number,
  height: number,
  clientX: number,
  clientY: number
) {
  const circleMove: Array<CircleProperties> = circles;

  for (let i = 0; i < circleMove.length; i += 1) {
    circleMove[i].randomX += circleMove[i].speedX;
    circleMove[i].randomY += circleMove[i].speedY;
    if (
      circleMove[i].randomX > width - circleMove[i].radius ||
      circleMove[i].randomX < circleMove[i].radius
    ) {
      circleMove[i].speedX = -circleMove[i].speedX;
    }
    if (
      circleMove[i].randomY > height - circleMove[i].radius ||
      circleMove[i].randomY < circleMove[i].radius
    ) {
      circleMove[i].speedY = -circleMove[i].speedY;
    }
  }
  // console.log({ clientX, clientY });
  return circleMove;
}
function moveLines(lines: Array<LineProperties>) {}
function Background() {
  const isMounted = useIsMounted();
  const [time, setTime] = useState<number>(0);
  const [deltaTime, setDeltaTime] = useState<number>(0);
  const { width, height } = useWindowDimensions();
  const { clientX, clientY } = useMousePointerPosition();
  const [circles, setCircles] = useState<Array<CircleProperties>>([]);
  const [lines, setLines] = useState<Array<LineProperties>>([]);

  useEffect(() => {
    if (isMounted()) {
      setCircles(generateCircles(100, width, height));
    }
  }, [isMounted, height, width]);
  useFrameLoop((timeValue, deltaTimeValue) => {
    moveCircles(circles, lines, width, height, clientX, clientY);
    setTime(timeValue);
    setDeltaTime(deltaTimeValue);
  });
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-inherit">
      <Line x0={0} y0={0} x1={10} y1={10} />
      {circles?.map((value, index) => {
        const keyName = `circleNumber${index}`;
        return (
          <div id={keyName} key={keyName}>
            <PlusCircleIcon
              className="absolute "
              style={{
                width: `${value.radius}px`,
                top: `${value.randomY}px`,
                left: `${value.randomX}px`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

Background.propTypes = {};

export default Background;
