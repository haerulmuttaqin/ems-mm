import {
    Box,
    Center,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import variables from "app-config/variable-mapping.json";
import {padDigits} from "../../app/utils/utils";
import React from "react";

const BoxMeters = (data) => {
    const {data: meterData} = data?.data?.data
    const groupData = data?.data?.group

    return (
        <Box
            // borderRadius={'lg'}
            h={'88vh'}
            p={4}
            // bg={useColorModeValue('white', 'gray.800')}
            backdropFilter="auto" backdropBlur="4px"
            boxShadow={'sm'}
            borderWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            className={'gradient-border-2'}
        >
            <Center>
                <Text fontWeight={'bold'}>
                    Meters by group: {groupData.metergroupname}
                </Text>
            </Center>
            <Box maxH={'79vh'} overflow={'auto'}>
                <TableContainer mt={3}>
                    <Table borderColor={useColorModeValue('gray.200', 'gray.800')}
                           borderWidth={1} size={'sm'} variant='striped'
                           colorScheme={useColorModeValue('gray', 'darkstrip')}>
                        <Thead position="sticky" top={0}>
                            <Tr>
                                <Th textColor={useColorModeValue('main.400', 'main.400')} fontSize={14}>Variables</Th>
                                {
                                    meterData.map((mData, index) =>
                                        <Th textColor={useColorModeValue('main.400', 'main.400')} fontSize={14} isNumeric key={index}>{mData?.id}</Th>
                                    )
                                }
                            </Tr>
                        </Thead>
                        <Tbody>

                            {
                                variables.map((itemVar, index) => (
                                    <Tr key={index}>
                                        <Td fontWeight={'semibold'}>{itemVar.label}</Td>
                                        {
                                            meterData.map((mData, index) =>
                                                <Td isNumeric key={index}>{padDigits(mData?.[`${itemVar.key}`])}</Td>
                                            )
                                        }
                                    </Tr>
                                ))
                            }

                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Variable</Th>
                                {
                                    meterData.map((mData, index) =>
                                        <Th isNumeric key={index}>{mData?.id}</Th>
                                    )
                                }
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>

            <Center>
                <Text mt={2} fontSize={'xs'} textColor={'gray.400'}>
                    Last update: {meterData?.[0]?.date_time}
                </Text>
            </Center>
        </Box>
    )
}
export default BoxMeters