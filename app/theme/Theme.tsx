import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {mode} from "@chakra-ui/theme-tools";

const styles = {
    global: props => ({
        body: {
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('gray.100', '#141214')(props),
        },
    }),
};

const theme = extendTheme({
    styles,
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
})

export const Theme = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}