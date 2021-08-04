### The `<Navigation />` Component

This component is responsible for allowing a user to navigate between different components on a page. It has foward and
the back navigations which render different components following an onClick callback method.

#### properties:

**NOTE**: The `<other-props-list>` in `<Navigation <other-props-list> backwards />` and <br />
&emsp;&emsp;&emsp;&emsp;`<Navigation <other-props-list> forwards />` is used for **ILLUSTRATION ONLY**.<br />
&emsp;&emsp;&emsp;&emsp;Do not use this notation in calling the Navigation component!<br />
&emsp;&emsp;&emsp;&emsp;Instead, replace that notation with at least one property and its value (if it applies). <br />

**NOTE 2**: If either of `forwards` or `backwards` properties are missing at the same time, <br />
&emsp;&emsp;&emsp;&emsp;the component results to showing both the forwards and backwards instances at the same
time.<br />

See list of properties illustrated below:

```
    zIndex - a integer telling the component how shallow it should be in the DOM tree's z-axis view;
            that is, how far away it is from you.
            The higher the number the shallower it is. This mirrors and uses the
            CSS 'z-index' attribute. It defaults to 2050.
    
    position - an array of strings telling the component where in the viewport 
                it should position itself. In either <Navigation <other-props-list> backwards />
                or <Navigation <other-props-list> forwards />, it defaults to a top of 50% and 
                a left of 0% and 90% respectively.
                
    forwards - an attribute that tells the navigation component to show a forward navigation 
                component and mount it to the right of the viewport. Defaults to showing it
                at the center (along the viewport's height) -> top: 50%, left: 94% passed 
                in the position property as an array (by default) of ['50%','94%'].
                
    backwards - an attribute that tells the navigation component to show a backward navigation 
                componentand mount it to the left of the viewport. Defaults to showing it
                at the center (along the viewport's height)-> top: 50%, left: 0% passed 
                in the position property as an array (by default) of ['50%','0%'].
                
    navigableComponents - this is an array of components (complete with their (desired) properties)
                that the navigation switches in and out of the desired viewport area.
    
    callback - the method to call when the navigation is clicked. Note that the callback property
                assumes that it's concerned with switching of navigableComponents. The engineer
                should provide mechanisms of conducting additional functionality if desired.
                
    navigateTo - this is an integer telling the navigation component which component (through
                its index) to navigate to. Defaults to navigableComponents halfway mark (even
                when its absent - which is 0).
                
    forwardColour - a string of HEX digits or colour name that tells the colour that is to be applied
                        to the forwards control.
  
    backwardColour - a string of HEX digits or colour nam that tells the colour that is to be applied to
                       the backwards control.
                       
    noBorder - a property that tells the navigation to not show a border around the shevron.
                 
```


### The `<SubmitButton />` and `<CancelButton />` Components

These components each wrap the default HTMLButtonElement interface and provides two properties: `callback`
and `commandText`.

```
callback - is a reference to an external method that should be executed when this control is clicked
commandText - is the text that is human-readable that tells what the button is intended for.
```

Note the case on the `commandText` property. These cases **ARE CASE SENSITIVE**.
