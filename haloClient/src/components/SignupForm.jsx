import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import axios from "axios";
import "./Css/SignupForm.css";
function SignupForm() {
  const  history=useHistory()
  const [errors, setErrors] = useState();
  const [response,setResponse] = useState({});
  const [validated] = useState(false);
  const [userInfo, setuserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const postForm = async (info) => {
    const { data } = await axios.post("http://localhost:2000/signup", info);
   await setResponse(data)
   console.log(data);
  await data.success && history.push("/login")
   
  };

  const validateForm = (datas) => {
    let formError = "";
    const { firstName, lastName, email, address, password, confirmPassword } =
      datas;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      formError = "Please fill all the blanks";
    } else if (firstName.length < 3 || lastName.length < 3) {
      formError = "firstName and lastName cannot be less than 3 char";
    } else if (password.length < 6) {
      formError = "password length cannot be less than 6 characters";
    } else if (password !== confirmPassword) {
      formError = "two password did not match";
    }

    return formError;
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (validateForm(userInfo)) {
      setErrors(validateForm(userInfo));
    } else {
      postForm(userInfo);
      setErrors("");
    }

    //set error to be the errors returned by validateForm(userInfo);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="signup">
      {errors ? <div className="error">{errors}</div> : ''}
      {response.success===0 && <span className="error">  {response.message}</span>}
 
      <form
        className="form"
        onSubmit={submitForm}
      >
        <label>firstName</label>

        <input
          className="signupinput"
          type="text"
          onChange={handleChange}
          name="firstName"
          value={userInfo.firstName}
        />
        <label>lastname</label>
        <input
          className="signupinput"
          type="text"
          onChange={handleChange}
          name="lastName"
          value={userInfo.lastName}
        />
        <label>email</label>
        <input
          className="signupinput"
          type="text"
          onChange={handleChange}
          name="email"
          value={userInfo.email}
        />
        <label>address</label>
        <input
          className="signupinput"
          type="address"
          onChange={handleChange}
          name="address"
          value={userInfo.address}
        />
        <label>password</label>
        <input
          className="signupinput"
          type="password"
          onChange={handleChange}
          name="password"
          value={userInfo.password}
        />
        <label>confirmPassword</label>
        <input
          className="signupinput"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={userInfo.confirmPassword}
        />
        <button type="submit" className="signupbutton">
          Signup
        </button>

      <div className="login_wrapper"> 
      
      Already have an Account?
       <button onClick={()=>history.push('/login')} className="signupbutton">
          Login
        </button>
</div>

      </form>
      
 </div>
  );
}

export default SignupForm;
