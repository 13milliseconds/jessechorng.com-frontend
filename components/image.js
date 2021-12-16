import Image from 'next/image'
import { getStrapiMedia } from "../lib/media";

const ImageEl = ({ image, style }) => {
  const imageUrl = getStrapiMedia(image);
  const imageInfo = image.data.attributes

  return (
    <Image
      src={imageUrl}
      alt={imageInfo.alternativeText || imageInfo.name}
      width={imageInfo.width}
      height={imageInfo.height}
      style={style}
    />
  );
};

export default ImageEl;