import React from 'react';
import {API} from '../config/config';

export interface IShowImageProps {
	item: any;
	folder: string;
}

const ShowImage = (props: IShowImageProps) => {
	const {item, folder} = props;

	return (
		<div className="product-img">
			<img src={`${API}/${folder}/photo/${item._id}`} alt={item.name} className="mb-3" style={{maxHeight: '100%', maxWidth: '100%'}}></img>
		</div>
	);
};

export default ShowImage;
