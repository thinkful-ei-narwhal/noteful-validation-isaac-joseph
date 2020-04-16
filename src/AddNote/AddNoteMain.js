import React from 'react';
import ContextStore from '../ContextStore';
import './AddNote.css';

export default class AddNoteMain extends React.Component {
	static contextType = ContextStore;

	state = {
		name: '',
		folderId: '',
		content: '',
		modified: new Date(),
		nameTouch: false,
		folderIdTouch: false,
		contentTouch: false,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
		if (e.target.name === 'name') {
			this.setState({
				nameTouch: true,
			});
		}
		if (e.target.name === 'folderId') {
			this.setState({
				folderIdTouch: true,
			});
		}
		if (e.target.name === 'content') {
			this.setState({
				contentTouch: true,
			});
		}
	};

	handleDisabled = () => {
		if (
			this.state.name.length === 0 ||
			this.state.name.length <= 3 ||
			(this.state.folderId.length === 0 || this.state.folderId.length <= 3) ||
			(this.state.content.length === 0 || this.state.content.length <= 3)
		) {
			return true;
		}
	};

	handleError = (value) => {
		if (this.state[value].length === 0) {
			return <p>{value} must be included.</p>;
		}

		if (this.state[value].length <= 3) {
			return <p>{value} must be more than 3 characters long</p>;
		}
	};

	render() {
		const { folders, handleSubmit } = this.context;
		const options = folders.map((folder) => {
			return (
				<option value={folder.id} key={folder.id}>
					{folder.name}
				</option>
			);
		});
		return (
			<div className='note-main'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(this.state, 'notes');
						this.props.history.push('/');
					}}
				>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						id='name'
						name='name'
						value={this.state.name}
						onChange={(e) => this.handleChange(e)}
					/>
					{this.state.nameTouch && this.handleError('name')}
					<label htmlFor='content'>Type in content</label>
					<textarea
						id='content'
						name='content'
						value={this.state.content}
						onChange={(e) => this.handleChange(e)}
					/>
					{this.state.contentTouch && this.handleError('content')}
					<select name='folderId' onChange={(e) => this.handleChange(e)}>
						<option value='' hidden>
							Select a folder
						</option>
						{options}
					</select>
					{this.state.folderIdTouch && this.handleError('folderId')}
					<button type='submit' disabled={this.handleDisabled()}>
						Create note
					</button>
				</form>
			</div>
		);
	}
}
