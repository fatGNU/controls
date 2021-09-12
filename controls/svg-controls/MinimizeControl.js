import BaseControl from "./base/BaseControl";

/**
 *
 * Just like MaximizeControl but transformed rotate by 90 degres
 *
 */
export default class MinimizeControl extends BaseControl {
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.style = props.style === undefined ? {width: 60, height: 60} : props.style;//square width and height of 60 px
        //original colour of the control
        // #141124
    }

    render = () => {
        return (
            <svg
                style= {{...this.style, marginTop: 20}}
                 onClick={this.callback}
                 className={`${this.className}`}
                 viewBox="0 0 28 28"
                 xmlns="http://www.w3.org/2000/svg"
            >
                    <rect width={40} height={8}
                          fill ={"var(--ci-primary-color, currentColor)"}
                          className = {"ci-primary"}
                    />
                </svg>

        );
    }
}
