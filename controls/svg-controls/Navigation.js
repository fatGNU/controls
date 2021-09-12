import BaseControl from "./base/BaseControl";
import "./base/svg-controls.css";

/**
 *
 * Class provides a means for navigation through content supplied through an array of components.
 * It offers 2 possible capabilities through instantiating of the same navigation with different props.
 *  1. forwards - which shows a navigation component with the '>' marker.
 *  2. backwards - which shows a navigation with the '<' marker.
 *
 *  A 'callback' method through the quoted property is used to act on a list of navigableComponents
 *  supplied to the Navigation component to switch (in desired direction) to the component that
 *  follows the current one.
 *
 *  List of applicable properties:
 *
 *  NOTE: Though all the properties are optional, the 'navigableComponents' property is necessary. Otherwise
 *          the instantiated component does nothing useful other than look beautiful.
 *
 *
 *      zIndex - a integer telling the component how shallow it should be in the DOM tree's z-axis view;
 *               that is, how far away it is from you.
 *               The higher the number the shallower it is. This mirrors and uses the
 *               CSS 'z-index' attribute. It defaults to 2050.
 *
 *
 *      position - an array of strings telling the component where in the viewport
 *                   it should position itself. In either <Navigation <other-props-list> backwards />
 *                   or <Navigation <other-props-list> forwards />, it defaults to a top of 50% and
 *                   a left of 0% and 90% respectively.
 *
 *
 *      forwards - an attribute that tells the navigation component to show a forward navigation
 *                   component and mount it to the right of the viewport. Defaults to showing it
 *                   at the center (along the viewport's height) -> top: 50%, left: 90% passed
 *                   in the position property as an array (by default) of ['50%','94%'].
 *
 *
 *      backwards - an attribute that tells the navigation component to show a backward navigation
 *                   component and mount it to the left of the viewport. Defaults to showing it
 *                   at the center (along the viewport's height)-> top: 50%, left: 90% passed
 *                   in the position property as an array (by default) of ['50%','0%'].
 *
 *
 *       navigableComponents - this is an array of components (complete with their (desired) properties)
 *                   that the navigation switches in and out of the desired viewport area.
 *
 *
 *       callback - the method to call when the navigation is clicked. Note that the callback property
 *                   assumes that it's concerned with switching of navigableComponents. The engineer
 *                   should provide mechanisms of conducting additional functionality if desired.
 *
 *
 *       navigateTo - this is an integer telling the navigation component which component (through
 *               its index) to navigate to. Defaults to navigableComponents halfway mark (when it's absent it becomes 0).
 *
 *       forwardColour - a string of HEX digits or colour name that tells the colour that is to be applied
 *                      to the forwards control.
 *
 *       backwardColour - a string of HEX digits or colour nam that tells the colour that is to be applied to
 *                      the backwards control.
 *
 *       noBorder - a property that tells the navigation to not show a border around the shevron.
 *
 */
export default class Navigation extends BaseControl {
  constructor(props) {
    super(props);
    this.navigableComponents =
      props.navigableComponents === undefined ? [] : props.navigableComponents;
    this.callback = props.callback;
    this.defaultNavigateTo =
      props.navigateTo === undefined
        ? this.navigableComponents.length / 2
        : props.navigateTo;
    this.forwards = props.forwards === undefined ;
    this.backwards = props.backwards === undefined;
    this.position =
      props.position === undefined ? ["50%", "0%"] : props.position;
    //how shallow should this component be in the view of the DOM tree?
    this.zIndex = props.zIndex === undefined ? 3000 : props.zIndex;
    this.forwardsColour =
      props.forwardsColour === undefined
        ? String("#474747")
        : props.forwardsColour;
    this.backwardsColour =
      props.backwardsColour === undefined
        ? String("#474747")
        : props.backwardsColour;
    this.noBorder = props.noBorder !== undefined;
    //determine border styling
    this.borderStyling = this.noBorder
      ? null
      : { border: `1px solid ${this.forwardsColour}`, borderRadius: 3 };

    /*
     * THESE TWO BELOW ARE FOR INTERNAL USE ONLY!
     * possible navigation placement when a position is issued as a property
     * do this by default: final positions, switch out the values if one of them is 0%
     * this applies to scenarios where forwards and backwards ar missing at the same time, or that
     * a position is absent
     */
    this.isSetOfNavigation =
      this.forwards === undefined && this.backwards === undefined;
    this.finalBackwardsPosition =
      props.position === undefined || !this.isSetOfNavigation
        ? ["50%", "-0%"]
        : null;
    this.finalForwardsPosition =
      props.position === undefined || !this.isSetOfNavigation
        ? ["50%", "94%"]
        : null;
    //
    // This is used to keep track of the current view of the component desired.
    // It does so by storing  a reference to the current component that has been mounted
    // it stores and index number of the navigableComponent that is currently in view.
    //
    this.state = {
      currentComponent: this.defaultNavigateTo,
    };
  }

