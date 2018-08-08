const reducerMaintenance = (state = [], action) => {
  let newList = [];
  switch (action.type) {
    case 'GET_MAINTENANCE':      
      newList =[...action.payload];
      return newList;
    default:
      return state;
  }
};

export default reducerMaintenance;
