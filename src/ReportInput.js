import { Grid, Dialog, DialogTitle, DialogContent, DialogActions,DialogContentText ,Slide  } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { saveAs } from 'file-saver';
import axios from 'axios';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ReportInput() {

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
  //useState
    const [layout,setLayout] = useState('')
    const [type,settype] = useState('')
    const [fund,setfund] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ruleid,setruleid] = useState('')
    const [rulegroupe,setrulegroupe] = useState('')
    const [workflow,setworkflow] = useState('')
    const [path,setpath] = useState('')
    const [SmonthName,setSmonth] = useState('')
    const [Syear,setSyear] = useState('')
    const [Sday,setSday] = useState('')
    const [EmonthName,setEmonth] = useState('')
    const [Eyear,setEyear] = useState('')
    const [Eday,setEday] = useState('')
    const [jsonData, setJsonData] = useState("");

//handlerFunction
    const onChangeHandlerLayout=(event)=>{
        setLayout(event.target.value);
        console.log(event.target.name,event.target.value);

    }
    const onChangeHandlerType=(event)=>{
      settype(event.target.value);
      console.log(event.target.name,event.target.value);

  }
  const onChangeHandlerFund=(event)=>{
    setfund(event.target.value);
    console.log(event.target.name,event.target.value);

}
const onChangeHandlerRuleId=(event)=>{
  setruleid(event.target.value);
  console.log(event.target.name,event.target.value);

}
const onChangeHandlerRuleGroup=(event)=>{
  setrulegroupe(event.target.value);
  console.log(event.target.name,event.target.value);

}
const onChangeHandlerWorkflow=(event)=>{
  setworkflow(event.target.value);
  console.log(event.target.name,event.target.value);

}
const handleChangeStartDate=(date)=>{
  setStartDate(date)
  const startdatestring =startDate ? startDate  .toString() : null;

  const SmonthName = monthNames[date.getMonth()].toString();

  console.log(startdatestring)

  const Syear = date.getFullYear().toString();
  const Sday = date.getDate().toString();
  setSmonth(SmonthName);
  setSyear(Syear);
  setSday(Sday);
  
  console.log(`Year: ${Syear.stringify}, Month: ${SmonthName }, Day: ${Sday}`);
}
  const handleChangeEndDate=(date)=>{
    setEndDate(date)
    const enddatestring =endDate ? endDate  .toString() : null;
    const EmonthName = monthNames[date.getMonth()].toString();
    console.log(enddatestring)
    const Eyear = date.getFullYear().toString();
    const Eday = date.getDate().toString();
    setEmonth(EmonthName);
    setEyear(Eyear);
    setEday(Eday);
    console.log(`Year: ${Eyear}, Month: ${EmonthName }, Day: ${Eday}`);

  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData=async()=>
  {
    const headers= {
      'Content-Type': 'application/json'
    }
    await axios.get("https://localhost:7214/tests/getUser",jsonData,{headers})  .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const fetchData=async (jsonData)=>{
    const headers= {
      'Content-Type': 'application/json'
    }
    console.log('inpu: ' ,jsonData)

    const res=await axios.post("https://localhost:7214/tests/UserInput",jsonData,{headers})  .then(function (response) {
      console.log("aziz",JSON.stringify(response['data']));
      const res= JSON.stringify(response['data'] ) ;

      setJsonData(res)
      
      
      
    })
    .catch(function (error) {
      console.log(error);
    });
    

  }

  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = { layout, fund, SmonthName,Syear,Sday,Eday,Eyear,EmonthName, ruleid, rulegroupe,workflow };
    const jsonData = JSON.stringify(formData);

    fetchData(jsonData);


    /*fetch('https://localhost:7214/tests/UserInput', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: jsonData
})
.then(response => console.log('resp'+response.json()))
.then(jsonData => {    setJsonData(jsonData);
  console.log('Send : '+jsonData);
})
.catch(error => {
  console.error('Error:', error);
});*/
handleClickOpen();
    // save jsonData to a file using your preferred method (e.g. fetch, axios, etc.)
   // const blob = new Blob([jsonData], { type: 'application/json' });
   // saveAs(blob, 'file.json');

  };

  return (

        <Card className="container">
          <Card.Header as="h5">R02_OptimaExceptionReport</Card.Header>
          <Card.Body>
            <Card.Text>
            <div className="offset-lg-1 col-lg-4" >
            <form className="container" onSubmit={handleFormSubmit}>

 <div className='form-group'>
 <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs="auto">
       <label htmlFor='layout' className='form-label'>Layout :</label>
    <select className='form-select' name='layout' onChange={onChangeHandlerLayout}>
    <option value ='Standard' > Standard</option>
    <option value ='Excel'> Excel</option>

    </select></Grid>
   {/* <Grid item xs="auto" >
    <label htmlFor='type' className='form-label'>Type :</label>
    <select className='form-select' name='type' onChange={onChangeHandlerType}>
    <option value ='ereportalreportdesignerpdf'> Pdf Viewer</option>
    <option value ='ereportalreportdesignerhtml'> Html Viewer</option>
    <option value ='ereportalreportdesignerpdf'> Formatted Text</option>
    </select></Grid>*/
    <Grid item xs="auto">
    <label htmlFor='fund' className='form-label'>Fund :</label>
    <select className='form-select' name='fund' onChange={onChangeHandlerFund}>
    <option value ='selectAll'> Select All</option>
    <option value ='361DLSE'> 361DLSE (361) </option>
    <option value =' ACCPBOND '> ACCPBOND (ACC) </option>
    <option value ='  FUNDA  '> FUNDA (FUNDA)  </option>
    <option value ='  FUNDB  '> FUNDB (FUNDB)  </option>
    <option value ='  FUNDC  '>  FUNDC (FUNDC)   </option>
    <option value ='  FUNDD  '>  FUNDD (FUNDD)   </option>

    </select></Grid>}
    <Grid item xs="auto">
  
    

    <label htmlFor='ruleId' className='form-label'>Start Date :</label>

  <DatePicker
       selected={startDate}
       selectsStart
       startDate={startDate}
       endDate={endDate}
       onChange={handleChangeStartDate
       }
     />
     <label htmlFor='ruleId' className='form-label'>End Date :</label>

     <DatePicker
       selected={endDate}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       minDate={startDate}
       onChange={handleChangeEndDate}
     /> 
     </Grid>

    <Grid item xs="auto">
    <label htmlFor='ruleId' className='form-label'>Rule ID:</label>
    <select className='form-select' name='ruleid' onChange={onChangeHandlerRuleId}>
    <option value ='1'> 1</option>
    <option value ='5'> 5 </option>
    <option value =' 6'> 6 </option>
    <option value ='14.5'> 14.5  </option>
   

    </select></Grid>
    <Grid item xs="auto">
    <label htmlFor='ruleGroup' className='form-label'>Rule Group:</label>
    <select className='form-select' name='rulegroup' onChange={onChangeHandlerRuleGroup}>
    <option value ='selectAll'> Select All</option>
    <option value ='Amortization'> Amortization </option>
    <option value =' Shareholder Activity'>  Shareholder Activity </option>
   

    </select></Grid>
    <Grid item xs="auto">
    <label htmlFor='fund' className='form-label'>Workflow Group:</label>
    <select className='form-select' name='workflow' onChange={onChangeHandlerWorkflow}>
    <option value ='selectAlldropdown-17'> Select All</option>
    <option value ='selectItemdropdown-17'> Not Required </option>
    <option value =' 1 '>  Signed-Off x1 </option>

    </select></Grid>
    </Grid></Box>
   
    </div>
    <Button variant="primary" type='submit' onSubmit={handleFormSubmit} >Submit</Button>
    <Button variant="primary" type='submit' onSubmit={handleFormSubmit} >Run</Button>


</form>
<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{color:'green'}}>{"Script Create Successfully!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <div>
          {jsonData ? (
            <ul>
              {jsonData.replace(/,/g, "\n")}
            </ul>
          ) : (
            <p>Loading data...</p>
          )}
    </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </div>
            </Card.Text>
          </Card.Body>
        </Card>
      
    
    
    
  )
}