  /**
   *
   * Receive the new navigation position
   * @param nextProps
   * @param nextContext
   * @constructor
   */
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.setState((state) => {
      state.currentComponent = nextProps.navigateTo;
      return state;
    });
  }

  /**
   *
   * when mounted, navigate to the centre of the navigableComponents or the item that's been issued as navigateTo
   * property.
   *
   */
  componentDidMount = () => {
    this.navigateTo(); //default navigate to the desired component. defaults to half-way through the navigableList
    // console.log(this.props.forwards)
  };

  /**
   *
   * Method calls the callback method on the component that is currently navigated to:
   * @param itemIndex an integer telling the component which component in the list of navigableComponents array
   *                   to navigate to or load.
   *
   * @returns {*} the integer passed as the itemIndex or false if it's absent. or Throws all together?
   *
   */
  navigateTo = (itemIndex = this.defaultNavigateTo) => {
    this.props.updateNavigationNumber(itemIndex);
    //make adjustment of current component to the desired one.
    //check if you are at the end
    let currentComponentIndex = itemIndex;
    if (currentComponentIndex === this.navigableComponents.length)
      //current component is maximum component length - 1
      currentComponentIndex = this.navigableComponents.length - 1;
    //last component
    else if (itemIndex < 0)
      //do swap
      currentComponentIndex = 0;
    this.setState((state) => {
      state.currentComponent = currentComponentIndex;
      return state;
    });
    //call the callback (renderNextSection) on the current component from the current index
    this.callback(this.navigableComponents[currentComponentIndex]);
    return itemIndex <= this.navigableComponents.length
      ? itemIndex
      : RangeError("No such component position to navigate to!"); //this is silently corrected before RangeError is established.
  };

  /**
   * forwards icon
   * @param position the position to place the navigation tool. Defaults to the position issued as a property or the default
   *              should the property be missing.
   * @returns JSX forwards component
   *
   */
  showForwards = (position = this.position) => {
    return (
      <div
        className={"svg-control foward-navigation-control"}
        style={{
          position: 'fixed',
          top: position[0],
          left: position[1],
          zIndex: this.zIndex,
          ...this.borderStyling,
        }}
      >
        <svg
          onClick={() => {
            this.navigateTo(this.state.currentComponent + 1);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="36"
          fill={this.forwardsColour}
          class="bi bi-chevron-compact-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
          />
        </svg>
      </div>
    );
  };
  /**
   * backwards icon
   * @param position the position to place the navigation tool. Defaults to the position issued as a property or the default
   *              should the property be missing.
   * @returns JSX backwards component
   *
   */
  showBackwards = (position = this.position) => {
    return (
      <div
        className={"svg-control back-navigation-control"}
        style={{
          position: 'fixed',
          top: position[0],
          left: this.position[1],
          zIndex: this.zIndex,
          ...this.borderStyling,
        }}
      >
        <svg
          onClick={() => {
            this.navigateTo(this.state.currentComponent - 1);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="36"
          fill={this.backwardsColour}
          class="bi bi-chevron-compact-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"
          />
        </svg>
      </div>
    );
  };
  /**
   *
   * shows at least one of the navigations that have been specified. by default, it'll show both.
   * @returns {JSX.Element}
   *
   */
  render = () => {
    //navigation set to show
    //if either the finalXXXPosition items are null, show both else show the one that's specified
    return this.finalBackwardsPosition !== null ? (
      <>
        {<>{this.showBackwards(this.finalBackwardsPosition)}</>}
        {<>{this.showForwards(this.finalForwardsPosition)}</>}
      </>
    ) : (
      <>
        {
          this.props.forwards
            ? this.showForwards() //defaults to using position
            : this.props.backwards
            ? this.showBackwards() //defaults to using position
            : null //defaults to using no default position
        }
      </>
    );
  };
}
