import React from "react";
import Moment from "react-moment";
import Image from "./image";

const UpdateBlock = ({ update }) => {
  return (
    <div key={ update.id }>
      <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{update.published_at}</Moment>
          </p>
      <div className="uk-child-width-1-2@s" data-uk-grid="true">
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            { update.attributes.Content.map(contentBlock => contentBlock.__typename == 'ComponentMediaText' ? 
              <div className="uk-card-media-top" key={ contentBlock.__typename + contentBlock.id }>
              {contentBlock.Text}
          </div>
            :
              <div className="uk-card-media-top" key={ contentBlock.__typename + contentBlock.id }>
                <Image image={contentBlock.Photo} />
                <div className="caption">
                  {contentBlock.Description}
                  </div>
          </div>  )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlock;
