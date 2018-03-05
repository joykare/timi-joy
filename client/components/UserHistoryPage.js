import React, { Component } from "react";
import PropTypes from "prop-types";

class UserHistoryPage extends Component {
  static propTypes = {
    eventActions: PropTypes.object,
    events: PropTypes.array,
    isFetching: PropTypes.bool
  }

  componentDidMount() {
    this.props.eventActions.fetchClickHistory();
  }

  displayEvents() {
    const { events, isFetching } = this.props;
    if (events.length) {
      return (
        <div style={{ paddingTop: 20 }}>
          {isFetching ?
            <p>Be patient. Loading your searches...</p>
            :
            <div>
              {events.map((event, i) => (
                <ul className="list-group" key={i}>
                  <li className="list-group-item">
                    {event.characterName}
                    <small style={{ float: "right" }}>{event.createdAt}</small>
                  </li>
                </ul>
              ))}
            </div>
          }
        </div>
      );
    }
    return (
      <p>No searches yet!!</p>
    );
  }

  render() {
    return (
      <div>
        <h4 style={{ padding: 20 }}>History of your Marvel Character Searches:</h4>
        {this.displayEvents()}
      </div>
    );
  }
}

export default UserHistoryPage;