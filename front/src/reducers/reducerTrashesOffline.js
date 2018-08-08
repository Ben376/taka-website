const reducerTrashesOffline = (state = [], action) => {
  switch (action.type) {
    case 'GET_TRASHES_OFFLINE':
      return action.payload;
    default:
      return state;
  }
};

export default reducerTrashesOffline;
