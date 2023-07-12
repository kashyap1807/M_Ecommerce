import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");// name is for GET and setName is fro SET
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  

  const navigate = useNavigate();

  //FORM functin
  const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
        
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{ name, email, password, phone, address,answer });

        if (res && res.data.success) {
          toast.success(res.data && res.data.message)
          navigate('/login')
        }else{
          toast.success(res.data.message)
          
        }
        
      } catch (error) {
        console.log("Error", error);
        toast.error('Something went wrong')
      }
  }

  return (
    <Layout title={"Register"}>
      <div className="form-container">
        <h1>Register Page</h1>
        <br />
       
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="mb-3">
            {/* <label htmlFor="exampleInputPhonr" className="form-label">Phone</label> */}
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Phone"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="What is your fav sports ?"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
