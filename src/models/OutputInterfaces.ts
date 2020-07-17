export interface IProductOutput {
	_id: string;
	name: string;
	description: string;
	price: number;
	category: any;
	quantity?: number;
	sold: number;
	photo: any;
	shipping?: boolean;
	error?: string;
}

export interface ICategoryOutput {
	_id: string;
	name: string;
	error?: string;
}
