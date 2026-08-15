import { useEffect, useState } from 'react';

// Platform launch target — 90 days from the platform page launch date.
export const PLATFORM_LAUNCH_DATE = new Date('2026-11-10T00:00:00');

const pad = (n) => String(n).padStart(2, '0');

export function getRemaining(target = PLATFORM_LAUNCH_DATE) {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, finished: diff === 0 };
}

export function useCountdown(target = PLATFORM_LAUNCH_DATE) {
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}

export { pad };