import Image from 'next/image'
import { getStrapiMedia } from "../lib/media";

const ImageEl = ({ image, style }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <Image
      src={imageUrl}
      alt={image.alternativeText || image.name}
      style={style}
    />
  );
};

export default ImageEl;