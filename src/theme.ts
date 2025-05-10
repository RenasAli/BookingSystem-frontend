import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
  
};

const theme = extendTheme({
  config,
  components: {
    Button: {
      variants: {
        nav: {
          h: "50px",
          w: "full",
          fontSize: "20px",
          justifyContent: "flex-start",
          bg: "#579AFF",
          color: "white",
          borderRadius: "0px",
          _hover: {
            bg: "#3674d1",
          }
        },
        selected_nav: {
          h: "50px",
          w: "full",
          fontSize: "20px",
          justifyContent: "flex-start",
          bg: "#3674d1",
          color: "white",
          borderRadius: "0px",
          _hover: {
            bg: "#3674d1",
          }
        }
      },
    },
  }
});

export default theme;
