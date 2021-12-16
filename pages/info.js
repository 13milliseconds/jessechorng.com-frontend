import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { useQuery, gql } from "@apollo/client";

const Info = ({  }) => {
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
      <Seo seo={infoContent.seo}/>
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

export default Info;