import React from "react";
import Updates from "../components/updates";
import Years from "../components/years";
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
          <div className="uk-grid uk-grid-large">
            <div id="year">
              <Years />
            </div>
            <div className="uk-width-expand">
              <Updates />
            </div>
        </div>
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