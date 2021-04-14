import "../styles/globals.css";
import Head from "next/head";

import { QuizStore } from "../context/QuizContext";
import Theme from "../styles/Theme";

function MyApp({ Component, pageProps }) {
  return (
    <QuizStore>
      <Theme>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Theme>
    </QuizStore>
  );
}

export default MyApp;
