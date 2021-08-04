import React from "react";
import AuthService from "./services/auth.service";

const UserProfile = () => {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser)
    return (
    <div>
        <h3>{currentUser.username} Profile</h3>
      <p>Token:{currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>Id:{currentUser.id}</p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
     
    </div>
  );
};
      
export default UserProfile
