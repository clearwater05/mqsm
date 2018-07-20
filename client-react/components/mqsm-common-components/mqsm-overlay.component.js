import classNames from 'classnames';
import React, {PureComponent} from 'react';
import {Overlay, Classes} from '@blueprintjs/core';

export default (OverlayContent) => {
    return class MQSMOverlay extends PureComponent {
        /**
         *
         * @param props
         */
        constructor(props) {
            super(props);

            this.state = {
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
                'mqsm-overlay'
            );
        }

        /**
         *
         * @return {*}
         */
        render() {
            return (
                <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER}
                         isOpen={this.props.showOverlay}
                         onClose={this.props.toggleOverlay} {...this.state}>
                    <div className={this.overlayClasses}>
                        <OverlayContent {...this.props}/>
                    </div>
                </Overlay>
            );
        }
    };
}