import React, { Component } from "react";
import PropTypes from "prop-types";

class MarvelDisplayList extends Component {
  static propTypes = {
    charactersActions: PropTypes.object,
    characters: PropTypes.array,
    handleClick: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      characters: props.characters
    };
  }


  componentDidMount() {
    console.log("here");
    this.props.charactersActions.fetchCharacters();
  }

  componentWillReceiveProps(nextProps) {
    const { characters } = nextProps;
    console.log("characters", characters);
    this.setState({
      characters
    });
  }

  displayThumbnails(src) {
    console.log("src", src);
    return(
      <img src={src}/>
    );
  }

  handleClick = (character) => {
    this.props.handleClick(character);
  }

  render() {
    console.log("this.state", this.state);
    return (
      <table className="table" style={{ textAlign: "center" }}>
        <tbody>
          {this.state.characters && this.state.characters.map((character, i) => (
            <tr key={i} onClick={() => this.handleClick(character)}>
              <td>{this.displayThumbnails(character.thumbnail.path +"/portrait_small."+ character.thumbnail.extension)}</td>
              <td>{character.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

    );
  }
}

export default MarvelDisplayList;