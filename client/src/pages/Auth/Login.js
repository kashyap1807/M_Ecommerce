import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate , useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import "../../styles/AuthStyles.css";

const Login = () => {
   // name is for GET and setName is fro SET
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[auth,setAuth] = useAuth()
 

  const navigate = useNavigate();
  const location = useLocation();

  //FORM functin
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {  email, password }
      ); 

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state || '/');
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login"}>
      <div className="form-container" >
        <h1>Login Page</h1>
        <br />

        <form onSubmit={handleSubmit}>
         

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

            <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}} >
              Forgot Password
            </button>

          </div>
          

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
