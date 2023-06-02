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
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash,BsPlusCircle  } from 'react-icons/bs';
import Checkbox from '@mui/material/Checkbox';

export default function Home() {
  const [result, setResult] = useState("");
  const [testresult, settestResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [testFiles, setTestFiles] = useState([]);
  const [filepath, setfilepath] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [isok, setresponse] = useState("");
  const [displayresult, setdisplayresult] = useState(false);
  const [openresult, setOpenresult] = useState(false);
  const [resultContent, setresultContent] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  const handleRowSelection = (params) => {
    const selectedRow = `C:/Users/BLabbenne/source/repos/inputs/${params.row.Scripts}`;
    
    setSelectedRows((prevSelectedRows) => [...prevSelectedRows, selectedRow]);
  };
  /*useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);*/
    
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

const deleteFile = (fileName) => {
  axios.delete(`http://localhost:3002/api/delete/${fileName}`)
    .then(response => {
      if (response.status === 200) {
        console.log('File deleted');
        // Add logic here to update the file list in your interface
      } else {
        console.error('Error deleting file');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const handleCloseDialog = () => {
  setOpen(false);
};
const handleCloseDialogResult = () => {
  setOpenresult(false);
};

const handleRunAllTests = async () => {
  setIsLoading(true);
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const requestBody = selectedRows; // Assuming `selectedRows` is already an array of strings
  axios
    .post('https://localhost:7214/tests/runAllScripts', requestBody, config)
    .then(response => {
      setresultContent(response.data);
      setOpenresult(true);
      console.log('Server response:', response.data);
      setdisplayresult(true);
      setIsLoading(false);
    })
    .catch(error => {      setIsLoading(false);
     toast.error('An error occurred during the request. Please try again.');
      console.error('Request error:', error);
    });
};

  const handleRunTests = async (filePath) => {
    setIsLoading(true);

    axios.post('https://localhost:7214/tests/runScript', null, {
      params: {
        param: filePath
      }
    })
      .then(response => {
        // Handle the response from the server
       setresultContent(response.data);
       setOpenresult(true);
        console.log('Server response:', response.data);
        const outputResult = response.data;
        setdisplayresult(true);
        setIsLoading(false);


      })
      .catch(error => {
        console.error('Request error:', error);

        toast.error('An error occurred during the request. Please try again.');
        setIsLoading(false);

      });  


  };
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
  
  const columns = [
    {
      field: 'check',
      headerName: '',
      width: 70,
      renderCell: (params) => {
        const fileName = params.row.Scripts;
        const filePath = `C:/Users/BLabbenne/source/repos/inputs/${fileName}`;
      
        return (
          <Checkbox
            onChange={() => handleRowSelection(params)}
          />
        );
      }},
    { field: "id", headerName: "ID", width: 70 },
    { field: "Scripts", headerName: "Scripts", width: 350 },
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
          const filePath = `C:/Users/BLabbenne/source/repos/inputs/${fileName}`;
          //console.log(`Path of file '${fileName}': ${filePath}`);
          handleRunTests(`${filePath}`);
       

          };
        return (      
          <Button variant="outlined" color="primary" onClick={handleButtonClick}>
            Run  </Button>
           
        );
      },
    },
    {
      field: 'Description',
      headerName: '',
      width: 150,
      renderCell: (params) => {
        const fileName = params.row.Scripts;
        const filePath = `C:/Users/BLabbenne/source/repos/inputs/${fileName}.json`;
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
    },
    {
      field: 'delete',
      headerName: '',
      width: 150,
      renderCell: (params) => {
        const fileName = params.row.Scripts;
        const handleDeleteClick = () => {
          //console.log(`Path of file '${fileName}': ${filePath}`);
          deleteFile(`${fileName}`)       

          };
        return (      
          <button className="btn btn-link" title="Delete" onClick={handleDeleteClick}>
          <BsTrash />
        </button>
           
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
       
        <Button   variant="contained"
        color="primary" onClick={OpenLDR}>create Script</Button>
{displayresult &&
          <Link to ='/ExtentReportComponent'>
          <Button
            variant="contained"
            color="primary"
            //onClick={OpenExtentReport}
          >
            View Result
          </Button></Link>}
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
      // checkboxSelection
      
      />
      <Button   variant="contained"
      color="primary" onClick={handleRunAllTests}>Run </Button>
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
        {openresult && <div><Dialog open={openresult} onClose={handleCloseDialogResult} maxWidth="md">
        <DialogTitle>File Content</DialogTitle>
        <DialogContent>
          <pre>{resultContent}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogResult} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog></div> }
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
