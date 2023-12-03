import {Box, HStack, Skeleton, Stack, Table, Tbody, Td, Tr} from "@chakra-ui/react"
import React from "react"

export default () => {
    return (
        <Box m="4">
            <Stack>
                <Skeleton height="20px" width="200px" />
                <Skeleton height="10px" width="100px" />
            </Stack>
            <HStack mt="7">
                <Skeleton height="20px" width="170px" />
                <Skeleton height="20px" width="170px" />
            </HStack>
            <Table variant="striped" mt="12px" size="sm">
                <Tbody>
                    <Tr>
                        <Td>&nbsp;</Td>
                        <Td>&nbsp;</Td>
                    </Tr>
                    <Tr>
                        <Td>&nbsp;</Td>
                        <Td>&nbsp;</Td>
                    </Tr>
                    <Tr>
                        <Td>&nbsp;</Td>
                        <Td>&nbsp;</Td>
                    </Tr>
                    <Tr>
                        <Td>&nbsp;</Td>
                        <Td>&nbsp;</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    )
}
