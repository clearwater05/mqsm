import React, {Fragment, PureComponent} from 'react';
import OverlayHOComponent from '../mqsm-common-components/mqsm-overlay.component';
import CoverPreviewImage from './mqsm-cover-preview.component';

const CoverOverlay = OverlayHOComponent(CoverPreviewImage);

export default class AlbumCover extends PureComponent {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            showCoverPreview: false
        };

        this.toggleCoverPreview = this.toggleCoverPreview.bind(this);
    }

    toggleCoverPreview() {
        this.setState({
            showCoverPreview: !this.state.showCoverPreview
        });
    }

    /**
     *
     */
    render() {
        const overlayProps = {
            showOverlay: this.state.showCoverPreview,
            toggleOverlay: this.toggleCoverPreview,
            ...this.props
        };

        return (
            <Fragment>
                <div className="pt-card pt-elevation-1 pt-interactive mqsm-cover-wrapper"
                     onClick={this.toggleCoverPreview}>
                    <img src={this.props.cover}
                         alt={this.props.albumName}
                         width={this.props.thumbWidth}
                         height="auto"/>
                </div>
                <CoverOverlay {...overlayProps} />
            </Fragment>
        );
    }
};