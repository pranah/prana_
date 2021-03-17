import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import { Tab, Tabs } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {BuyFromAuthor} from "../tabs/marketplace_Tabs/BuyFromAuthor";
import {BuyFromReader} from "../tabs/marketplace_Tabs/BuyFromReader";
import {RentFromReader} from "../tabs/marketplace_Tabs/RentFromReader";


export function Marketplace() {
  const [value, setValue] = useState(0);
  const handleChange = (e, value)=>{
    setValue(value)
  }
  return (
    <>
    <h2>Marketplace Component</h2>
    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    <Tab label="Buy From Author"  />
    <Tab label="Buy From Readers"  />
    <Tab label="Rent From Reader"  />
  
  </Tabs>

<TabPanel value={value} index={0}>
  <BuyFromAuthor/>
</TabPanel>
<TabPanel value={value} index={1}>
  <BuyFromReader/>
</TabPanel>
<TabPanel value={value} index={2}>
  <RentFromReader/>
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
        // <Box p={3}>
        //   <Typography>{children}</Typography>
        // </Box>
      )}
    </div>
  );
}