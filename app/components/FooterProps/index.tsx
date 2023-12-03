import {Box, useColorModeValue} from '@chakra-ui/react';
import {ReactNode} from 'react';

export default function FooterProps({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <Box  className="footer-above" bg={useColorModeValue('gray.50', 'gray.900')} 
            borderTopWidth="1px"
            borderTopStyle="solid" 
            borderTopColor={useColorModeValue('gray.300', 'gray.800')}>
            {children}
        </Box>
    );
}