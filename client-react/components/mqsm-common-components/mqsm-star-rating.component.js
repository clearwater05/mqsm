import classNames from 'classnames';
import React from 'react';

export default (props) => {
    const id = Math.random();
    const stars = [1, 2, 3, 4, 5].map((i, index) => {
        return (
            <div className="star" key={`star${i}${index}`}>
                <i className="star-empty"> </i>
                <i className="star-half"> </i>
                <i className="star-filled"> </i>
            </div>
        );
    });

    const showStar = Math.floor(props.rating / 2);
    const showHalf = props.rating % 2 !== 0 ? 'half' : '';

    const ratingStyle = classNames(
        'rating',
        `value-${showStar}`,
        showHalf,
        'star-icon',
        'direction-ltr',
        'color-default'
    );

    return (
        <div className={ratingStyle}>
            <div className="star-container">
                {stars}
            </div>
        </div>
    );
};