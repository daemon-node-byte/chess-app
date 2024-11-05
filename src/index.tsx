import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GameContext, initContext } from './gameContext';
import { gameReducer, type ActionType } from './gameReducer';
import type { GameContextType } from './types';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const AppProvider = () => {
  const [state, dispatch] = useReducer<React.Reducer<GameContextType, ActionType>>(
    gameReducer,
    initContext
  );

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      <App />
    </GameContext.Provider>
  );
}

root.render(
  <React.StrictMode>
      <AppProvider />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
