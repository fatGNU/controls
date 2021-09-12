import './base/svg-controls.css'
import BaseControl from "./base/BaseControl";

/**
 * Class defines a svg-based buttons to remove content from something of interest.
 * The callback passed to it during its call defines its behaviour.
 */
export default class MaximizeControl extends BaseControl {
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.style = props.style === undefined ? {width: 60, height: 60} : props.style;//square width and height of 60 px
        //original colour of the control
        // #141124
    }

    render = () => {
        return (
            //previous style for width and height: width="24px" height="24px"
            <svg
                style= {{...this.style, border: '1px solid'}}
                 onClick={this.callback}
                 className={`${this.className}`}
                 viewBox="0 0 40 40"
                 xmlns="http://www.w3.org/2000/svg"
                 space="preserve"
            >
                    <rect width={40} height={8} fill ={"var(--ci-primary-color, currentColor)"} className = {"ci-primary"} />
                </svg>

        );
    }
}
