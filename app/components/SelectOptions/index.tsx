import Select from "./ChakraReactSelect";

export default function SelectOptions(props) {
    return (
        <Select menuContainerStyle={{'zIndex': 999}} styles={{ menuPortal: base => ({ ...base, zIndex: 'popover' }) }} width="100%" color="white" size="md" {...props} colorScheme="main" className="select-option" />
    )
}