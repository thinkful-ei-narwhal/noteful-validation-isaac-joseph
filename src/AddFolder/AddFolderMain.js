import React, { Component } from 'react';
import ContextStore from '../ContextStore';
import './FolderMain.css';

export class AddFolderMain extends Component {
	static contextType = ContextStore;

	state = {
		name: '',
		touch: false,
	};

	updateFolderName = (e) => {
		this.setState({
			touch: true,
			name: e.target.value,
		});
	};

	handleError = () => {
		if (this.state.name.length === 0) {
			return <p>Folder must have a name.</p>;
		}

		if (this.state.name.length <= 3) {
			return <p>Folder name must be more than 3 characters long</p>;
		}
	};

	handleDisabled = () => (this.state.name.length <= 3 ? 'disabled' : '');

	render() {
		const { handleSubmit } = this.context;
		return (
			<div className='folder-main'>
				<form
					action='#'
					id='add-folder'
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(this.state, 'folders');
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
					{this.state.touch && this.handleError()}

					<button type='submit' disabled={this.handleError()}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default AddFolderMain;
