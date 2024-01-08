import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";

import { gapi } from "gapi-script";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const clientID =
  "421862071614-sormam3m634j5ea3osg16t2rlcsvp11k.apps.googleusercontent.com";

const GoogleLoginButton = () => {
  const nagivate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const URL = `${BASE_URL}/api/register/`;
  const [profile, setProfile] = useState({});
  const { userLogin, errMessage } = useContext(AuthContext);

  const [message, setMessage] = useState();

  const handleLogin = (profile) => {
    userLogin(profile.name, profile.googleId);
  };

  const handleSignUp = async (profile) => {
    const formData = {
      username: profile.name,
      email: profile.email,
      password: profile.googleId,
      photo: profile.imageUrl,
      bio: "",
    };

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 200) {
      nagivate("/login", { state: { message: "Successfully registered!" } });
    } else {
      setMessage(data.detail);
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const responseGoogle = async (response) => {
    setProfile(response.profileObj);
    const loginSuccess = await handleLogin(response.profileObj);
    if (!loginSuccess) {
      await handleSignUp(response.profileObj);
      await handleLogin(response.profileObj);
    }
  };

  return (
    <GoogleLogin
      clientId={clientID}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
