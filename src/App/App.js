import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolderNav';
import AddFolderMain from '../AddFolder/AddFolderMain';
import AddNoteMain from '../AddNote/AddNoteMain';
import AddNoteNav from '../AddNote/AddNoteNav';

import CreateContext from '../ContextStore';
import './App.css';

class App extends Component {
	state = {
		notes: [],
		folders: [],
	};

	fetchAPI = (endpoint) => {
		return fetch(`http://localhost:9090/${endpoint}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.then((data) => {
				return data;
			});
	};

	deleteNote = (noteId) => {
		return fetch(`http://localhost:9090/notes/${noteId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
		}).then(() => {
			const notes = this.state.notes.filter((note) => {
				return note.id !== noteId;
			});
			this.setState({
				notes: notes,
			});
		});
	};

	/* ***************************************
					Handle Submit
	*****************************************/
	handleSubmit = (body) => {
		const newItem = JSON.stringify(body);
		return fetch(`http://localhost:9090/folders`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: newItem,
		}).then(() => {
			this.fetchAPI('folders').then((res) => {
				this.setState({
					folders: res,
				});
			});
		});
	};

	componentDidMount() {
		// fake date loading from API call

		this.fetchAPI('notes').then((res) => {
			this.setState({
				notes: res,
			});
		});

		this.fetchAPI('folders').then((res) => {
			this.setState({
				folders: res,
			});
		});
	}

	renderNavRoutes() {
		const { notes, folders } = this.state;
		return (
			<CreateContext.Provider
				value={{
					notes: notes,
					folders: folders,
				}}
			>
				{['/', '/folder/:folderId'].map((path) => (
					<Route exact key={path} path={path} component={NoteListNav} />
				))}
				<Route path='/note/:noteId' component={NotePageNav} />
				<Route path='/add-folder' component={AddFolder} />
				<Route path='/add-note' component={AddNoteNav} />
			</CreateContext.Provider>
		);
	}

	renderMainRoutes() {
		const { notes, folders } = this.state;

		return (
			<CreateContext.Provider
				value={{
					notes: notes,
					folders: folders,
					deleteNote: this.deleteNote,
					handleSubmit: this.handleSubmit,
				}}
			>
				{['/', '/folder/:folderId'].map((path) => (
					<Route exact key={path} path={path} component={NoteListMain} />
				))}
				<Route path='/note/:noteId' component={NotePageMain} />
				<Route path='/add-folder' component={AddFolderMain} />
				<Route path='/add-note' component={AddNoteMain} />
			</CreateContext.Provider>
		);
	}

	render() {
		//this.delete();
		if (this.state.notes.length > 0 && this.state.folders.length > 0) {
			return (
				<div className='App'>
					<nav className='App__nav'>{this.renderNavRoutes()}</nav>
					<header className='App__header'>
						<h1>
							<Link to='/'>Noteful</Link>{' '}
							<FontAwesomeIcon icon='check-double' />
						</h1>
					</header>
					<main className='App__main'>{this.renderMainRoutes()}</main>
				</div>
			);
		} else {
			return <div>Loading</div>;
		}
	}
}

export default App;
