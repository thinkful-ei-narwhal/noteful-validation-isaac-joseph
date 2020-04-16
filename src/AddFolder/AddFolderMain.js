import React, { Component } from 'react';
import ContextStore from '../ContextStore';

export class AddFolderMain extends Component {
	static contextType = ContextStore;

	state = {
		name: '',
	};

	updateFolderName = (e) => {
		this.setState({
			name: e.target.value,
		});
	};

	render() {
		const { handleSubmit } = this.context;
		return (
			<div>
				<form
					action='#'
					id='add-folder'
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(this.state);
						this.props.history.push('/');
					}}
				>
					<label htmlFor='folder-name'>Name</label>
					<input
						type='text'
						name='folder-name'
						id='folder-name'
						onChange={(e) => this.updateFolderName(e)}
					/>

					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}

export default AddFolderMain;
