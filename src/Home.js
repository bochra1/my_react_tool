import React, { useState,useEffect,useRef  } from "react";
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
import {  BsTrash  } from 'react-icons/bs';
import Checkbox from '@mui/material/Checkbox';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ScheduleModal from "./ScheduleModal";
import { Cancel } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRunButtonDisabled, setIsRunButtonDisabled] = useState(false);
  const [filteredTestFiles, setFilteredTestFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExecutionCancelled, setisExecutionCancelled] = useState(false);
  const [fileName, setfileName] = useState('');
  const [activeuser, setactiveuser] = useState('');
  const [isaccepted, setisaccepted] = useState('');

  

 
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    if (searchTerm.trim() === '') {
      setFilteredTestFiles(testFiles);
    } else {
      const filteredFiles = testFiles.filter((file) =>
        file.Scripts.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTestFiles(filteredFiles);
    }
  };
  
  const handleAccept = () => {
    setisaccepted('yes');
    console.log(isaccepted);
    SaveExecution("yes");
    handleCloseDialogResult();
  };
  const handleRefuse = () => {
    setisaccepted('no');
    console.log(isaccepted);
    SaveExecution("no");
    handleCloseDialogResult();

  };
  const handleCloseDialogResult = () => {
    setOpenresult(false);

  };
  const handleRowSelection = (params) => {
    const selectedRow = `C:/Users/BLabbenne/source/repos/inputs/${params.row.Scripts}`;
    
    setSelectedRows((prevSelectedRows) => [...prevSelectedRows, selectedRow]);
  };
//lmk
 
  
  const handleFileUpload = (file) => {
    if(file)
{
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('https://localhost:7214/tests/getExpectedFile', formData)
        .then((response) => {
          console.log('File uploaded successfully');
          // Handle the response from the server
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Handle the error
        });
    }}
  const handleScheduleExecution = () => {
    // Function to open the modal
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // Function to close the modal
    setIsModalOpen(false);
  };
let timeoutId;
  const handleScheduleSubmit = (scheduledDate, scheduledTime) => {
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const currentDateTime = new Date();
      const timeDifference = scheduledDateTime.getTime() - currentDateTime.getTime();
  
    if (timeDifference <= 0) {
      console.log("Invalid scheduled date and time. Please choose a future date and time.");
      return;
    }
    timeoutId = setTimeout(() => {
      if(!isExecutionCancelled)
    {  handleRunAllTests();}
    }, timeDifference);
    setIsRunButtonDisabled(true);
  };
  const handleCancel = () => {
    setisExecutionCancelled(true);
    setIsRunButtonDisabled(false);
    clearTimeout(timeoutId);
    toast.warning(`Exécution annulée`);
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
      Report_File_path: '//BS1RPT05/ReportOutput',
      Result_File_path: 'C:/Users/BLabbenne/Downloads',
    }));
    setTestFiles(testFilesData);
    setFilteredTestFiles(testFilesData); 
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

const SaveExecution = async (isaccepted )=>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const jwttoken = sessionStorage.getItem('jwttoken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwttoken}`;
  const requestBody = {
    username: sessionStorage.getItem('username'),
    reportname: fileName.fileName,
    Expected: isaccepted,
  };

axios.post('https://localhost:7214/api/Report/addReport', requestBody, config).then(response => 
{      console.log(' Execution added :', response.data);
}).catch(error =>{   
     console.error('Request error:', error);
})
}

const handleRunAllTests = async () => {
  setIsLoading(true);
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const jwttoken = sessionStorage.getItem('jwttoken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwttoken}`;

  const requestBody = selectedRows; 
 // console.log(requestBody)
  axios
    .post('https://localhost:7214/tests/runAllScripts', requestBody, config)
    .then(response => {
      setresultContent(response.data);
      setOpenresult(true);
      console.log('Server response:', response.data);
      setdisplayresult(true);
      setIsLoading(false);
      setIsRunButtonDisabled(false);
    })
    .catch(error => {      setIsLoading(false);
     toast.error('An error occurred during the request. Please try again.');
      console.error('Request error:', error);
    }  
    );
};

  const handleRunTests = async (filePath) => {
    setIsLoading(true);

    axios.post('https://localhost:7214/tests/runScript', null, {
      params: {
        param: filePath
      }
    })
      .then(response => {
        console.log(activeuser,filePath, fileName);
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
  const fileInputRef = useRef(null);

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
     //   console.log(fileName);

      // Set a value in local storage
        const handleButtonClick = () => {
          const filePath = `C:/Users/BLabbenne/source/repos/inputs/${fileName}`;
          handleRunTests(`${filePath}`);
          setfileName({fileName});
          //SaveExecution(fileName,activeuser);

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
      field: 'SetExpectedFile',
      headerName: '',
      width: 150,
      
      renderCell: (params) => {

        const fileName = params.row.Scripts;
        const filePath = `C:/Users/BLabbenne/source/repos/inputs/${fileName}.json`;
        setfilepath(filePath);
        const handleselectClick =async () => {
         
            fileInputRef.current.click();
          
       
        };
        const handleFileInputChange = (event) => {
          const file = event.target.files[0];
          setSelectedFile(file);
          handleFileUpload(file);
        };
        return (
          
          <div>
          <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          onChange={(event) => handleFileInputChange(event)} // Pass params.row.Scripts as an argument
          ref={fileInputRef}

        />
        <Button
            variant="outlined"
            color="primary"
            onClick={handleselectClick}
            style={{ marginLeft: "10px" }}
          >
            Select File
          </Button></div>
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
        <div className="col-md-6 mb-3"  >
          <input type="text" className="form-control" placeholder="Search" value={searchTerm} onChange={handleSearch}  />
        </div>
        <Button   variant="contained"
        color="primary" onClick={OpenLDR} style={{ marginLeft: "40px" }}  >create Script</Button>
      
      
{displayresult &&
          <Link to ='/ExtentReportComponent'>
          <Button style={{ marginLeft: "40px" }} 
            variant="outlined"
            color="primary"
            //onClick={OpenExtentReport}
          >
            View Log
          </Button></Link>}
       

        </div>
        <DataGrid
         rows={filteredTestFiles}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      // checkboxSelection
      
      />
      <Button   variant="contained"
      color="primary" onClick={handleRunAllTests} 
      disabled={isRunButtonDisabled}
      style={{ marginRight: '10px' }}>
      Run </Button>
      <Button
      variant="outlined"
      color="primary"
      onClick={handleScheduleExecution}
      startIcon={<ScheduleIcon />}>
      Schedule Execution
    </Button>
      
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
        { <ScheduleModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onScheduleSubmit={handleScheduleSubmit}
          Cancel={handleCancel}
        />}
        {openresult && <div><Dialog open={openresult} onClose={handleCloseDialogResult} maxWidth="md">
        <DialogTitle>File Content</DialogTitle>
        <DialogContent>
          <pre>{resultContent}</pre>
         {/* <TextField
          label="Comment"
          multiline
          rows={4}
          variant="outlined"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogResult} color="primary">
            Close
          </Button>
          <Button onClick={handleAccept}  color="success" startIcon={<CheckCircleIcon />}>
          Accept
        </Button>
        <Button onClick={handleRefuse}  color="error" startIcon={<ThumbDownIcon  />}>
        Refuse
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
