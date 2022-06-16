import React from 'react';
import { ThemeContext, themes } from '../Context/Theme';
import ThemedButton from './ThemedButton';
import Header from './Header';
import ThemeToggleButton from './ThemeToggleButton';
import { UserContext } from '../Context/AppUser';
//import { Body } from './Body';

function Toolbar(props){
    return (
        <ThemedButton onClick={props.changeTheme}>
            Change Theme
        </ThemedButton>
    );
}

function Layout(){
    return (
        <div>
            <Content />
        </div>
    );
}

function Content(){
    return(
        <ThemeContext.Consumer>
            {({theme, toggleTheme})=>(
                <UserContext.Consumer>
                    {user => (
                        <h1 style={{backgroundColor:theme.background}}>
                            {(user?'Welcome back '+ user:'Welcome')}
                        </h1>
                    )}
                </UserContext.Consumer>
            )}
        </ThemeContext.Consumer>
    );
}

class AppComponent extends React.Component{
    constructor(props){
        super(props);

        this.toggleTheme = () => {
            this.setState(state=>({
                theme:state.theme===themes.dark
                ? themes.light
                : themes.dark,
            }));
        };

        // State also contains the updater function so it will
        // be passed down into the context provider
        this.state = {
            theme:themes.light,
            toggleTheme:this.toggleTheme
        };
    }

    render(){
        // The ThemedButton button inside the ThemeProvider
        // uses the theme from state while the one outside uses
        // the default dark theme

        
        // The entire state is passed to the provider
        return(
            <ThemeContext.Provider value={this.state}>
                <Toolbar changeTheme={this.toggleTheme}/>
                <ThemeToggleButton />
                <Header />
                {/*<Body />*/}
                <UserContext.Provider value={null}>
                    <Layout />
                </UserContext.Provider>
                <UserContext.Provider value={'Robert'}>
                    <Layout />
                </UserContext.Provider>
            </ThemeContext.Provider>
        );
    }
}

export default AppComponent;