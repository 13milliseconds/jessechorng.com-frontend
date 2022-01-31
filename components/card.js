import React from "react";
import Link from "next/link";
import Image from "./image";
import Moment from "react-moment";
import styles from "../assets/scss/cards.module.scss"

const Card = ({ update }) => {
  const slug = update.attributes.project.data.attributes.Slug;

  return (
    <div className={styles.card}>
    <Link as={`/project/${slug}`} href={"/project/" + slug}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
            <div className="uk-card-media-top">
              {update.attributes.featuredImage.data && <Image image={update.attributes.featuredImage} />}
            </div>
        </div>
          <div className={styles.caption}>
            <div className={styles.captionTop}>
              <div className={styles.captionProject}>{update.attributes.project.data.attributes.Name}</div>
              <Moment format="MM/D/YYYY">{update.attributes.updateDate}</Moment>
            </div>
            <div className={styles.captionCategory}>{update.attributes.project.data.attributes.category.data.attributes.Title}</div>
        </div>
      </a>
      </Link>
      </div>
  );
};

export default Card;