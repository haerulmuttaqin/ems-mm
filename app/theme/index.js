import {theme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const styles = {
    global: props => ({
        body: {
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('gray.100', 'gray.900')(props),
        },
    }),
};

export default {
    ...theme,
    styles,
    colors: {
        ...theme.colors,
        main: {
            50: "#f0f6ff",
            100: "#bfd5fe",
            200: "#89a3fa",
            300: "#5e8ef6",
            400: "#4b63ec",
            500: "#2e3fd6",
            600: "#1f29b7",
            700: "#162397",
            800: "#101f74",
            900: "#0e215f"
            // 50: "#DDF6FF",
            // 100: "#C4EFFF",
            // 200: "#9FE5FF",
            // 250: "#75D6F9",
            // 300: "#59CDF8",
            // 400: "#22BDF5",
            // 500: "#00AEEF",
            // 600: "#0193C8",
            // 700: "#0578A2",
            // 800: "#02678C",
        },
        primary: {
            50: "#DDF6FF",
            100: "#C4EFFF",
            200: "#9FE5FF",
            250: "#75D6F9",
            300: "#59CDF8",
            400: "#22BDF5",
            500: "#00AEEF",
            600: "#0193C8",
            700: "#0578A2",
            800: "#02678C",
        },
        secondary: {
            inputHelper: "#CBD5E0",
        },
        label: {
            0: "#000000",
            50: "#F7FAFC",
            100: "#EDF2F7",
            200: "#E2E8F0",
            250: "#b8c5d1",
            300: "#CBD5E0",
            400: "#A0AEC0",
            500: "#718096",
            600: "#4A5568",
            700: "#2D3748",
            750: "#2D3748",
            800: "#1A202C",
            900: "#171923",
        },
        lightgray: {
            50: '#f7fafc',
          },
        darkstrip: {
            0: "#000000",
            50: "#F7FAFC",
            100: "#EDF2F7",
            200: "#E2E8F0",
            250: "#b8c5d1",
            300: "#CBD5E0",
            400: "#A0AEC0",
            500: "#718096",
            600: "#4A5568",
            700: "#23293a5e",
            750: "#1A202C",
            800: "#1A202C",
            900: "#171923",
          },
    }
}