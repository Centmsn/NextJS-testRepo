import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    main: "rgb(38, 41, 130)",
    lightBlue: "rgb(25, 191, 186)",
    lightViolet: "rgb(56, 60, 171)",
  },
};

const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
