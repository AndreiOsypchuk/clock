import React from 'react';

export const useInterval = () => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setCount((count) => count + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  return count;
};
