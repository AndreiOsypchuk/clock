import React from 'react';
import { Clock, Form } from './components';
import { useInterval } from './hooks/useInterval';
import { RootContext } from './context';
function App() {
  const {
    store: { clocks },
    dispatch,
  } = React.useContext(RootContext);
  const [input, setInput] = React.useState({
    timezone: 0,
    label: null,
  });
  const interval = useInterval();

  const handleSubmit = () => {
    if (input && clocks.length < 4) {
      dispatch({
        type: 'ADD_CLOCK',
        payload: {
          ...input,
          id: Math.random() * 100,
          label: input.label || 'GMT' + input.timezone.toString(),
        },
      });
    }
  };
  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_CLOCK', payload: id });
  };
  return (
    <div className="App">
      <div className="clock-pane">
        {clocks.map((clock) => (
          <Clock
            tick={interval}
            data={clock}
            key={clock.id}
            onClick={handleRemove}
          />
        ))}
      </div>
      <Form />
    </div>
  );
}

export default App;
