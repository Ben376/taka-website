function updateState(state, action) {
	let newItem = true;
	let newList = state;
	for (let i = 0; i < newList.length; i++) {
		if (state[i].serial_number === action.payload.serial_number) {
			newItem = false;
		}
	}
	if (newItem) {
		newList.push(action.payload);
	}
	return newList
}


const reducerSerialList = (state = [], action) => {
	switch (action.type) {
		case 'GET_SERIAL_LIST':
			updateState(state, action)
			return [...state]
		case 'DELETE_USER_TRASH':
			return []
		default:
			return state;
	}
};

export default reducerSerialList;
