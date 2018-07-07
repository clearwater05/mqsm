import React from 'react';

export default (props) => {
    return (
        <img src={props.cover}
             alt={props.albumName}
             width="800"
             height="auto"/>
    );
};