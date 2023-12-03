import {Box, useColorModeValue,} from '@chakra-ui/react';

interface ReactNode {
}
export default function Header({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <Box bg={useColorModeValue('gray.50', 'gray.900')}>
            <Box>{children}</Box>
        </Box>
    );
}
