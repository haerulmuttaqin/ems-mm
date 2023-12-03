import {meterGroupService} from "@Services/meterGroupService";
import React, {useEffect} from "react";
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

const BoxMeterVariableLive = ({data}) => {
    let {
        data: meterData,
        isLoading,
        refetch,
        status,
        error
    } = meterGroupService.fetchMeterCounterLiveByMeterIDuseQuery(data?.id)
    useEffect(() => {}, [meterData])

    return (
        <Box
            ml={2}
            // borderRadius={'lg'}
            h={'88vh'}
            p={4}
            // bg={useColorModeValue('white', 'gray.800')}
            backdropFilter="auto" backdropBlur="4px"
            className={'gradient-border-2'}
            boxShadow={'sm'}
            borderWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
            <Box maxH={'79vh'} overflow={'auto'}>
            <TableContainer>
                <Table borderColor={useColorModeValue('gray.200', 'gray.800')}
                       borderWidth={1} size={'sm'} variant='striped'
                       colorScheme={useColorModeValue('gray', 'darkstrip')}>
                    <Thead>
                        <Tr>
                            <Th textColor={useColorModeValue('main.400', 'main.400')} fontSize={14}>Variables</Th>
                            <Th textColor={useColorModeValue('main.400', 'main.400')} isNumeric={true} fontSize={14}>{meterData?.id}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {
                            variables.map((itemVar, index) => (
                                <Tr key={index}>
                                    <Td fontWeight={'semibold'}>{itemVar.label}</Td>
                                    <Td isNumeric key={index}>{padDigits(meterData?.[`${itemVar.key}`]) || '...'}</Td>
                                </Tr>
                            ))
                        }

                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Variable</Th>
                            <Th isNumeric={true} fontSize={14}>{meterData?.id || '...'}</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            </Box>
            <Center>
                <Text mt={2} fontSize={'xs'} textColor={'gray.400'}>
                    Last update: {meterData?.date_time}
                </Text>
            </Center>
        </Box>
    )
}
export default BoxMeterVariableLive