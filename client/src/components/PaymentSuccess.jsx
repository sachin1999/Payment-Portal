import { Box, Heading, VStack, Text, Button, Flex, Card} from '@chakra-ui/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Web3 from "web3";
import ABI from "./ABI.json"
import { useEffect, useState } from 'react';
const PaymentSuccess = () => {
  const navigate =  useNavigate();
  const [state,setState]=useState({web3:null,contract:null,account:null});
  const [data,setData] = useState({ application_no : null, transaction_id: '', order_id: '', amount: '', storedTime: ''});
  const searchQuery = useSearchParams()[0];
  const order_id = searchQuery.get("order_id");
  const transaction_id = searchQuery.get("transaction_id");
  const application_no = searchQuery.get("applicationNo");
  const amount = searchQuery.get("amount");
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const writeData = async() => {
    try{
      const {contract,account} = state;
      console.log("contract", contract);
      await contract.methods.createTransaction(application_no,transaction_id,order_id,amount).send({ from: account})
      .on('transactionHash', (hash) => {
        setTransactionStatus('Transaction sent, waiting for confirmation...');
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        if (confirmationNumber === 1) {
          setTransactionStatus('Transaction write on blockchain is confirmed');
        }
      })
      .on('error', (error) => {
        setTransactionStatus('Transaction failed.');
      });
  }
  catch(error){
    console.error(error);
  }
}
 
useEffect(()=>{
    async function connectWallet(){
      try{
        if(window.ethereum){
          const web3 = new Web3(window.ethereum);
          const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        })    
        const contractAddress = "0xb631c70ed596043237a331793a0d93814a15f522";
        const contract = new web3.eth.Contract(ABI,contractAddress);
        setState({web3:web3,contract:contract,account:accounts[0]});
      }
      }
      catch(error){
        console.error(error);
      }
    }
    connectWallet();
    if(state.web3 && state.contract && state.account){
      writeData();
    }
  },[state.account])

  const readData = async() => {
    setLoading(true);
      const { contract } = state;
      const value = await contract.methods.getTransaction(application_no).call();
      setData(value);
      if(data.application_no!==null){
        alert('Data fetched successfully!');
      } 
      setLoading(false);
      {data.application_no===null ? <div>Loading</div> : navigate('/previoustransaction', {state: data});}
    };
  return (
    <Box bg='white'>
      <VStack h="100vh" justifyContent={"center"}>
        <Heading padding='1em' textTransform={"uppercase"}>Order Successful</Heading>
        <Card padding='3em' bg='gray.100' borderRadius='3em' boxShadow='0 0.188em 1.550em rgb(156, 156, 156)'>
          <Flex gap='50' ><Text color='gray' fontSize='3xl' 
          as='b' gap='2' marginBottom='2'>Order Id :</Text>
            <Text fontSize='3xl'>{order_id}</Text></Flex>
            <Flex gap='50' marginTop='25'><Text color='gray' fontSize='3xl' 
            as='b' gap='2' marginBottom='2'>Transaction Id:</Text>
            <Text fontSize='3xl'>{transaction_id}</Text></Flex>
            <Flex gap='50' marginTop='25'><Text color='gray' fontSize='3xl' 
            as='b' gap='2' marginBottom='2'>Application No: </Text>
            <Text fontSize='3xl'>{application_no}</Text></Flex>
            <Flex gap='50' marginTop='25'><Text color='gray' fontSize='3xl' 
            as='b' gap='2' marginBottom='2'>Amount: </Text>
            <Text fontSize='3xl'>{amount}</Text></Flex>
        </Card>
        <Flex gap='50' marginTop='25'><Text color='gray' fontSize='3xl' 
        as='b' gap='2' marginBottom='2'>{transactionStatus && <p>{transactionStatus}</p>}</Text></Flex>
        <Button colorScheme ='blue' onClick={readData} disabled={loading}>{loading ? 'Fetching...' : 'Get data'}</Button>
      </VStack>
    </Box>
  )
}

export default PaymentSuccess