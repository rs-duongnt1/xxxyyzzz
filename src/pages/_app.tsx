import "../styles/globals.css";
import type { AppProps } from "next/app";
import { configureAppStore } from "../store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Sidebar from "resources/common/components/Sidebar";
import Header from "resources/common/components/Header";
import { Backdrop, Box, Container, Stack, ThemeProvider } from "@mui/material";
import { LAYOUT_SIDEBAR_WIDTH } from "resources/common/constants";
import theme from "../theme";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const store = configureAppStore();

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url: string) => {
      setLoading(true);
    };
    const handleComplete = (url: string) => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Stack
          sx={{
            position: "relative",
          }}
        >
          <Header />
          <Stack direction="row">
            <Sidebar />
            <Stack
              flex={1}
              sx={{
                visibility: !loading ? "visible" : "hidden",
                paddingLeft: LAYOUT_SIDEBAR_WIDTH + "px",
              }}
            >
              <Stack px="30px" py="15px">
                <Component {...pageProps} />
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              position: "fixed",
              width: `calc(100% - ${LAYOUT_SIDEBAR_WIDTH}px)`,
              left: `${LAYOUT_SIDEBAR_WIDTH}px`,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              visibility: loading ? "visible" : "hidden",
            }}
          >
            <CircularProgress />
          </Box>
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
