import React, { Component } from "react";
import PropTypes from "prop-types";

class MarvelDetailPage extends Component {
  static propTypes = {
    character: PropTypes.object
  }

  displayThumbnails(src) {
    return(
      <img src={src}/>
    );
  }

  displayCharacterDescription(character) {
    if (character.description) {
      return (
        <div style={{ paddingTop: 20 }}>
          <h4>Character Description</h4>
          <p>{character.description}</p>
        </div>
      );
    }
  }

  displayComics(character) {
    if (character.comics.length) {
      return (
        <div style={{ paddingTop: 20 }}>
          {character.comics.items.map((comic, i) => (
            <ul className="list-group" key={i}>
              <li className="list-group-item">{comic.name}</li>
            </ul>
          ))}
        </div>
      );
    }
    return (
      <p>No featured comics available at the moment</p>
    );
  }

  render() {
    const { character } = this.props;

    return (
      <div>
        {this.displayThumbnails(character.thumbnail.path +"/portrait_large."+ character.thumbnail.extension)}
        {this.displayCharacterDescription(character)}
        <h4 style={{ paddingTop: 20 }}>Comic Series {character.name} is featured in:</h4>
        {this.displayComics(character)}
      </div>
    );
  }
}

export default MarvelDetailPage;