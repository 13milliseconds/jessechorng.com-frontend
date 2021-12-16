import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { fetchAPI } from "../lib/api";
import { useQuery, gql } from "@apollo/client";

const Info = ({ homepage }) => {
  const { loading, error, data } = useQuery(gql`
  query{
    info{
        data { 
        attributes{
            title
            biography
          }
        }
      }
    }
    `);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
  const infoContent = data.info.data ? data.info.data.attributes : {};
  
  return (
    <Layout>
      <Seo seo={homepage.seo}/>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{ infoContent.title }</h1>
          <div className="uk-grid uk-grid-large">
            <div id="year">
              { infoContent.biography }
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

export default Info;