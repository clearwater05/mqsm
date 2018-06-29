import React from 'react';

export default (props) => {
    return {
        className: 'pt-dark',
        icon: 'trash',
        message: `Songs cleaned: ${props.cleanedSongCount.count}`
    };
};