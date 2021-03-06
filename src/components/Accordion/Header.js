/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { PropTypes } from 'react';
import Component from '../../Component';
import bind from '../../decorators/bind';
import collectionOf from '../../prop-types/collectionOf';
import generateTabIndex from '../../utility/generateTabIndex';
import CONTEXT_TYPES from './contextTypes';
import MODULE from './module';

export default class Header extends Component {
    static module = MODULE;

    static contextTypes = CONTEXT_TYPES;

    static propTypes = {
        active: PropTypes.bool.isRequired,
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        onClick: collectionOf.func
    };

    /**
     * Update the index on the parent component when clicked.
     *
     * @param {SyntheticEvent} e
     */
    @bind
    handleOnClick(e) {
        this.getContext().toggleItem(this.props.index);
        this.handleEvent('click', e);
    }

    /**
     * Render the accordion item header tab and set the relevant active state.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props,
            index = props.index,
            active = props.active;

        return (
            <header
                role="tab"
                id={this.formatID('accordion-header', index)}
                className={this.formatChildClass('header', {
                    'is-active': active
                })}
                aria-controls={this.formatID('accordion-section', index)}
                aria-selected={active}
                aria-expanded={active}
                tabIndex={generateTabIndex(this)}
                onClick={this.handleOnClick}
            >
                {props.children}
            </header>
        );
    }
}
