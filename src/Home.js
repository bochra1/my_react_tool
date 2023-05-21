import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import Loading from "./Loading";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
export default function Home() {
  const [result, setResult] = useState("");
  const [testresult, settestResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [testFiles, setTestFiles] = useState([]);
  const [filepath, setfilepath] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [fileContent, setFileContent] = useState('');



  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddFile = () => {
    if (selectedFile) {
      const newTestFiles = [
        ...testFiles,
        {
          id: testFiles.length + 1,
          Scripts: selectedFile.name,
          Report_File_path: 'C:/Users/BLabbenne/source/repos',
          Result_File_path: 'C:/Users/BLabbenne/source/repos',
        },
      ];
      setTestFiles(newTestFiles);
      setSelectedFile(null);
    }
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
const handleCloseDialog = () => {
  setOpen(false);
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
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        const fileName = params.row.Scripts;
        const handleButtonClick = () => {
          const filePath = `C:/Users/bochra/OneDrive/Bureau/tests/${fileName}`;
          console.log(`Path of file '${fileName}': ${filePath}`);
          // You can perform further actions with the file path herecd server
        };
        return (
          <Button variant="outlined" color="primary" onClick={handleButtonClick}>
Run          </Button>
        );
      },
    },
    {
      field: 'Description',
      headerName: '',
      width: 150,
      renderCell: (params) => {
        const fileName = params.row.Scripts;
        const filePath = `C:/Users/bochra/OneDrive/Bureau/tests/${fileName}.json`;
        setfilepath(filePath);
        const fetchFileContent =async () => {
          try {
            const response = await axios.get("http://localhost:3002/json-data", {
              params: {
                filePath: filePath,
              },
            });
            const jsonData = response.data;
            setFileContent(jsonData);
            setOpen(true);
            console.log(jsonData);
          } catch (error) {
            console.error("Error fetching JSON data:", error);
          }
          // You can perform further actions with the file path herecd server
        };
        return (
          <Button variant="outlined" color="primary" onClick={fetchFileContent}>
Description          </Button>
        );
      },
    }

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
         <input
  type="file"
  id="file-input"
  style={{ display: "none" }}
  onChange={handleFileInputChange}
/>
<IconButton color="primary" onClick={() => document.getElementById("file-input").click()}>
  <AddIcon />
</IconButton>
<Button
  variant="contained"
  color="primary"
  onClick={handleAddFile}
>
  Add File
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
        {open && <div><Dialog open={open} onClose={handleCloseDialog} maxWidth="md">
      <DialogTitle>File Content</DialogTitle>
      <DialogContent>
        <pre>{JSON.stringify(fileContent, null, 2)}</pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog></div>}
      </div>
    </div>
    
  );
}
