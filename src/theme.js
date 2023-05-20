import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Tema claro por defecto
    useSystemColorMode: false, // Desactivar detección automática del sistema
  },
  styles: {
    global: (props) => {
      return {
        body: {
          fontFamily: "nanum",
        },
      };
    },
  },
  semanticTokens: {
    colors: {
      "chakra-body-bg": {
        _light: "#f5f6f7",
        _dark: "rgba(0,0,0,0)",
      },
    },
  },
  fonts: {
    nanum: "Quicksand",
  },
});

export default theme;
