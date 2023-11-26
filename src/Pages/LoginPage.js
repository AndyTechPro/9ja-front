import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const[redirect, setRedirect] = useState(false); 
    const {setUserInfo} = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
      
            const response = await fetch("https://ninejaback.onrender.com/admin",{
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            });
    
            if (response.ok) {
                response.json().then(data => {
                    console.log('Received Token:', data.token); // adjust this based on your response structure
                    setUserInfo(data);
                    setRedirect(true);
                });
            } else {
                console.error('Login failed:', response.statusText);
                alert('Login failed. Please check your credentials.');
            }
            
            
        } 
        
    if (redirect) {
        return <Navigate to={'/AdminDashboard'} />
    }

    return(
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
            placeholder="Username"
            value={username}
            onChange={ev => setUsername(ev.target.value)}/>
            <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
    );
}