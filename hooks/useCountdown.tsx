import { useEffect, useRef, useState } from 'react';

const useCountdown = (date: string | number | Date) => {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    const countdownDate = new Date(date).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return {
    days: timerDays,
    hours: timerHours,
    minutes: timerMinutes,
    seconds: timerSeconds,
  };
};

export default useCountdown;
