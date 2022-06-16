export const Header = function(props){
    // not able to call [this], because it's not a class here
    return (<h1>{props.headerText}</h1>)
}