import React from "react";
import Link from "next/link";
import Image from "./image";

const Card = ({ article }) => {
  return (
    <Link as={`/project/${article.slug}`} href="/project/[id]">
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          {article.attributes.Content.map(contentBlock => contentBlock.__component == 'media.text' ? 
            <div className="uk-card-media-top">
              {contentBlock.Text}
          </div>
            :
            <div className="uk-card-media-top">
            {contentBlock.photo && <Image image={contentBlock.photo} />}
          </div>  
            )}
          <div className="uk-card-media-top">
            {article.image && <Image image={article.image} />}
          </div>
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {article.category && article.category.data.attributes.title}
            </p>
            <p id="title" className="uk-text-large">
              {article.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;