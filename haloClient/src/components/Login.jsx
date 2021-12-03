import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import './Css/Login.css'
import { ProductState } from '../Context/Context'
import { InfoRounded } from '@material-ui/icons'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
function Login() {
    const [formerror, setFormerror] = useState("")
const [data, setdata] = useState({
    email:'',
    password:''
});
const history=useHistory()
const {state,dispatch}=ProductState();
useEffect(()=>{
if(state.id)<Redirect to="/"/>},[])
const validate=(data)=>{
let errors=""
    if(!data.email || !data.password){errors="fill the complete form"}
    else if(!data.password||data.password.length<6){
errors=" password length too short"
    }
return errors
}
const handleChange=(e)=>{
const {name,value}=e.target;
setdata({...data,[name]:value})


};

const handleSubmit=(e)=>{
    e.preventDefault();
    setFormerror(validate(data));
    if(validate(data))
    {
        setFormerror(validate(data))
    }
    else{
        setFormerror("")
       postLoginForm(data)
    }
}
const postLoginForm=async(userInfo)=>{ 
   const {data}= await axios.post('http://localhost:2000/login',userInfo);
   if(data.error){setFormerror(data.error)}
   else
   {
await localStorage.setItem("accessToken",data.token);     
 dispatch({type:"AUTH",payload:{auth:true,userName:data.userName,email:data.email,id:data.id}})
history.push("/home")


   }
}
    return (
        <div className="login">
           <span className="login_title"> Login!!!</span>

            <form onSubmit={handleSubmit} className="loginForm">
            {formerror && <>  <span  className="login_error" > <InfoRounded className="error_info"/> {formerror}</span></>}


            <label htmlFor="email">email</label>

<input className="loginInput"
  type="email"
id="email"
  onChange={handleChange}
  name="email"
  value={data.email}
/>
<label htmlFor="password">password</label>
<input className="loginInput"
  type="password"
  id="password"
  onChange={handleChange}
  name="password"
  value={data.password}
/>

<button type="submit" className="loginSubmit" > log in</button>

<div className="signin_wrapper">Don't have an account?

<button className="signin_button" onClick={()=>history.push('/signup')}>Sign up</button>

</div>
            </form>


        </div>
    )
}

export default Login
