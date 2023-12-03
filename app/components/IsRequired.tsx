import {Text} from '@chakra-ui/layout';

export default function IsRequired() {
    return (<Text as="span" className="chakra-form__required-indicator" textColor="red">*</Text>);
}