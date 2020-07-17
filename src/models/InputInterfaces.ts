export interface IProductInput {
	name: string;
	description: string;
	price: number;
	category: any;
	quantity?: number;
	sold?: number;
	photo?: any;
	shipping?: boolean;
	formData: FormData; // * this is because we're passing form-data, not json
}
