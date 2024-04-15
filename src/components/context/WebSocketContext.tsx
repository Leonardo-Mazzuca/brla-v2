import { createContext, useContext, useReducer } from "react";
import { ProviderProps } from "../types/Provider/Provider";


export type WebSocketState = {
  webSocket: WebSocket | null;
}

export enum WebSocketActions { 

  setWebSocket,

}

type Action = {

  type: WebSocketActions;
  payload: any;
  
}

type ContextType = {
  state: WebSocketState;
  dispatch: (action: Action) => void;
}


const WebSocketContext = createContext<ContextType | undefined>(undefined);

const initialData:WebSocketState = {
  webSocket: null,
}

const webSocketReducer = (state: WebSocketState, action: Action) => {


  switch(action.type) {

    case WebSocketActions.setWebSocket:
        return {...state, webSocket: action.payload.webSocket};
    
    default: 
         return state;
}

}


export const WebSocketProvider = ({ children } : ProviderProps) => {


  const [state, dispatch] = useReducer(webSocketReducer, initialData);

  const value = {state, dispatch};

  return (

      <WebSocketContext.Provider value = {value}>

          {children}

      </WebSocketContext.Provider>


  );

}


export const useWebSocket = () => {

  const context = useContext(WebSocketContext);

  if(context===undefined) {
    throw new Error('useWebSocket precisa ser usado dentro do webSocket provider')
  }

  return context;


}



