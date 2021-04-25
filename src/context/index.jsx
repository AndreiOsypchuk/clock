import React from 'react';

export const RootContext = React.createContext();

const INITIAL_STATE = {
  clocks: [{ timezone: 3, label: 'Current time', id: Math.random() * 100 }],
};

const RootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_CLOCK': {
      const temp = state.clocks;
      temp.push(action.payload);
      return { ...state, clocks: temp };
    }
    case 'REMOVE_CLOCK': {
      return {
        ...state,
        clocks: state.clocks.filter((clock) => clock.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export const RootProvider = ({ children }) => {
  const [store, dispatch] = React.useReducer(RootReducer, INITIAL_STATE, () => {
    return JSON.parse(localStorage.getItem('store')) || INITIAL_STATE;
  });

  React.useEffect(() => {
    localStorage.setItem('store', JSON.stringify(store));
  }, [store]);

  return (
    <RootContext.Provider value={{ store, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};
