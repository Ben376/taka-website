const reducerStatsVolumeTubsTrashes = (state = {}, action) => {
	switch (action.type) {
		case 'GET_VOLUME_TUBS_TRASHES':
			return action.payload;
		default:
			return state;
	}
};

export default reducerStatsVolumeTubsTrashes;
