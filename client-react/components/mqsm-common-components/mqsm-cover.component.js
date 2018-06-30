import classNames from 'classnames';
import React, {Fragment, PureComponent} from 'react';
import {Intent, Overlay, Button, Classes} from '@blueprintjs/core';

export default class AlbumCover extends PureComponent {
    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            showCoverPreview: false,
            autoFocus: true,
            canEscapeKeyClose: true,
            canOutsideClickClose: true,
            enforceFocus: true,
            hasBackdrop: true,
            usePortal: true
        };

        this.overlayClasses = classNames(
            Classes.CARD,
            Classes.ELEVATION_4,
            Classes.DARK,
            'mqsm-cover-overlay'
        );

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
        return (
            <Fragment>
                <div className="pt-card pt-elevation-1 pt-interactive mqsm-cover-wrapper"
                     onClick={this.toggleCoverPreview}>
                    <img src={this.props.cover}
                         alt={this.props.albumName}
                         width={this.props.thumbWidth}
                         height="auto"/>
                </div>
                <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER}
                         isOpen={this.state.showCoverPreview}
                         onClose={this.toggleCoverPreview} {...this.state}>
                    <div className={this.overlayClasses}>
                        <img src={this.props.cover}
                             alt={this.props.albumName}
                             width="800"
                             height="auto"/>
                    </div>
                </Overlay>
            </Fragment>
        );
    }
};