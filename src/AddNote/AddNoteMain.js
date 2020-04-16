import React from 'react';
import ContextStore from '../ContextStore';

export default class AddNoteMain extends React.Component {
  static contextType = ContextStore;

  state = {
    name: '',
    folderId: null,
  }

  render() {
    const { folders } = this.context;
    const options = folders.map(folder => {
      return (
        <option value={folder.id}>{folder.name}</option>
      )
    });
    return (
      <div>
        <h3>From Add note main</h3>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={this.state.name} />
        <label htmlFor="note-content">Type in content</label>
        <textarea id="content" name="content" value={this.state.content}></textarea>
        <select>
          <option value='' hidden>Select a folder</option>
          {options}
        </select>
      </div>
    )
  }
}