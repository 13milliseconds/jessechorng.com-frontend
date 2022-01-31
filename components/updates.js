import React, { useContext } from "react";
import Card from "./card";
import { useQuery, gql } from "@apollo/client";
import moment from "moment"
import { GlobalContext } from "../pages/_app";
import slugify from "slugify";

const Articles = ({ articles }) => {
  const context = useContext(GlobalContext);
  const { loading, error, data } = useQuery(gql`
  query Project_updates {
    projectUpdates(sort: "updateDate:desc"){
        data { 
        id
        attributes {
          updateDate
          featuredImage{
            data{
              attributes{
                width
                height
                url
                alternativeText
              }
            }
          }
          project{
            data{
              attributes{
                Slug
                Name
                category{
                  data{
                    attributes{
                      Title
                    }
                  }
                }
              }
            }
          }
        }
  }
}
}
    `);
    if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error)
    return <p>Error :(</p>
  };
    
  const updates = data.projectUpdates.data;
  
  //Keep track of year for years menu
  let currentYear;
  const yearMarker = (newYear) => {
    if (newYear !== currentYear) { 
      currentYear = newYear
      return <div id={newYear}></div>
    }
  }

  return (
    <div>
          <div className="uk-child-width-1-2@m uk-grid-match uk-grid-medium" data-uk-grid uk-grid="masonry: true">
        {updates.map((update) => {
          let category = slugify(update.attributes.project.data.attributes.category.data.attributes.Title, {lower:true})
          if (context.currentCat == '' || context.currentCat == category) {
            return (
            <div key={update.id} >
                { yearMarker(moment(update.attributes.updateDate).year()) }
                <Card
                  update={update}
                />
                </div>
              );}
            })}
          </div>
    </div>
  );
};

export default Articles;
