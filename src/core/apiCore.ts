import {API} from '../config/config';

// TODO: shared function
const generateHttpHeader = () => {
	return {
		Accept: 'application/json;odata=verbose',
		'Content-Type': 'application/json'
	};
};

export const getProducts = (sortBy: string) => {
	// * params are CASE-SENSITIVE and should match the whole word
	// * ex. 'sortby', 'sort' will not work
	const url = `${API}/products?sortBy=${sortBy}&orderBy=desc&limit=5`;
	// console.log('getting product list: ', url);

	return fetch(url)
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

export const getFilteredProducts = (skip: number, limit: number, filters: any) => {
	// * params are CASE-SENSITIVE and should match the whole word
	// * ex. 'Filter', 'filter' will not work
	const data = {skip, limit, filters};
	// console.log(JSON.stringify(data));

	const url = `${API}/products/by/search`;

	return fetch(url, {
		method: 'POST',
		headers: generateHttpHeader(),
		body: JSON.stringify(data)
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

// * copied from /admin/apiAdmin.ts
export const getCategories = () => {
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
