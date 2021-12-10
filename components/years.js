import React from "react";
import Moment from "react-moment";
import { useQuery, gql } from "@apollo/client";

const Years = () => {
  const { loading, error, data } = useQuery(gql`
  query Project_updates {
    projectUpdates{
        data { 
        id
        attributes {
          publishedAt
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
  let years = [];
  updates.forEach(update => {
    let year = <Moment format="Y">{update.attributes.publishedAt}</Moment>;
    !years.includes(year) && years.push(year);
  });

  return (
    <div id="years">
      {years.map((year, i) => {
        return <div className="year"><a>{year}</a></div>
       })}
    </div>
  );
};

export default Years;
