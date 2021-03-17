import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import { Tab, Tabs } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {MyBooks} from "../tabs/myProfile_Tabs/MyBooks";
import {MyRentedBooks} from "../tabs/myProfile_Tabs/MyRentedBooks";

export function MyProfile() {
  const [value, setValue] = useState(0);
  const handleChange = (e, value)=>{
    setValue(value)
  }
  return (
    <>
    <h2>MyProfile Component</h2>
    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    <Tab label="My Books"  />
    <Tab label="My Rented Books"  />
  
  </Tabs>

<TabPanel value={value} index={0}>
  <MyBooks/>
</TabPanel>
<TabPanel value={value} index={1}>
  <MyRentedBooks/>
</TabPanel>
    </>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
        {children}
        </Box>
        // <Box p={2}>
        //   <Typography>{children}</Typography>
        // </Box>
      )}
    </div>
  );
}