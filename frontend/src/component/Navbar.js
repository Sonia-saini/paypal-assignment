import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <Box gap={"20px"} p="10px" bg={"blue.600"}>
      <Link to="/">  <Button>Home</Button></Link>
<Link to="/admin">  <Button>Admin page</Button></Link>
      <Link to="/user">  <Button>User page</Button></Link>
      <Link to="/login">  <Button>Login</Button></Link>
    </Box>
  )
}

export default Navbar