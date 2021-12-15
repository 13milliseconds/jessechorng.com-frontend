import React from "react";
import Link from "next/link";
import Image from "./image";
import Moment from "react-moment";

const Card = ({ update }) => {
  const slug = update.attributes.project.data.attributes.Slug;

  let firstImage = true;
  let thumbnail = update.attributes.Content.map(function (contentBlock) {
    if (contentBlock.__typename == 'ComponentMediaPhoto' && firstImage) {
      firstImage = false;
      return <div className="uk-card-media-top"><Image image={contentBlock.Photo} /></div>
    } 
  })

  return (
    <div>
    <Link as={`/project/${slug}`} href={"/project/" + slug}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
            {thumbnail}
        </div>
        <div className="caption">
          <Moment format="MMM Do YYYY">{update.attributes.updateDate}</Moment>
          <div className="category">{update.attributes.project.data.attributes.category.data.attributes.Title}</div>
        </div>
      </a>
      </Link>
      </div>
  );
};

export default Card;