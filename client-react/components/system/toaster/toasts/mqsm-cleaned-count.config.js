import React from 'react';

export default (props) => {
    return {
        className: 'bp3-dark',
        icon: 'trash',
        message: `Songs cleaned: ${props.cleanedSongCount.count}`
    };
};