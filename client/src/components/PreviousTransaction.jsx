import { Box, Button, Card, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const PreviousTransaction = () => {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    function handler(){
      navigate('/');
    }
  return (
    <Box width='80%' mx='auto' mt='1rem'>
        <TableContainer>
        <Table>
          <TableCaption>
            User Previous Transaction</TableCaption>
          <Thead>
            <Tr>
              <Th>Application No.</Th>
              <Th>Payment ID</Th>
              <Th>Order ID</Th>
              <Th>Amount</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item,i) => <Tr key={i}>
              <Td>{data[i].application_no}</Td>
              <Td>{data[i].transaction_id}</Td>
              <Td> {data[i].order_id}</Td>
              <Td> {data[i].amount}</Td>
              <Td> {new Date(data[i].storedTime*1000).toLocaleString()}</Td>
            </Tr>)}
            </Tbody>
        </Table>
      </TableContainer>
      <Button position='fixed' bottom='20px' right='20px' colorScheme='blue' gap='5' onClick={handler} alignSelf='right'>Log Out</Button>
    </Box>
  )
}

export default PreviousTransaction