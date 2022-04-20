import React, { useState, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, VStack } from "@chakra-ui/layout";
import { FormControl } from "@chakra-ui/form-control";
import FormLabel from "react-bootstrap/esm/FormLabel";
import { Input } from "@chakra-ui/input";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);

    // const navigate = useNavigate();

    // const login = async () => {
    //     await axios({
    //         method: "post",
    //         data: {
    //             email: email,
    //             password: password,
    //         },
    //         url: "http://localhost:3000/user/login",
    //     })
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err));

    //     navigate("/home");
    // };

    const login = async (e) => {
        e.preventDefault();
        setError("");

        const genericErrorMessage =
            "Something went wrong! Please try again later.";

        await fetch("http://localhost:3000/user/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    if (response.status === 400) {
                        setError("Please fill all the fields correctly!");
                    } else if (response.status === 401) {
                        setError("Invalid email and password combination.");
                    } else {
                        setError(genericErrorMessage);
                    }
                } else {
                    const data = await response.json();
                    setUserContext((prevValues) => {
                        return { ...prevValues, token: data.token };
                    });
                    console.log(userContext.token);
                }
            })
            .catch((error) => {
                setError(genericErrorMessage);
            });
    };

    return (
        <Box>
            <FormControl isRequired>
                <VStack alignItems="flex-start" mb={5} ml={3}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                </VStack>
                <VStack alignItems="center">
                    <Input
                        id="first-name"
                        placeholder="Email"
                        h="20px"
                        mb={5}
                        ml={3}
                        w="90%"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </VStack>
            </FormControl>
            <FormControl isRequired>
                <VStack alignItems="flex-start" mb={5} ml={3}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                </VStack>
                <VStack alignItems="center">
                    <Input
                        id="first-name"
                        placeholder="Password"
                        h="20px"
                        mb={10}
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
                onClick={login}
            >
                Login
            </Button>
            <p style={{ color: "red" }}>{error}</p>
        </Box>
    );
};

export default Login;
