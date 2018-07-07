import React, {Fragment, Component} from 'react';
import {fmtTime} from '../../libs/mqsm-client-utils';
import MQSMRating from '../mqsm-common-components/mqsm-star-rating.component';

import OverlayHOComponent from '../mqsm-common-components/mqsm-overlay.component';
import SongDetails from './mqsm-song-details.component';

const DetailsOverlay = OverlayHOComponent(SongDetails);

class SongComponent extends Component {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };

        this.toggleSongDetails = this.toggleSongDetails.bind(this);
    }

    /**
     *
     */
    toggleSongDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    /**
     *
     * @return {*}
     */
    render() {
        const duration = fmtTime(this.props.duration);
        const overlayProps = {
            showOverlay: this.state.showDetails,
            toggleOverlay: this.toggleSongDetails,
            ...this.props
        };

        return (
            <Fragment>
                <div className="mqsm-song-info" onClick={this.toggleSongDetails}>
                    <div className="row">
                        <h6 className="mqsm-title-info col-9">{this.props.title}</h6>
                        <div className="col-2">
                            <MQSMRating rating={this.props.rating}/>
                        </div>
                        <div className="col-1">
                            {duration}
                        </div>
                    </div>
                </div>
                <DetailsOverlay {...overlayProps} />
            </Fragment>
        );
    }
}

export default SongComponent;