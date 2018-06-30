import React from 'react';
import MQSMRating from '../../mqsm-common-components/mqsm-star-rating.component';

export default (props) => {
    return (
        <div className="mqsm-current-song-info">
            <div className="row">
                <h6 className="mqsm-title-info col-10">{props.title}</h6>
                <div className="col-2">
                    <MQSMRating rating={props.rating}/>
                </div>
            </div>
            <div className="mqsm-artist-album-info">{props.artist} - {props.album}</div>
        </div>
    );
};