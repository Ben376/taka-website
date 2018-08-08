const reducerTrashes = (state = [], action) => {
	switch (action.type) {
		case 'SORT_TRASHES_BY':
			return action.payload;
		case 'GET_TRASHES':
			return action.payload;
		default:
			return state;
	}
};

export default reducerTrashes;
