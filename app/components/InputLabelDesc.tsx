import {useColorModeValue} from '@chakra-ui/react';
import {Text} from '@chakra-ui/layout';

export default function InputLabelDesc({text}) {
    return (<Text as="span" fontWeight="thin" fontSize="xs" className="chakra-form__required-indicator" textColor={useColorModeValue('gray.400', 'gray.500')}>{text}</Text>);
}