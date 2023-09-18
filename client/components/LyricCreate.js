import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        });
    }

    render() {
        return (<div>
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input onChange={event => this.setState({content: event.target.value})}
                 value = {this.state.content}/>
            </form>
        </div>);
    }
}

const mutation = gql `
    mutation AddLyricToSong($songId: ID, $content: String) {
        addLyricToSong(content: $content, songId: $songId) {
            id,
            title,
            lyrics {
                content
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);