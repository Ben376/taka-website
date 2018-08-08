const reducerStatsNewConnectedTrashes = (state = {}, action) => {
	switch (action.type) {
		case 'GET_NEW_CONNECTED_TRASHES':
			return action.payload;
		default:
			return state;
	}
};

export default reducerStatsNewConnectedTrashes;
