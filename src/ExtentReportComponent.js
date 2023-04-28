import { useState, useEffect } from 'react';

function ExtentReportComponent() {
  const [reportPath, setReportPath] = useState('');

  useEffect(() => {
    async function fetchReportPath() {
      try {
        const response = await fetch('https://localhost:7214/tests/GetExtentReport');
        const path = await response.text();
        setReportPath(path);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReportPath();
  }, []);

  return (
    <div>
      {reportPath && (
        <iframe
          src={reportPath}
          title="Test report"
          style={{ width: '100%', height: '100vh', border: 'none' }}
        />
      )}
    </div> 
  );
}
export default ExtentReportComponent;