import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ProductState } from "../Context/Context";
import './Css/ChangePassword.css'
function Profile() {
  const {accountControls}=useParams()
 const {state}= ProductState()
  const [data, setData] = useState({password:"",newPassword:""});
const [response, setResponse] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const changePassword = (e) => {
    e.preventDefault();
    if(!data.password || !data.newPassword)return setResponse({message:'Kindly fill all the fields',success:0})
const credentials={...data,userId:state.id};
axios.post("http://localhost:2000/profile/changePassword",credentials).then((response)=>{
  setResponse(response.data);
})


  };

  return (
    <div className="change_password">
      <form onSubmit={changePassword} className="change_password_form">
      <label htmlFor="password" >password</label>
   <input
   className="inputs"
          id="password"
          type="password"
          onChange={handleChange}
          name="password"
          value={data.password}
        />
        <label htmlFor="newPassword" > New password</label>
        <input
   className="inputs"

        id="newPassword"
          type="password"
          onChange={handleChange}
          name="newPassword"
          value={data.newPassword}
        />

        <button type="submit"className="change_button" >
      change  </button>
      <div className="message">{response.message} </div>
      </form>
    </div>
  );
}

export default Profile;
