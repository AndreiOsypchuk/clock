import React from 'react';
import './index.css';

export const Clock = ({ tick, data, onClick }) => {
  const [date, setDate] = React.useState(new Date());
  const [handPositions, setHandPositions] = React.useState({
    second: 0,
    minute: 0,
    hour: 0,
  });
  // set new date as 0 gmt + provided offset

  React.useEffect(() => {
    setDate(
      (date) =>
        new Date(
          Date.now() +
            3600000 * (new Date().getTimezoneOffset() / 60) +
            3600000 * data.timezone
        )
    );
    console.log(data.timezone);
  }, [tick, data]);

  const change = React.useCallback(() => {
    const secondsRatio = date.getSeconds() / 60;
    const minutesRatio = (secondsRatio + date.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + date.getHours()) / 12;
    setHandPositions((pos) => ({
      second: secondsRatio,
      minute: minutesRatio,
      hour: hoursRatio,
    }));
  }, [date]);

  const handleRemove = () => {
    onClick(data.id);
  };

  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="clock-container">
      <div className="clock-display">
        <div className="clock stick-out" ref={change} onClick={handleRemove}>
          <div
            className="hand hour"
            style={{ '--rotation': `${360 * handPositions.hour}` }}
          ></div>

          <div
            className="hand minute"
            style={{ '--rotation': `${360 * handPositions.minute}` }}
          ></div>
          <div
            className="hand second"
            style={{ '--rotation': `${360 * handPositions.second}` }}
          ></div>
          {hours.map((hour, i) => (
            <div
              key={i}
              className={`number number${hour}`}
              style={{ '--rotation': `${30 * hour}deg` }}
            >
              {hour}
            </div>
          ))}
        </div>
      </div>
      <div className="label-text stick-out">{data.label}</div>
    </div>
  );
};
