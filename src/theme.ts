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
        },
        success: {
          bg: "#34d399",
          color: "white",
          _hover: {
            bg: "#319973",
          }
        },
        cancel: {
          bg: "#f03141",
          color: "white",
          _hover: {
            bg: "#cc1d2b",
          }
        },
        primary: {
          bg: "#579AFF",
          color: "white",
          _hover: {
            bg: "#3674d1",
          }
        },
      },
    },
  }
});

export default theme;
