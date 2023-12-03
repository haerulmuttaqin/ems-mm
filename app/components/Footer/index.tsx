import {Box, Flex, Image, Text} from '@chakra-ui/react';
import LiveClockUpdate from "@Components/LiveClockUpdate";
import React, {useEffect, useState} from "react";
import appConfig from "app-config/app-config.json"

export default function Footer() {
    const appName = process.env.APP_NAME;
    const [dateComponent, setDateComponent] = useState() as any
    useEffect(() => {
        setDateComponent(<LiveClockUpdate/>)
    }, [])
    return (
        <Box
            as={Flex}
            className="footer"
            pos="fixed"
            whiteSpace="nowrap"
            overflow="hidden"
            // style={{backgroundImage: 'url(/images/footer-bg.png) !important', backgroundPosition:'bottom'}}
            // borderTopWidth="1px"
            // borderTopStyle="solid"
            // borderTopColor={'gray.900'}
            justifyContent={'center'}
            // textAlign={'center'}
            // bg={'gray.700'}
            color={'gray.200'}>
            {/*<Text fontSize="10px" isTruncated py={1} px={3} align="start">*/}
            {/*    {dateComponent}*/}
            {/*</Text>*/}
            <Image
                zIndex={3}
                width={'100vw'}
                objectFit="cover"
                backgroundPosition={'bottom|center'}
                src={"/images/footer-bg.png"}
                alt="Footer"
            />

            <Text bottom={0} pos={'fixed'} zIndex={3} fontSize="12px" left={0} isTruncated py={0.5} px={3} align="start">
                {dateComponent}
            </Text>
            <Text bottom={0} pos={'fixed'} zIndex={3} fontSize="10px" right={0} isTruncated py={1} px={3} align="end">© {new Date().getFullYear()} {appConfig.app_name}</Text>
        </Box>
    );
}