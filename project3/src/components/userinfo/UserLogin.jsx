import { useState, useRef } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "./services/auth.service";
const required = (value) => {
    if (!value) {
        <div role="alert">
        This field is required!
      </div>
    }
}

const UserLogin = (props) => {
    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      setMessage("");
      setLoading(true);
  
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.login(username, password).then(
            () => {
            props.history.push("/profile");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setLoading(false);
            setMessage(resMessage);
          }
        );
      } else {
        setLoading(false);
      }
    };


   
    return (
    <div>
      <div>

        <Form onSubmit={handleLogin} ref={form}>
          <div>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div>
            <button disabled={loading}>
              {loading && (
                <span>loading</span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div>
              <div role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};


  
  

export default UserLogin
