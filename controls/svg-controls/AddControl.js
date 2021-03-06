import React from 'react';
import BaseControl from './base/BaseControl';
import './base/svg-controls.css'

export default class AddControl extends BaseControl {
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.style = props.styling === undefined ? {width: 60, height: 60} : props.style;//square width and height of 60 px
        // this.zIndeex = props.zIndex=== undefined? 100: props.zIndex;

    }

    render = () => {
        return (

            <svg style={{...this.style}} onClick={this.callback} viewBox="0 0 24 24" width="50" height="50"
                 stroke="#800080" stroke-width="1" fill="none"
                 stroke-linecap="round" stroke-linejoin="round" className={"add-control svg-control"}>
                <circle cx="12" cy="12" r="10">
                </circle>
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
            </svg>

        );

    }
}
