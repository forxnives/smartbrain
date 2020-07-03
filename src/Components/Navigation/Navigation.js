import React from 'react';

const Navigation = ({ onRouteChange, signedIn }) => {
	if (signedIn === true){
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer' onClick={ () => onRouteChange('Signin') }>Sign Out</p>
			</nav>
		)
	}else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer' onClick={ () => onRouteChange('Signin') }>Sign in</p>
				<p className='f3 link dim black underline pa3 pointer' onClick={ () => onRouteChange('register') }>Register</p>
			</nav>
		)
	}

}


export default Navigation;