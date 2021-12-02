import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

const Home = ({ homepage }) => {
  return (
    <Layout>
      <Seo seo={homepage.seo}/>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.title}</h1>
          <Articles />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [ homepage] = await Promise.all([
    fetchAPI("/api/homepage"),
  ]);

  return {
    props: { homepage },
    revalidate: 1,
  };
}

export default Home;