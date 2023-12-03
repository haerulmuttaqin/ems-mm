import {ChevronRightIcon} from '@chakra-ui/icons';
import {Breadcrumb, useColorModeValue} from '@chakra-ui/react';

const BreadCrumbNav = ({ children }) => {
    return (
        <Breadcrumb
            bg={useColorModeValue('gray.100', '#252d3d')}
            spacing="8px"
            borderBottomWidth="2px" 
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            separator={<ChevronRightIcon color="gray.500" />}
            pt="55px" pb="4px" pl="26px" fontWeight="medium" fontSize="xs">
            {children}
        </Breadcrumb>
    )
}

export default BreadCrumbNav