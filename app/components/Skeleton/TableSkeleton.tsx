import {Box, HStack} from "@chakra-ui/react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TableSkeleton() {
    return (
        <Box p={2} my={3} mx={4}>
            <HStack spacing={8}>
                <Box style={{ lineHeight: 3, width: 20 }}>
                    <Skeleton height={8} count={10} />
                </Box>

                <Box style={{ lineHeight: 3, width: 100 }}>
                    <Skeleton height={8} count={10} />
                </Box>

                <Box style={{ lineHeight: 3, width: 200 }}>
                    <Skeleton height={8} count={10} />
                </Box>

                <Box style={{ lineHeight: 3, width: 400 }}>
                    <Skeleton height={8} count={10} />
                </Box>

                <Box style={{ lineHeight: 3, width: 700 }}>
                    <Skeleton height={8} count={10} />
                </Box>
            </HStack>
        </Box>
    )
}