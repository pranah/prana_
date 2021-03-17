import React from 'react'
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux'

export function MyBooks() {
  const pranaContract = useSelector(state => state.web3.pranaContract)
  React.useEffect(() => {
    if(pranaContract){
      console.log(pranaContract)
    }
  }, [pranaContract]);
  return (
    <>
    <h2>My books Component</h2>
    </>
  )
}