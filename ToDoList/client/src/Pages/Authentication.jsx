import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import NotesSharpIcon from "@mui/icons-material/NotesSharp";

const Authentication = () => {
    return (
        <>
            <Box
                bg="#DDDDDD"
                w="3%"
                p={10}
                color="black"
                borderRadius={10}
                boxShadow="0px 0px 10px #EEEEEE"
                ml="auto"
                mr="auto"
                mt="auto"
                mb="10px"
            >
                <NotesSharpIcon fontSize="large" />
            </Box>
            <Box
                bg="#DDDDDD"
                w="25%"
                p={10}
                color="black"
                borderRadius={10}
                boxShadow="0px 0px 10px #EEEEEE"
                ml="auto"
                mr="auto"
                mt="10px"
                mb="auto"
            >
                <Tabs isFitted variant="enclosed">
                    <TabList
                        mb="20"
                        bg="#B2B1B9"
                        borderRadius={5}
                        boxShadow="0px 0px 10px #E9D5DA"
                        h="50px"
                    >
                        <Tab
                            w="40%"
                            fontSize="20px"
                            h="30px"
                            mt="auto"
                            mb="auto"
                            ml="auto"
                            mr="auto"
                        >
                            Login
                        </Tab>
                        <Tab
                            fontSize="20px"
                            w="40%"
                            h="30px"
                            mt="auto"
                            mb="auto"
                            ml="auto"
                            mr="auto"
                        >
                            Register
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Register />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
};

export default Authentication;
