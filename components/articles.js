import React from "react";
import Card from "./card";
import { useQuery, gql } from "@apollo/client";

const Articles = ({ articles }) => {
  const { loading, error, data } = useQuery(gql`
  query Project_updates {
    projectUpdates{
        data { 
        id
        attributes {
          updateDate
          project{
            data{
              attributes{
                Slug
              }
            }
          }
          Content{
            __typename
            ... on ComponentMediaPhoto{
              Description
              Photo{
                data{
                  attributes{
                    url
                  }
                }
              }
            }
            ... on ComponentMediaText{
              Text
            }
          }
        }
  }
}
}
    `);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    const updates = data.projectUpdates.data;

  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid="true">
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {updates.map((update, i) => {
              return (
                <Card
                  update={update}
                  key={update.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
