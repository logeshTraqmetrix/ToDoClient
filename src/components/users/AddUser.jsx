import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const url = import.meta.env.VITE_API_URL;

const AddUser = ({ dispatchEvent, ACTIONS }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('formData', formData);
      axios
         .post(`${url}/users`, formData)
         .then((res) => {
            console.log('response from adding user', res);
            dispatchEvent({ type: ACTIONS.ADDUSER, payload: { newData: [res.data] } });
         })
         .catch((err) => {
            console.log('error in adding user', err);
         });
      setFormData({
         name: '',
         email: '',
      });
   };

   return (
      <Box sx={{ mb: 3 }}>
         <Typography variant="h6" sx={{ mb: 2 }}>
            Add New User
         </Typography>
         <form onSubmit={handleSubmit}>
            <TextField
               label="Name"
               name="name"
               value={formData.name}
               onChange={handleChange}
               fullWidth
               required
               sx={{ mb: 2 }}
            />
            <TextField
               label="Email"
               name="email"
               value={formData.email}
               onChange={handleChange}
               fullWidth
               required
               sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
               Submit
            </Button>
         </form>
      </Box>
   );
};

export default AddUser;
