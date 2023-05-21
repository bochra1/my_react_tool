import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import Loading from "./Loading";

export default function Home() {
  const [result, setResult] = useState("");
  const [testresult, settestResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [testFiles, setTestFiles] = useState([]);
  const [filepath, setfilepath] = useState("C:\Users\bochra\OneDrive\Bureau\tests");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);

  };

  const handleScheduleClick = () => {
    const scheduledTime = new Date(selectedDateTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = scheduledTime - currentTime;

    if (timeDifference < 0) {
      alert("Please select a future date and time.");
      return;
    }

    setTimeout(() => {
      alert("Function executed at " + new Date(scheduledTime).toLocaleString());
      setIsScheduled(false);
    }, timeDifference);

    setIsScheduled(true);
  };
useEffect(()=>{
  fetchTestFiles();



},[])
const  fetchTestFiles = async () =>{
  try {
    const response = await axios.get('http://localhost:3002/tests');
    const testFilesData = response.data.map((file, index) => ({

      id: index + 1,
      Scripts: extractFileName(file),
      Report_File_path: 'C:/Users/BLabbenne/source/repos',
      Result_File_path: 'C:/Users/BLabbenne/source/repos',
    }));
    setTestFiles(testFilesData);
  } catch (error) {
    console.error('Error fetching test files:', error);
  }
};
const extractFileName = (file) => {
  
  const dotIndex = file.lastIndexOf('.');
  const extractedName = dotIndex !== -1 ? file.substring(0, dotIndex) : file;
  return extractedName;
};


  const handleOpenHtmlFile = async () => {
    try {
      const fileName = 'Program.html';
      const response = await axios.get(`https://localhost:7214/api/OpenHtmlFile`);
      console.log(response.data); // success message from the API
    } catch (error) {
      console.log(error.response.data); // error message from the API
    }
  };
  const handleRunTests = async () => {
    setIsLoading(true);

    const headers= {
      'Content-Type': 'application/json'
    }
  await  axios
      .get("https://localhost:7214/tests/run",{headers})
      .then( (response)=>  setResult(response.data),
      console.log("setasfalse?")

      )
      .catch(function(error){  console.log(error)});
      setIsLoading(false)
      handleTestResult();

  };

  const handleTestResult = async () => { await
    axios
      .get("https://localhost:7214/tests/testresult")
      .then((response) =>
      settestResult(response.data))
      .catch((error) => console.error(error),  
      );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Scripts", headerName: "Scripts", width: 300 },
    { field: "Report_File_path", headerName: "Report File Path", width: 300 },
    {
      field: "Result_File_path",
      headerName: "Result File Path",
      type: "string",
      width: 300,
    },
   {/* {
      field: "Description",
      headerName: "Description",
      sortable: false,
      width: 300,
    },*/},
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell: (params) => {
        const fileName = params.row.Scripts;
        const handleButtonClick = () => {
          const scheduledTime = new Date(selectedDateTime).getTime();
          const currentTime = new Date().getTime();
          const timeDifference = scheduledTime - currentTime;
          const filePath = `C:/Users/bochra/OneDrive/Bureau/tests/${fileName}`;

          if (timeDifference < 0) {
            alert("Please select a future date and time.");
            return;
          }
      
          setTimeout(() => {
            alert("Function executed at " + new Date(scheduledTime).toLocaleString());
            console.log(`Path of file '${fileName}': ${filePath}`);
            setIsScheduled(false);
          }, timeDifference);
      
          setIsScheduled(true);
          // You can perform further actions with the file path herecd server
        };
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px" }}>
                <input type="datetime-local" value={selectedDateTime} onChange={handleDateTimeChange} />
              </label>
          <Button variant="outlined" color="primary" onClick={handleButtonClick}>
              {isScheduled ? "Scheduled" : "Run"}
          </Button></div>
        );
      },
    },

  ];

  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ height: 400, width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "10px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRunTests}
            style={{ marginRight: "10px" }}
          >
            Run
          </Button>     

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenHtmlFile}
          >
            View Result
          </Button>
        </div>
        <DataGrid
        rows={testFiles}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
        {isLoading && <Loading/>}
       {testresult&&  <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <pre>{testresult.output}</pre>
        </Box>}
      </div>
    </div>
  );
}





















{/*
        renderCell: (params) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "10px" }}>
                <input type="datetime-local" value={selectedDateTime} onChange={handleDateTimeChange} />
              </label>
              <Button disabled={isScheduled} onClick={handleScheduleClick} variant="contained" color="primary">
                {isScheduled ? "Scheduled" : "Schedule Execution"}
              </Button>
            </div>
          ),  */}