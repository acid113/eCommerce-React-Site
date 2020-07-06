import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Routes from './Routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
	<React.StrictMode>
		{/* <App /> */}
		<Routes />
	</React.StrictMode>,
	document.getElementById('root')
);
