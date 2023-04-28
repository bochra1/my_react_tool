import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import Loading from "./Loading";

export default function Home() {
  const [result, setResult] = useState("");
  const [testresult, settestResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
console.log("setastrue?")
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
    {
      field: "Description",
      headerName: "Description",
      sortable: false,
      width: 300,
    },
  ];

  const rows = [
    {
      id: 1,
      Scripts: "R02OptimaExceptionrReport",
      Report_File_path: "C:/Users/BLabbenne/source/repos",
      Result_File_path: "C:/Users/BLabbenne/source/repos",
    },
    {
      id: 2,
      Scripts: "R02OptimaExceptionrReport2",
      Report_File_path: "C:/Users/BLabbenne/source/repos",
      Result_File_path: "C:/Users/BLabbenne/source/repos",
      Description: "jdgkjg",
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ height: 400, width: "50%" }}>
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
          rows={rows}
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
