import React, { useState, useEffect } from "react";
import { Redirect, useParams, useLocation } from "react-router-dom";


export default function UserInfo() {
  let { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
  <>
    {location && !location.loginSuccess ? (
      <Redirect to={{ pathname: "/login"}}/>
    ) : (
    <div className="background">
      <img src={userInfo.avatar} className="bigAvatar" alt={userInfo.first_name}/>
      <div className="userName">
        {userInfo.first_name} {userInfo.last_name}
      </div>
      <div className="userEmail">{userInfo.email}</div>
    </div>)}
    </>
  );
}
