import React from "react";
import Card from "./card";

const Articles = ({ articles }) => {

  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid="true">
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {articles.data.map((article, i) => {
              return (
                <Card
                  article={article}
                  key={article.id}
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
