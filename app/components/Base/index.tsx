import {
    Box,
    Center,
    Flex,
    Hide,
    HStack,
    IconButton,
    Image,
    Spacer,
    Spinner,
    Text,
    Tooltip,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ColorMode from "@Components/ColorMode";
import {RepeatIcon, SettingsIcon,} from "@chakra-ui/icons";
import FeatherIcon from "feather-icons-react";
import {FullScreen, useFullScreenHandle} from "react-full-screen";
import LiveClockUpdate from "@Components/LiveClockUpdate";
import appConfig from "app-config/app-config.json"

const Base = ({children, data}: any) => {
    const handle = useFullScreenHandle();
    return (
        <FullScreen
            handle={handle}
        >
            <HeaderBar
                data={{data: data, handle: handle}}
                background={"primary.400"}
            />
            {children}
        </FullScreen>
    );
};


const HeaderBar = (data, {...rest}: any) => {

    const {data: header} = data.data
    const router = useRouter()


    const toggleFullScreen = () => {
        if (data.data.handle.active) {
            data.data.handle.exit()
        } else {
            data.data.handle.enter()
        }
    }

    const [dateComponent, setDateComponent] = useState() as any
    useEffect(() => {
        setDateComponent(<LiveClockUpdate/>)
    }, [])

    return (
        <Box
        >
            <Image
                pos='fixed'
                zIndex={3}
                width={'100vw'}
                objectFit="cover"
                src={"/images/header-bg.png"}
                alt="Logo"
            />
            <Flex
                ml={{base: 0, md: 0}}
                px={{base: 4, md: 4}}
                // style={{backgroundImage: 'url(/images/header-bg.png) !important', backgroundPosition:'center'}}
                // backdropFilter="auto" backdropBlur="2px"
                bgGradient={useColorModeValue('linear(to-b, white, transparent)', 'linear(to-b, gray.900, transparent)')}
                py={3}
                pos="fixed"
                left="0"
                right="0"
                zIndex="3"
                // justifyContent={{base: "space-between", md: "space-between"}}
                {...rest}
            >
                <HStack spacing={4}>
                    <Image
                        height="40px"
                        objectFit="contain"
                        src={"/images/app-icon.png"}
                        alt="Logo"
                    />
                    <Box>
                        <VStack alignItems={'start'} spacing={-1}>
                            <Box isTruncated={true} fontSize={'lg'} fontWeight={'semibold'}>
                                {header?.title || <Spinner size='sm'/>}
                            </Box>
                            <Text isTruncated={true} fontSize='12px' fontWeight={'light'}>
                                {header?.desc || "Loading..."}
                            </Text>
                        </VStack>
                    </Box>
                </HStack>

                <Spacer />

                <HStack spacing={2}>
                    <Tooltip hasArrow label={"Refresh Page"}>
                        <IconButton
                            size="sm"
                            onClick={() => router.reload()}
                            variant="ghost"
                            aria-label="refresh content"
                            icon={<RepeatIcon h={4} w={4}/>}
                        />
                    </Tooltip>
                    <ColorMode/>
                    <Tooltip hasArrow label={"Settings"}>
                        <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label="open notification"
                            icon={<SettingsIcon h={4} w={4}/>}
                        />
                    </Tooltip>
                    <Tooltip hasArrow label={data.data.handle.active ? "Exit Full Screen" : "Full Screen"}>
                        <IconButton
                            onClick={toggleFullScreen}
                            size="sm"
                            variant="ghost"
                            aria-label="open notification"
                            icon={data.data.handle.active ? <FeatherIcon icon={'minimize'} width={16}/> : <FeatherIcon icon={'maximize'} width={16}/>}
                        />
                    </Tooltip>
                </HStack>
            </Flex>
            <Hide below={'md'}>
                <Center>
                    <Box pos={'fixed'} zIndex={4} textAlign={'center'} p={2} top={0}>
                        <Text fontWeight={'bold'}>{appConfig?.short_name}</Text>
                    </Box>
                </Center>
            </Hide>
        </Box>
    );
};

export default Base;
