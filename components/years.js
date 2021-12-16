import React from "react";
import styles from './years.module.scss'
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
    !years.includes(year) && years.push(year)
  });

  return (
    <div id="years">
      {years.map((year, i) => {
        return <div className={[styles.year, i == 0 && styles.current].join(' ')} key={year}><a>{year}</a></div>
       })}
    </div>
  );
};

export default Years;
