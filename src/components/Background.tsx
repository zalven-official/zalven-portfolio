/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import useWindowDimensions from '../helpers/useWindowDimensions';
import useIsMounted from '../helpers/useIsMounted';
import useFrameLoop from '../helpers/useFrameLoop';
import { getRandomInt } from '../helpers/randomizer';

interface CircleProperties {
  speedX: number;
  speedY: number;
  randomX: number;
  randomY: number;
  radius: number;
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
    const speedX = getRandomInt(1, 5);
    const speedY = getRandomInt(1, 5);
    const radius = 10;
    const circleProps = { randomX, randomY, speedX, speedY, radius };
    result.push(circleProps);
  }
  return result;
}
function moveCircles(
  circles: Array<CircleProperties>,
  width: number,
  height: number
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
  return circleMove;
}
function Background() {
  const isMounted = useIsMounted();
  const [time, setTime] = useState<number>(0);
  const [deltaTime, setDeltaTime] = useState<number>(0);
  const { width, height } = useWindowDimensions();
  const [circles, setCircles] = useState<Array<CircleProperties>>([]);

  useEffect(() => {
    if (isMounted()) {
      setCircles(generateCircles(100, width, height));
    }
  }, [isMounted, height, width]);
  useFrameLoop((timeValue, deltaTimeValue) => {
    moveCircles(circles, width, height);
    setTime(timeValue);
    setDeltaTime(deltaTimeValue);
  });
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-inherit">
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
