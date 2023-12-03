import Base from "../Base"
import Footer from "../Footer"
import {Box} from "@chakra-ui/layout";
import React from "react";
import {useColorModeValue} from "@chakra-ui/react";


const Layout = ({children, data}: any) => {
    return (
        <Box bg={useColorModeValue('gray.50', '')}>
            <Base data={data}>
                <Box h={'70px'}></Box>
                {children}
                <Footer/>
            </Base>
        </Box>
    )
}

export default Layout;