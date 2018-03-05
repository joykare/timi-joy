import React, { Component } from "react";
import PropTypes from "prop-types";

class MarvelDisplayList extends Component {
  static propTypes = {
    charactersActions: PropTypes.object,
    characters: PropTypes.array,
  }

  componentDidMount() {
    this.props.charactersActions.fetchCharacters();
  }

  render() {
    return (
      <table className="table">
        <thead>
          <h4>Marvel Play Field</h4>
        </thead>
        <tbody>
          {this.props.characters && this.props.characters.map((character, i) => (
            <tr key={i}>
              <td>{this.displayThumbnails(character.thumbnail.path +"/portrait_small."+ character.thumbnail.extension)}</td>
              <td>{character.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

export default MarvelDisplayList;