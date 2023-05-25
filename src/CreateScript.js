import React,{ useEffect, useState ,useRef} from 'react'
import ReportInput from './ReportInput'
import Register from './Register'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useLocation, useNavigate } from "react-router-dom";
function CreateScript() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cook, setcook] = useState('');
  const [isHomePageLoaded, setIsHomePageLoaded] = useState(false);
  const [externalWindow, setExternalWindow] = useState(null);
  const [isok, setresponse] = useState("");

  const apiUrl = process.env.LDR_APP_URL;
  const iframeRef = useRef(null);
  const srcifr = 'http://localhost:3001/eexternal-website';
  const cookieValue = Cookies.get('ASP.NET_SessionId');

  const OpenLDR = async () => {
    axios({
      url: 'https://localhost:7214/tests/createScript',
      method: 'GET',
    
    })
      .then(response => {
       
        setresponse(JSON.stringify (response.data));
      console.log(response.data)})

      .catch(error => {
        console.error('There was a problem with the Axios request:', error);
      });
  };
 
 
  return (
    
    <div>
    {/*<ReportInput/>*/}
     <iframe
      id="external-website-iframe"
      src={srcifr}
      seamless 
        ref={iframeRef}
        width="100%"
        height="500"
        title="Example website"
        sandbox="  allow-scripts allow-same-origin allow-forms  allow-top-navigation-by-user-activation "
        allow="fullscreen  "
       // onLoad={handleLogin}
             ></iframe>
  {isok ? (
            <p>Test Created succ</p>
          ) : (
            <p>Loading data...</p>
          )}
  <button on onClick={OpenLDR}>Login</button>
    </div>
  );
}


export default CreateScript
