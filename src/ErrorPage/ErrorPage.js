import React from 'react';

export default class ErrorPage extends React.Component {
	state = { error: null };

	static getDerivedStateFromError(error) {
		console.log('error from error page', error);

		return { error };
	}

	componentDidCatch(error) {
		console.log('error from error page', error);
	}

	render() {
		if (this.state.error) {
			console.log('error from error page', this.state.error);
			return (
				<main className='error-page'>
					<h1>Something seems to have gone wrong</h1>
					<p>Try refreshing the page</p>
				</main>
			);
		}

		return this.props.children;
	}
}
