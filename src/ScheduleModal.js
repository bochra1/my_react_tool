import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ScheduleModal = ({ isOpen, onClose, onScheduleSubmit , Cancel}) => {
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleScheduleSubmit = () => {
    onScheduleSubmit(scheduledDate, scheduledTime);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="schedule-modal-title"
      aria-describedby="schedule-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        width: 300
      }}>
        <h5 id="schedule-modal-title">Schedule Execution</h5>
        <TextField
          label="Date"
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          label="Time"
          type="time"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleScheduleSubmit}
        >
          Schedule
        </Button>
        <Button
        variant="contained"
        color="primary"
        onClick={Cancel}
      >
        Cancel
      </Button>
      </Box>
    </Modal>
  );
};

export default ScheduleModal;
