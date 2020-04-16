import React from 'react';
import ContextStore from '../ContextStore';

export default class AddNoteMain extends React.Component {
  static contextType = ContextStore;

  state = {
    name: '',
    folderId: null,
    content: '',
    modified: new Date()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { folders, handleSubmit } = this.context;
    const options = folders.map(folder => {
      return (
        <option value={folder.id}>{folder.name}</option>
      )
    });
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(this.state, 'notes');
          this.props.history.push('/');
        }}>
          <h3>From Add note main</h3>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
          <label htmlFor="content">Type in content</label>
          <textarea id="content" name="content" value={this.state.content} onChange={(e) => this.handleChange(e)}></textarea>
          <select name="folderId" onChange={(e) => this.handleChange(e)}>
            <option value='' hidden>Select a folder</option>
            {options}
          </select>
          <button type="submit">Create note</button>
        </form>
      </div>
    )
  }
}