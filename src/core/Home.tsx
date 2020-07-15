import React, {FC, useEffect} from 'react';
import Layout from '../core/Layout';

const Home: FC = () => {
	useEffect(() => {
		console.log('inside Home');
	}, []);

	return (
		<>
			<Layout title="Home Page" description="React E-Commerce App"></Layout>
		</>
	);
};

export default Home;
