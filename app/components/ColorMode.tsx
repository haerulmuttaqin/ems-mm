import {MoonIcon, SunIcon} from "@chakra-ui/icons"
import {IconButton, Tooltip, useColorMode} from "@chakra-ui/react"

export default function ColorMode() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Tooltip hasArrow label={'Change Theme'}>
            <IconButton
                marginLeft={0}
                icon={colorMode === 'light' ? <MoonIcon h={4} w={4} /> : <SunIcon h={4} w={4} />}
                size="sm" variant="ghost" onClick={toggleColorMode} aria-label="change color mode" />
        </Tooltip>
    )
}