import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'
import dp from "../assets/dp.png"
import { Box, Card, Heading, Text, VStack } from '@chakra-ui/react';
const Test = () => {
    const searchQuery = useSearchParams()[0];
    const  applicationNo  = searchQuery.get("applicationNo");
    const [data, setData] = useState({});
    const [userDetails, setUserDetails] = useState({
      applicationNo: "",
      name: "",
      dob: "",
      fatherName: "",
      course: "",
      courseSession: "",
      courseYear: "",
      amount: 0,
      instituteName: ""
    });
    useEffect(() => {
      const fetchDetails = async () => {
      await axios
        .post("http://localhost:4000/api/details", {
          applicationNo
        }).then((res)=> {
          console.log(res.data.userData);
          setData(res.data.userData);
          userDetails.applicationNo = res.data.userData.form.applicationNo;
          userDetails.name = res.data.userData.form.name;
          userDetails.dob = res.data.userData.form.dob;
          userDetails.fatherName = res.data.userData.form.fatherName;
          userDetails.course = res.data.userData.form.course;
          userDetails.courseSession = res.data.userData.form.courseSession;
          userDetails.courseYear = res.data.userData.form.courseYear;
          userDetails.amount = res.data.userData.form.amount;
          userDetails.instituteName = res.data.userData.instituteName;
        })
        console.log(userDetails);
    }
      fetchDetails();
      },[applicationNo,userDetails]);
      const amount = userDetails.amount;
    const checkoutHandler = async () => {

        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

        const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
           amount,applicationNo
        })
        console.log(order)
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Sachin Gupta",
            description: "Test Payment",
            image: dp,
            order_id: order.id,
            callback_url: `http://localhost:4000/api/paymentverification?applicationNo=${applicationNo}&amount=${amount}`,
            prefill: {
                name: "Sachin Gupta",
                email: "prem34aligarh@gmail.com",
                contact: "8865012381"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        console.log(options)
        const razor = new window.Razorpay(options);
        razor.open();
    }
  return (
    <Box>
        <Card>
        <VStack h="100vh" justifyContent={"center"}>
          <Heading>{userDetails.instituteName}</Heading>
        <Text>Application No: {userDetails.applicationNo}</Text>
        <Text>Name: {userDetails.name}</Text>
        <Text>Dob: {userDetails.dob}</Text>
        <Text>Father Name: {userDetails.fatherName}</Text>
        <Text>Course: {userDetails.course}</Text>
        <Text>Course Session: {userDetails.courseSession}</Text>
        <Text>Course Year: {userDetails.courseYear}</Text>
        <Text>Amount: {userDetails.amount}</Text>
          <button type="button" onClick={checkoutHandler}>
            Pay Now
          </button>
          </VStack>
        </Card>
    </Box>
    
  )
}

export default Test