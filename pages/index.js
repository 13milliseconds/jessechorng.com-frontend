import React from "react";
import Updates from "../components/updates";
import Years from "../components/years";
import Seo from "../components/seo";
import { useQuery, gql } from "@apollo/client";

const Home = ({ }) => {
  const { loading, error, data } = useQuery(gql`
  query{
    homepage{
        data { 
        attributes{
            Title
          }
        }
      }
    }
    `);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
  const homepage = data.homepage.data ? data.homepage.data.attributes : {};

  return (
    <>
      <Seo seo={homepage.seo}/>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <div className="uk-grid uk-grid-large">
            <Years />
            <div className="uk-width-expand">
              <Updates />
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;