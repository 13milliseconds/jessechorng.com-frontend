import App from "next/app";
import { useState, useEffect } from "react";
import Head from "next/head";
import Script from 'next/script'
import "../assets/scss/style.scss";
import Layout from "../components/layout";
import { createContext } from "react";
import { getStrapiMedia } from "../lib/media";
import { fetchAPI } from "../lib/api";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

//Start Apollo client
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STRAPI_API_URL + '/graphql' || "http://localhost:1337/graphql",
  cache: new InMemoryCache()
});

// Store Strapi Global object in context
export const GlobalContext = createContext();

const functionTemplate = () => {}

const MyApp = ({ Component, pageProps }) => {
  let global = { ...pageProps.global, 
    updateCat: functionTemplate,
    currentCat: ''
  }
  const [context, setContext] = useState(global)

  const updateContext = (contextUpdates = {}) =>
    setContext(currentContext => ({ ...currentContext, ...contextUpdates }))

  useEffect(() => {
    if (context?.updateCat === functionTemplate) {
      updateContext({
        updateCat: value => updateContext({ currentCat: value }),
      })
    }
  }, [context?.updateCat])

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.data.attributes.Favicon)} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
        />
      </Head>
      
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />

      <GlobalContext.Provider value={context}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await fetchAPI("/api/global?populate=*");
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp;