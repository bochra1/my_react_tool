import React,{ useEffect, useState ,useRef} from 'react'
import ReportInput from './ReportInput'
import Register from './Register'
import axios from 'axios';
import Cookies from 'js-cookie';

function CreateScript() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cook, setcook] = useState('');

  const apiUrl = process.env.LDR_APP_URL;
  const iframeRef = useRef(null);
  const srcifr = 'https://bs1rpt05.ad.linedata.com/UMBReportingAdminPortal/Account/LogOn';
  const cookieValue = Cookies.get('ASP.NET_SessionId');
  const handleLogin = () => {
    setcook(cookieValue);

    console.log(cook);
    // Access the input elements in the iframe document using their id attribute
    /*if(iframeRef){
    const usernameInput = iframeRef.current.contentDocument.getElementById('UserName');
    const passwordInput = iframeRef.current.contentDocument.getElementById('Password');

    // Get the values of the input elements
    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;

    // Do something with the input values
    console.log('Username:', usernameValue);
    console.log('Password:', passwordValue);
  }else {console.log("no iframe")}*/};

  return (
    <div>
      <iframe
        src={srcifr}
        ref={iframeRef}
        width="100%"
        height="500"
        title="Example website"
        sandbox="allow-scripts allow-same-origin allow-forms  allow-top-navigation-by-user-activation"
        allow="fullscreen encrypted-media *"
        csp
      ></iframe>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default CreateScript
