import {API} from '../config/config';

const USER_PROFILE: string = 'profile';

export interface ISignUpValues {
	name: string;
	email: string;
	password: string;
}

export interface ISignInValues {
	email: string;
	password: string;
}

const generateHttpHeader = () => {
	return {
		Accept: 'application/json;odata=verbose',
		'Content-Type': 'application/json'
	};
};

export const SignUpUser = (user: ISignUpValues): Promise<any> => {
	console.log('SignUpUser: ', user);
	return fetch(`${API}/auth/signup`, {
		method: 'POST',
		headers: generateHttpHeader(),
		body: JSON.stringify(user)
	})
		.then((response: any) => {
			return response.json();
		})
		.catch((err) => {
			console.log('SignUpUser error: ', err);
		});
};

export const SignInUser = (user: ISignInValues): Promise<any> => {
	console.log('SignInUser: ', user);
	return fetch(`${API}/auth/signin`, {
		method: 'POST',
		headers: generateHttpHeader(),
		body: JSON.stringify(user)
	})
		.then((response: any) => {
			return response.json();
		})
		.catch((err) => {
			console.log('SignInUser error: ', err);
		});
};

export const SignOutUser = (callback: () => void) => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(USER_PROFILE);
		callback();

		return fetch(`${API}/auth/signout`, {
			method: 'POST',
			headers: generateHttpHeader()
		})
			.then((response: any) => {
				console.log('user is logged out');
				// console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

// export const Authenticate = (data: any) => {
export const AuthenticateUser = (data: any, callback: () => void) => {
	// ? check if window object exists
	if (typeof window !== 'undefined') {
		localStorage.setItem(USER_PROFILE, JSON.stringify(data));
		callback();
	}
};

export const IsUserAuthenticated = (): boolean => {
	if (typeof window == 'undefined') {
		return false;
	}

	if (localStorage.getItem(USER_PROFILE)) {
		console.log('user is authenticated');
		return true;
	}

	console.log('user is not authenticated');
	return false;
};
