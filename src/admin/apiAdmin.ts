import {API} from '../config/config';

const generateHttpHeader = (token: string): Headers => {
	return new Headers({
		Accept: 'application/json;odata=verbose',
		Authorization: `Bearer ${token}`
	});
};

const generateHttpHeaderJsonInput = (token: string): Headers => {
	return new Headers({
		Accept: 'application/json;odata=verbose',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	});
};

// export const createCategory = (dataInput: ICategoryInput): Promise<any> => {
export const createCategory = (userId: string, token: string, categoryName: string): Promise<any> => {
	console.log('CreateCategory() input: ', categoryName);

	// * API accepts 'name' input
	const categoryInput = {
		name: categoryName
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

export const getCategories = () => {
	console.log('getting category list');

	return fetch(`${API}/categories`)
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

export const createProduct = (userId: string, token: string, product: FormData): Promise<any> => {
	console.log('CreateProduct() input: ', product);

	return fetch(`${API}/product/create/${userId}`, {
		method: 'POST',
		headers: generateHttpHeader(token),
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
