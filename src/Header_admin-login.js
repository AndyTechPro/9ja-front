import { useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header_Adminlogin(){
    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
      fetch('https://ninejaback.onrender.com/profile', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(userInfo => {
        setUserInfo(userInfo);
      })
      .catch(error => {
        console.error('Profile request failed:', error);
      });
    }, []);
    
  
    function logout() {
      fetch('https://ninejaback.onrender.com/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
    }
  
    const username = userInfo?.username;

    return(
        <header className="header">
    
          <nav className="nav-header-admin">
          <div className="logo">
               <a href="/">9ja<span>Moives</span>.com</a>
            </div>
           <div>
            <h1>Admin Dashboard</h1>
          </div>
                  {username && (
               <>
                 <span className="welcome"><h3>Welcome<b>:</b> {username}</h3></span>
                   <button className="admin_btn" onClick={logout}>Logout</button>
               </>
            )}
              {!username && (
            <>
             <div className="login_reg">
             <Link className="admin_btn" to="/admin">Login</Link>
              
              
              <Link className="admin_btn" to="/adminReg">Register</Link>
             </div>
             
          </>
          )}
    </nav>
</header>
    );
}