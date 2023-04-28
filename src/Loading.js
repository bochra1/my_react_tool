import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
 function Loading() {
  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.2)', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div> Processing<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box></div>
    </div>
  </div>
  )
}export default Loading;
