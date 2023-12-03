import {useColorModeValue} from '@chakra-ui/react';
import {Text} from '@chakra-ui/layout';

export default function IsOptional() {
    return (<Text as="span" fontWeight="thin" fontSize="xs" className="chakra-form__required-indicator" textColor={useColorModeValue('gray.300', 'gray.600')}>optional</Text>);
}