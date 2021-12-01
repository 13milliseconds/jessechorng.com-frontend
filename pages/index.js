import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";

const Home = ({ projectUpdates, projects, homepage }) => {
  return (
    <Layout categories={projects}>
      <Seo seo={homepage.seo}project-updates/>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.title}</h1>
          <Articles articles={projectUpdates} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [projectUpdates, projects, homepage] = await Promise.all([
    fetchAPI("/project-updates?populate=*"),
    fetchAPI("/projects"),
    fetchAPI("/homepage"),
  ]);

  return {
    props: { projectUpdates, projects, homepage },
    revalidate: 1,
  };
}

export default Home;