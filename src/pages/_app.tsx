import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import "@fontsource/inter";
import { theme } from "../lib/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
