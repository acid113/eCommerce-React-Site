import React from 'react';
import {Link} from 'react-router-dom';

import ShowImage from './ShowImage';
import {IProductOutput} from '../models/OutputInterfaces';

interface ICardProps {
	product: IProductOutput;
}

const Card = (props: ICardProps) => {
	const {product} = props;

	return (
		<div className="col-4 mb-3">
			<div className="card">
				<div className="card-header">{product.name}</div>
				<div className="card-body">
					<ShowImage item={product} folder="product" />
					<p>{product.description}</p>
					<p>Php {product.price}</p>
					<Link to="/">
						<button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>
					</Link>
					<button className="btn btn-outline-warning mt-2 mb-2">Add to Card</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
