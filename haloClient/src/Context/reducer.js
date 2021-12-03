export const total = (cart) => {
  const total = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return total;
};
export const totalProduct = (cart) => {
  const totalItem = cart.reduce((acc, item) => acc + item.quantity, 0);
  return totalItem;
};
export const productReducer = (state, { type, payload }) => {
  switch (type) {


    case "ADD":
      const inTheCart = state.cart.find((el) => el.id === payload.id);
      if (inTheCart) {
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            if (cartItem.id === payload.id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            } else {
              
              return cartItem;
            }
          }),
        };
      }

      return { ...state, cart: [...state.cart, { ...payload }] };

    case "REMOVE":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === payload.id
      );
      let newCart = [...state.cart];
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        return state;
      }
      return { ...state, cart: newCart };

    case "REMOVE_ALL":
      return { ...state, cart: [] };

    case "INCREASE":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === payload.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        }),
      };
    case "DECREASE":
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === payload.id) {
            if (cartItem.quantity <= 1) return { ...cartItem, quantity: 1 };

            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        }),
      };

    case "SEARCH":
      if (!payload) {
        return { ...state, filteredProduct:[] };
      }
      return {...state,filteredProduct:payload}

      case "RATE_BY_STAR":

        const filteredByStar = 
        {...state,filteredProduct:[
          ...state.filteredProduct.filter((el) => el.rating>=payload),
        ]};
        const starFiltered = [...filteredByStar];
        if (filteredByStar.length <= 0) {
          return { ...state, filteredProduct: [] };
        } else {
          return {
            ...state,
            filteredProduct:starFiltered
          }}
       
case "INCREASE_AMOUNT":
  return {
    ...state,
    cart: state.cart.map((cartItem) => {
      if (cartItem.id === payload.id) {
        return { ...cartItem, quantity: payload };
      }
      return cartItem;
    }),
  };

case "AUTH":
  return {...state, authState:payload.auth,userName:payload.userName,id:payload.id}
case "LOGOUT":
 return {...state, authState:payload.auth,cart:[],userName:'',id:''}

    default:
      return state;
  }
};
