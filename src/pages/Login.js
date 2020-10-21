import React from "react";
import {useHistory} from 'react-router-dom'

//strapi functions
import loginUser from "../strapi/loginUser"
import registerUser from "../strapi/registerUser"

import {UserContext} from '../context/user'


const Login = ()=> {
  const {userLogin, showAlert, alert} = React.useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('default')
  const [isMember, setIsMember] = React.useState(true)

  let isEmpty = !email || !password || !username; 

  const toggleMember = () => {
    setIsMember((prevIsMember)=>{
      let isMember = !prevIsMember; // toggle membership
      isMember ? setUsername('default'): setUsername('') //set username
      return isMember // return toggled membership value;
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    if(isMember){
      response = await loginUser({email, password});
    }
    else{
      response = await registerUser({email, password, username});
    }
    if(response){
      // navigate from page
      console.log('success');
      const {jwt:token, user:{username}} = response.data; // json web token
      const authenticatedUser = {token, username}
      userLogin(authenticatedUser)
      showAlert({ msg: `Successful Login. Shop away ${username}!` })
      history.push('/products')
    }
    else{
      // show alert
      showAlert({ msg: `Oops! There was an error. Please try again.` , type: 'danger'})
    }
  };

  return <section className="form section">
    <h2 className="section-title">{isMember ? "sign in": "register"}</h2>
    <form className="login-form">

      {/* single input */}
      <div className="form-control">
        <label htmlFor="email">email</label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      {/* end single input */}

      {/* single input */}
      <div className="form-control">
        <label htmlFor="password">password</label>
        <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </div>
      {/* end single input */}

      {/* single input - Only show if user is not a member */}
      { !isMember && (
        <div className="form-control">
          <label htmlFor="username">username</label>
          <input type="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </div> )
      }
      {/* end single input */}



      {/* If form is empty */}
      { isEmpty && (
        <p className="form-empty">please fill out all form fields</p>
        )
      }


      {/* submit button */}
      {!alert.show && (
        <button type="submit" className="btn btn-block btn-primary" onClick={handleSubmit}>submit</button>
      )}
      {/* end single input */}

      {/* register link */}
      <p className="register-link">
        {isMember?"need to register":"already a member"}:
        <button type="button" onClick={toggleMember}>click here</button>
      </p>

      {/* end register link */}




    </form>
    </section>;
}

export default Login;
