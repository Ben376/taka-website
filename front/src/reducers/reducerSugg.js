const reducerSugg = (state = [], action) => {
    switch (action.type) {
      case 'GET_SUGG':
        return action.payload;
      default:
        return state;
    }
  }
  
  export default reducerSugg;