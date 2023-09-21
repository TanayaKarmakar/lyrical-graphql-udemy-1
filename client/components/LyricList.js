import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
    onLike(id) {
        console.log('Lyric Id ' + id);
        this.props.mutate({
            variables: {
                id
            }
        });
    }

    renderLyrics() {
        return this.props.lyrics.map(({id, content, likes}) => {
            return <li key = {id} className = "collection-item">
                {content}
                <div className='vote-box'>
                <i className = "material-icons" onClick = {() => this.onLike(id)}>thumb_up</i>
                {likes}
                </div>
            </li>
        })
    }

    render() {
        return (<ul className = "collection">
            {this.renderLyrics()}
        </ul>);
    }

}

const mutation = gql `mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      content,
      likes,
      id
    }
  }`;

export default graphql(mutation)(LyricList);