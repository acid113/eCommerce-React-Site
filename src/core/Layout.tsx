import React from 'react';
import Menu from '../core/Menu';
import '../styles.css';

// ? you can use interface instead of using prop-types
interface ILayoutProps {
	title: string;
	description: string;
	className?: string;
	children?: any;
}

// ? instead of passing "props" and then deconstruct to get properties, we could deconstruct it immediately and add default values
// const Layout = ({title = 'Title', description = 'Description', className, children}) => {
// const Layout = ({title, description, className, children}) => {
const Layout = (props: ILayoutProps) => {
	const {title, description, className, children} = props;

	return (
		<div>
			<Menu />
			<div className="jumbotron">
				<h2>{title}</h2>
				<p className="lead">{description}</p>
			</div>
			<div className={className}>{children}</div>
		</div>
	);
};

export default Layout;
