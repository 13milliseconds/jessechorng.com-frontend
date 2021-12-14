import React from "react";
import moment from "react-moment";
import { useQuery, gql } from "@apollo/client";

const Years = () => {
  const { loading, error, data } = useQuery(gql`
  query Project_updates {
    projectUpdates{
        data { 
        id
        attributes {
          updateDate
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
    let year = new Date(update.attributes.updateDate).getFullYear();
    console.log(years)
    !years.includes(year) && years.push(year)
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
