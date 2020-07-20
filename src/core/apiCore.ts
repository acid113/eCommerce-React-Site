import {API} from '../config/config';

export const getProducts = (sortBy: string) => {
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
