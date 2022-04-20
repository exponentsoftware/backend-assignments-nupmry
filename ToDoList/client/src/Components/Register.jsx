import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useState, useContext } from "react";
import FormLabel from "react-bootstrap/esm/FormLabel";
// import { alpha, styled } from "@mui/material/styles";
// import { pink } from "@mui/material/colors";
// import Switch from "@mui/material/Switch";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Register = () => {
    // const [value, setValue] = React.useState("1");

    const navigate = useNavigate();

    // const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);

    // const GreenSwitch = styled(Switch)(({ theme }) => ({
    //     "& .MuiSwitch-switchBase.Mui-checked": {
    //         color: pink[600],
    //         "&:hover": {
    //             backgroundColor: alpha(
    //                 pink[600],
    //                 theme.palette.action.hoverOpacity
    //             ),
    //         },
    //     },
    //     "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    //         backgroundColor: pink[600],
    //     },
    // }));

    // const label = { inputProps: { "aria-label": "Switch demo" } };

    const register = async (e) => {
        e.preventDefault();
        setError("");

        const genericErrorMessage =
            "Something went wrong! Please try again later.";

        await fetch("http://localhost:3000/user/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username: userName,
                phone,
                password,
            }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!");
                    } else if (response.status === 401) {
                        setError("Invalid email and password combination.");
                    } else if (response.status === 500) {
                        console.log(response);
                        const data = await response.json();
                        if (data.message)
                            setError(data.message || genericErrorMessage);
                    } else {
                        setError(genericErrorMessage);
                    }
                } else {
                    const data = await response.json();
                    setUserContext((oldValues) => {
                        return { ...oldValues, token: data.token };
                    });
                    console.log(userContext.token);
                }
            })
            .catch((error) => {
                setError(genericErrorMessage);
            });
    };

    // const register = async () => {
    //     await axios({
    //         method: "post",
    //         data: {
    //             user_name: userName,
    //             email: email,
    //             phone: phone,
    //             password: password,
    //         },
    //         url: "http://localhost:3000/user/register",
    //     })
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err));

    //     navigate("/home");
    // };

    return (
        <Box>
            <FormControl isRequired>
                <VStack alignItems="flex-start" mb={5} ml={3}>
                    <FormLabel htmlFor="user-name">User Email</FormLabel>
                </VStack>
                <VStack alignItems="center">
                    <Input
                        id="user-name"
                        placeholder="User Email"
                        h="20px"
                        mb={5}
                        ml={3}
                        w="90%"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </VStack>
            </FormControl>
            {/* <FormControl isRequired>
                <VStack alignItems="flex-start" mb={5} ml={3}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                </VStack>
                <VStack alignItems="center">
                    <Input
                        id="email"
                        placeholder="Email"
                        h="20px"
                        mb={5}
                        ml={3}
                        w="90%"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </VStack>
            </FormControl> */}
            <FormControl isRequired>
                <VStack alignItems="flex-start" mb={5} ml={3}>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                </VStack>
                <VStack alignItems="center">
                    <Input
                        id="phone"
                        placeholder="Phone"
                        h="20px"
                        mb={5}
                        ml={3}
                        w="90%"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </VStack>
            </FormControl>
            <FormControl isRequired>
                <VStack alignItems="flex-start" mb={5} ml={3}>
                    <FormLabel htmlFor="">Password</FormLabel>
                </VStack>
                <VStack alignItems="center">
                    <Input
                        id="password"
                        placeholder="Password"
                        h="20px"
                        mb={5}
                        ml={3}
                        w="90%"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </VStack>
            </FormControl>
            <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="outline"
                onClick={register}
            >
                Register
            </Button>
            <p style={{ color: "red" }}>{error}</p>
        </Box>
    );
};

export default Register;
