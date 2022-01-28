import Moment from "react-moment";

import MediaGallery from "./media-gallery";
import MediaText from "./media-text";

import styles from '../assets/scss/update.module.scss'

const renderComponent = (contentBlock) => {
  switch(contentBlock.__typename) {
    case 'ComponentMediaText':
      return <MediaText component={contentBlock} key={contentBlock.__typename + contentBlock.id} />;
    case 'ComponentMediaPhotos':
      return <MediaGallery component={contentBlock} key={contentBlock.__typename + contentBlock.id} />
    default:
      return '';
  }
}

const UpdateBlock = ({ update }) => {

  return (
    <div className={styles.updateBlock} key={ update.id }>
      <p className="uk-text-meta uk-margin-remove-top">
        <Moment format="MMM Do YYYY">{update.published_at}</Moment>
      </p>
      {update.attributes.Content.map(contentBlock => renderComponent(contentBlock) )}
    </div>
  );
};

export default UpdateBlock;
