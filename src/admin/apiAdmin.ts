import {API} from '../config/config';

// TODO: use interface
// export interface ICategoryInput {
// 	name: string;
// }

export interface IProductInput {
	name: string;
	description: string;
	price: number;
	category: any;
	quantity: number;
	sold: number;
	photo: any;
	shipping: boolean;
	formData: FormData; // * this is because we're passing form-data, not json
}

const generateHttpHeader = (token: string) => {
	return {
		Accept: 'application/json;odata=verbose',
		Authorization: `Bearer ${token}`
	};
};

const generateHttpHeaderFormDataInput = (token: string) => {
	return {
		Accept: 'application/json;odata=verbose',
		'Content-Type': 'multipart/form-data',
		Authorization: `Bearer ${token}`
	};
};

const generateHttpHeaderJsonInput = (token: string) => {
	return {
		Accept: 'application/json;odata=verbose',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};
};

export const CreateCategory = (userId: string, token: string, category: string): Promise<any> => {
	console.log('CreateCategory() input: ', category);

	// * API accepts 'name' input
	const categoryInput = {
		name: category
	};

	return fetch(`${API}/category/create/${userId}`, {
		method: 'POST',
		headers: generateHttpHeaderJsonInput(token),
		body: JSON.stringify(categoryInput)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log('API call error: ', err);
			return JSON.stringify({
				error: err
			});
		});
};

export const CreateProduct = (userId: string, token: string, product: FormData): Promise<any> => {
	console.log('CreateProduct() input: ', product);

	return fetch(`${API}/product/create/${userId}`, {
		method: 'POST',
		headers: generateHttpHeaderFormDataInput(token),
		body: product
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log('API call error: ', err);
			return JSON.stringify({
				error: err
			});
		});
};
