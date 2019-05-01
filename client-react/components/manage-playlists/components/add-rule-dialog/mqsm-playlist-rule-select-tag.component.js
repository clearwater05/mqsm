import React, {PureComponent} from 'react';

import MqsmSelect from '../../../mqsm-common-components/mqsm-select.component';

class PlaylistRuleItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedAttr: null
        };

        this.onItemSelect = this.onItemSelect.bind(this);
    }

    /**
     *
     * @param item
     */
    onItemSelect(item) {
        if (typeof this.props.setSongTag === 'function') {
            this.props.setSongTag(item);
        }
    };

    /**
     *
     */
    render() {
        return (
            <div className="mqsm-manage-playlists-select-property">
                <MqsmSelect items={this.props.attributes} selectItem={this.onItemSelect}/>
            </div>
        );
    }
}

export default PlaylistRuleItem;