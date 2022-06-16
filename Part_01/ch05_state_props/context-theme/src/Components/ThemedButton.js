import React from 'react';
import { ThemeContext } from "../Context/Theme";

class ThemedButton extends React.Component{
    render(){
        let props = this.props;
        let theme = this.context.theme;
        return (
            <button
                {...props}
                style={{backgroundColor:theme.background}}
            />
        );
    }
}
ThemedButton.contextType=ThemeContext;

export default ThemedButton;