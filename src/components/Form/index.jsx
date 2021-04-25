import React from 'react';
import { RootContext } from '../../context';
import './index.css';
const getTimeZones = () => {
  const tzs = [];
  for (let i = 24; i >= -24; i--) {
    tzs.push(i);
  }
  return tzs;
};
export const Form = () => {
  const {
    dispatch,
    store: { clocks },
  } = React.useContext(RootContext);
  const [input, setInput] = React.useState({
    timezone: 0,
    label: '',
  });
  const timeZones = React.useMemo(() => getTimeZones(), []);
  const handleSubmit = () => {
    if (input && clocks.length < 5) {
      dispatch({
        type: 'ADD_CLOCK',
        payload: {
          ...input,
          id: Math.random() * 100,
          label:
            input.label ||
            'GMT ' +
              (input.timezone > 0
                ? '+' + input.timezone.toString()
                : input.timezone.toString()),
        },
      });
    }
    setInput((input) => ({ ...input, label: '' }));
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setInput((input) => ({ ...input, [field]: value }));
  };
  return (
    <div className="controlls">
      <div className="inputs">
        <input
          className="label-input stick-out"
          type="text"
          placeholder="Clock's label goes here"
          onChange={handleChange}
          name="label"
          value={input.label}
        />
        <p className="gmt">GMT :</p>
        <select
          className="tz-select stick-out"
          onChange={handleChange}
          name="timezone"
          value={input.timezone}
        >
          {timeZones.map((tz, i) => (
            <option value={tz} key={i}>
              {tz > 0 ? '+' + tz : tz}
            </option>
          ))}
        </select>
      </div>
      <button className="submit stick-out" onClick={handleSubmit}>
        ADD CLOCK
      </button>
    </div>
  );
};
