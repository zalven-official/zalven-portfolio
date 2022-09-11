/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import useWindowDimensions from '../helpers/useWindowDimensions';
import useIsMounted from '../helpers/useIsMounted';
import useFrameLoop from '../helpers/useFrameLoop';
import useMousePointerPosition from '../helpers/useMousePointerPosition';
import { getRandomInt, randomChoice } from '../helpers/randomizer';
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
      speedX: getRandomInt(1, 2) * randomChoice([-1, 1]),
      speedY: getRandomInt(1, 2) * randomChoice([-1, 1]),
      radius: 5,
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
        Math.max(width, height) * 0.2
      )
    ) {
      for (let j = i; j < circleMove.length; j += 1) {
        // calculate distance between 2 circles
        const rad: number = circleMove[i].radius / 2;
        const distance = distanceBetweenTwoPoints(
          circleMove[i].randomX - rad,
          circleMove[i].randomY - rad,
          circleMove[j].randomX - rad,
          circleMove[j].randomY - rad
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [time, setTime] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <div className="fixed left-0 top-0 h-full w-full bg-inherit overflow-hidden  ">
      {lines?.map((value, index) => {
        const keyName = `lineNumber${index}`;
        return (
          <div key={keyName} className="fixed overflow-hidden">
            <svg
              className="fixed text-primary fill-current"
              width={width}
              height={height}
              stroke="currentColor"
            >
              <line x1={value.x0} y1={value.y0} x2={value.x1} y2={value.y1} />
            </svg>
            <svg
              className="fixed text-primary blur-md fill-current"
              width={width}
              height={height}
              stroke="currentColor"
            >
              <line x1={value.x0} y1={value.y0} x2={value.x1} y2={value.y1} />
            </svg>
            <svg
              className=" fixed text-base blur-xl fill-current"
              width={width}
              height={height}
              stroke="currentColor"
            >
              <line x1={value.x0} y1={value.y0} x2={value.x1} y2={value.y1} />
            </svg>
          </div>
        );
      })}
      {circles?.map((value, index) => {
        const keyName = `circleNumber${index}`;
        return (
          <div id={keyName} key={keyName}>
            <PlusCircleIcon
              className="fixed overflow-hidden "
              style={{
                width: `${value.radius}px`,
                top: `${value.randomY - value.radius / 2}px`,
                left: `${value.randomX - value.radius / 2}px`,
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
