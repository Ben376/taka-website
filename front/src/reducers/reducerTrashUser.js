const reducerTrashUser = (state = null, action) => {
	switch (action.type) {
		case 'GET_USER':
			return action.payload;
		case 'SET_DEFAULT_ID':
			return action.payload;
		default:
			return state;
	}
};

export default reducerTrashUser;