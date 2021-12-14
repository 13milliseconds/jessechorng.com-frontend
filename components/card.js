import React from "react";
import Link from "next/link";
import Image from "./image";
import Moment from "react-moment";

const Card = ({ update }) => {
  console.log(update)
  const slug = update.attributes.project.data.attributes.Slug;

  return (
    <Link as={`/project/${slug}`} href={"/project/" + slug}>
      <a className="uk-link-reset">
      <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{update.attributes.updateDate}</Moment>
          </p>
        <div className="uk-card uk-card-muted">
          {update.attributes.Content.map(contentBlock => contentBlock.__typename == 'ComponentMediaPhoto' ? 
            <div className="uk-card-media-top"><Image image={contentBlock.Photo} /></div>  : ''
            )}
        </div>
      </a>
    </Link>
  );
};

export default Card;