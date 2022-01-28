import React from "react";
import Link from "next/link";
import Image from "./image";
import Moment from "react-moment";

const Card = ({ update }) => {
  const slug = update.attributes.project.data.attributes.Slug;
  console.log(update.attributes.featuredImage)

  return (
    <div>
    <Link as={`/project/${slug}`} href={"/project/" + slug}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
            <div className="uk-card-media-top">
              {update.attributes.featuredImage.data && <Image image={update.attributes.featuredImage} />}
            </div>
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