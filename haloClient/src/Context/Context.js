import { createContext, useContext, useReducer } from "react";
import { productReducer } from "./reducer";
export const productContext = createContext();
export const Context = ({ children }) => {
 
  const [state, dispatch] = useReducer(productReducer, {
    cart: [],
    filteredProduct:[],
    authState:'',
    keyword:'',
    userName:'Friend',
    email:"",
    id:''
    
  
  });
  return (
    <productContext.Provider value={{ state, dispatch }}>
      {children}
    </productContext.Provider>
  );
};
export const ProductState = () => {
  return useContext(productContext);
};
