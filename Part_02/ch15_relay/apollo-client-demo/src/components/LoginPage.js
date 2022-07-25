import { gql, useMutation } from "@apollo/client";

export function LoginPage(){
    const [login, {error, reset}] = useMutation(LOGIN_MUTATION);
    return (
        <div>
            <form>
                <input className="login" />
                <input className="password" />
                <button onClick={login}>Login</button>
            </form>
            {
                error && 
                <LoginFailedMessageWindow 
                    message={error.message}
                    onDismiss={()=>reset()}
                />
            }
        </div>
    );
}

const LOGIN_MUTATION = gql`
`;

function LoginFailedMessageWindow(message, onDismiss){
    return (
        <div>
            <h4>LoginFailedMessageWindow Component</h4> 
            {message}
            <button onClick={()=>onDismiss()}>Dismiss</button>
        </div>
    );
}