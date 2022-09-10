/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Line } from 'react-lineto';
import useWindowDimensions from '../helpers/useWindowDimensions';
import useIsMounted from '../helpers/useIsMounted';
import useFrameLoop from '../helpers/useFrameLoop';
import useMousePointerPosition from '../helpers/useMousePointerPosition';
import { getRandomInt } from '../helpers/randomizer';
import { checkAPoint, distanceBetweenTwoPoints } from '../helpers/colliders';

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
  for (let i = 0; i < numberOfCircles; i += 1)
    result.push({
      randomX: getRandomInt(0, width),
      randomY: getRandomInt(0, height),
      speedX: getRandomInt(1, 3),
      speedY: getRandomInt(1, 3),
      radius: 10,
    });
  return result;
}
function moveCircles(
  circles: Array<CircleProperties>,
  width: number,
  height: number,
  clientX: number,
  clientY: number
) {
  const circleMove: Array<CircleProperties> = circles;
  const linesMove: Array<LineProperties> = [];
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

    // Check if point circle is inside the line
    if (
      checkAPoint(
        circleMove[i].randomX,
        circleMove[i].randomY,
        clientX,
        clientY,
        Math.min(width, height) * 0.2
      )
    ) {
      for (let j = i; j < circleMove.length; j += 1) {
        // calculate distance between 2 circles
        const distance = distanceBetweenTwoPoints(
          circleMove[i].randomX,
          circleMove[i].randomY,
          circleMove[j].randomX,
          circleMove[j].randomY
        );
        if (distance <= Math.min(width, height) * 0.15) {
          linesMove.push({
            x0: circleMove[i].randomX,
            y0: circleMove[i].randomY,
            x1: circleMove[j].randomX,
            y1: circleMove[j].randomY,
          });
        }
      }
    }
  }
  return { circleMove, linesMove };
}
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
      setCircles(
        generateCircles(Math.min(width, height) * 0.05, width, height)
      );
    }
  }, [isMounted, height, width]);
  useFrameLoop((timeValue, deltaTimeValue) => {
    const { linesMove } = moveCircles(circles, width, height, clientX, clientY);
    setLines(linesMove);
    setTime(timeValue);
    setDeltaTime(deltaTimeValue);
  });
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-inherit overflow-hidden">
      {lines?.map((value, index) => {
        const keyName = `lineNumber${index}`;
        return (
          <div id={keyName} key={keyName} className="border-blue-400">
            <Line
              x0={value.x0}
              y0={value.y0}
              x1={value.x1}
              y1={value.y1}
              className=" -z-10 overflow-hidden border-none "
            />
          </div>
        );
      })}
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
