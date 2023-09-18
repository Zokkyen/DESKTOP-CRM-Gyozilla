/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react';
import moment from 'moment';

function useCountdown(order) {
  const [remainingTime, setRemainingTime] = useState('');
  const orderDate = moment(order.createdAt);
  useEffect(() => {
    if (orderDate.isAfter(moment())) {
      return;
    }

    let diffInSeconds = moment(order.createdAt)
      .add(15, 'minutes')
      .diff(moment(), 'seconds');

    const interval = setInterval(() => {
      if (diffInSeconds <= 0) {
        clearInterval(interval);
        setRemainingTime('00:00');
      } else {
        const minutes = Math.floor(diffInSeconds / 60);
        const seconds = diffInSeconds % 60;

        setRemainingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        diffInSeconds--;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [order]);

  return remainingTime;
}

export default useCountdown;
