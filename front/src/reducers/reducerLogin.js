const initialLoggedIn = {
	loggedIn: false,
	logging: false,
	message: '',
  token: '',
  loggedId: null
};

const loggedIn = (state = initialLoggedIn, action) => {
	let checkUser = {...state};
	
	switch (action.type) {
		
		case 'CHECKED_IDENT' :
			checkUser = {
				loggedIn: action.loggedIn,
				logging: false,
				message: action.message,
				loggedId: action.loggedId,
        token: action.token
			};
			return checkUser;
		
		case 'IDENT_FAILURE' :
			checkUser = {
				loggedIn: false,
				logging: false,
				message: action.message,
				loggedId: null,
				token: ''
			};
			return checkUser;
		
		case 'CHECKING_INDENT' :
			checkUser.logging = true;
			return checkUser;
		
		case 'CHECKOUT' :
			checkUser = {
				loggedIn: false,
				logging: false,
				message: action.message,
				loggedId: null,
				token: ''
			};
			return checkUser;
		
		default:
			return state;
	}
}

export default loggedIn;