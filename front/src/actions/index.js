import { history } from '../index';
import axios from 'axios';

export const checkedIdent = (dbResponse) => ({
	type: 'CHECKED_IDENT',
	...dbResponse
});

export const checkingIdent = () => ({
	type: 'CHECKING_INDENT',
	message: 'Vérification en cours'
});

export const identFailure = () => ({
	type: 'IDENT_FAILURE',
	message: 'Identification invalide'
});

export function checkIdent(email, password) {
	return (dispatch) => {
		dispatch(checkingIdent());

		fetch("/auth/signin", {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({
					email: email,
					password: password
				}),
			})
			.then(res => res.json())
			.then((res) => {
					if (res.loggedIn) {
						let valideIdent = {
							loggedIn: res.loggedIn,
							token: res.token,
              message: res.message,
              loggedId: res.loggedId,
            };
            if (res.permission === 'administrateur') {
              history.push('/admin')
            } else {
              history.push('/utilisateur')
            }
						dispatch(checkedIdent(valideIdent))
					}
					else {
						dispatch(identFailure(res.message))
					}
        })
  }
}

export const checkout = () => ({
	type: 'CHECKOUT'
});

export function getTrashes(token) {
	return function (dispatch) {
		axios.get(`/api/trashesList`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(function (response) {
				dispatch({
					type: 'GET_TRASHES',
					payload: response.data.docs
				});
			})
	};
}

export function sortTrashesBy(event, token) {
	return function (dispatch) {
		axios.get(`/api/trashes/sort/${event}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(function (response) {
				dispatch({
					type: 'SORT_TRASHES_BY',
					payload: response.data.response
				});
			})
	}
}

export function getNewConnectedTrashes(date, token) {
	return function (dispatch) {
		axios.get(`/api/stats/date/${date}/newConnectedTrashes`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(function (response) {
				dispatch({
					type: 'GET_NEW_CONNECTED_TRASHES',
					payload: response.data
				});
			})
	}
}

export function getVolumeTubsTrashes(date, token) {
	return function (dispatch) {
		axios.get(`/api/stats/date/${date}/volumeTubsTrashes`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(function (response) {
				dispatch({
					type: 'GET_VOLUME_TUBS_TRASHES',
					payload: response.data
				});
			})
	}
}

export function getIdUser(id) {
	return function (dispatch) {
		axios.get(`/sql/userdetails/${id}`)
			.then(function (response) {
				dispatch({
					type: 'GET_USER',
					payload: response.data
				});
			})
	}
}

export function getIdTrash(id, token) {
	return function (dispatch) {
		axios.get(`/api/trash/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(function (response) {
				dispatch({
					type: 'GET_TRASH',
					payload: response.data.docs
				});
			})
	}
}
export function getSugg(newValue) {
	if (newValue === "")
		return function (dispatch) {
			dispatch({
				type: 'GET_SUGG',
				payload: []
			})
		}
	else if (newValue.match(/[0-9]/))
		return function (dispatch) {
			axios.get(`/sql/geo/${newValue}`)
				.then(function (response) {
					dispatch({
						type: 'GET_SUGG',
						payload: response.data
					});
				})
		}
	else
		return function (dispatch) {
			axios.get(`/sql/city/${newValue}`)
				.then(function (response) {
					dispatch({
						type: 'GET_SUGG',
						payload: response.data
					});
				})
		}
}

export function getMaintenance(token) {
	return function (dispatch) {
		axios.get(`/api/maintenance`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(function (response) {
				dispatch({
					type: 'GET_MAINTENANCE',
					payload: response.data.data
				})
			})
	}
}

export function getTrashesOffline(token) {
	return function (dispatch) {
		axios.get(`/api/trashesOffline`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then(function (response) {
				dispatch({
					type: 'GET_TRASHES_OFFLINE',
					payload: response.data.data
				})
			})
	}
}

export function setDefaultId(id) {
	return {
		type: 'SET_DEFAULT_ID',
		payload: id,
	}
}

export function getSerialList(serialList) {
	return function (dispatch) {
		axios.get(`/user/serial_number/${serialList}`)
			.then(function (response) {
				dispatch({
					type: 'GET_SERIAL_LIST',
					payload: response.data.serial[0],
				});
			})
	}
}

export function deleteUserTrash(serialNumber, userId) {
	return function (dispatch) {
		axios.delete(`/sql/deleteUserTrash/${serialNumber}`)
			.then((res) => {
				if(res.status === 200) {
					dispatch({
						type: 'DELETE_USER_TRASH',
					});
					axios.get(`/user/readSN/${userId}`)
						.then(response => {
							for(let i = 0; i < response.data.data.length; i++) {
								dispatch(getSerialList(response.data.data[i].serialNumber))
							}
						})
				}
			})
	}
}
