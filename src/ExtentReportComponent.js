import { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ExtentReportComponent() {
  const [extentReport, setExtentReport] = useState(false);

  useEffect(() => {
    axios({
      url: 'https://localhost:7214/tests/GetExtentReport',
      method: 'GET',
      responseType: 'blob',
    })
      .then(response => {
        const fileUrl = URL.createObjectURL(response.data);
        setExtentReport(true);
        const iframe = document.createElement('iframe');
        iframe.src = fileUrl;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.bottom = '0';
        iframe.style.right = '0';
        document.body.appendChild(iframe);
      })
      .catch(error => {
        console.error('There was a problem with the Axios request:', error);
      });
  }, []);

  return (
    <div>
    <Link to ='/'>
    <button>Back</button></Link>
     {extentReport ? <p>Loading extent report...</p> : null}
     
    </div>
  );
}

export default ExtentReportComponent;
