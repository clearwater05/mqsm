import React, {PureComponent} from 'react';
import {MenuItem, Button} from '@blueprintjs/core';
import {Select} from '@blueprintjs/select';

export default class MqsmSelect extends PureComponent {
    /**
     * @typedef {Object} MqsmSelectAttributes
     * @property {Array} items
     * @property {Function} selectItem
     *
     * @param {MqsmSelectAttributes} props
     */
    constructor(props) {
        super(props);
        this.state = {
            selectedAttr: null
        };

        this.filterAttribute = this.filterAttribute.bind(this);
        this.itemRenderer = this.itemRenderer.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
    }

    /**
     *
     * @param query
     * @param attribute
     * @returns {boolean}
     */
    filterAttribute(query, attribute) {
        return attribute.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }

    /**
     *
     * @param item
     * @param handleClick
     * @param modifiers
     * @returns {*}
     */
    itemRenderer(item, {handleClick, modifiers}) {
        return (
            <MenuItem active={modifiers.active}
                      key={item}
                      label={item}
                      onClick={handleClick}
                      text={item}/>
        );
    };

    /**
     *
     * @param item
     */
    onItemSelect(item) {
        this.setState(() => {
            return {
                selectedAttr: item
            };
        });

        if (typeof this.props.selectItem === 'function') {
            this.props.selectItem(item);
        }
    };

    /**
     *
     */
    render() {
        return (
            <Select items={this.props.items}
                    itemPredicate={this.filterAttribute}
                    itemRenderer={this.itemRenderer}
                    onItemSelect={this.onItemSelect}
                    className="mqsm-select">
                <Button
                    icon="film"
                    rightIcon="caret-down"
                    text={this.state.selectedAttr || 'Select Property'}
                />
            </Select>
        );
    }
}