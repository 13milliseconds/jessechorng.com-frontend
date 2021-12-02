import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  const imageUrl = media ? media.data.attributes.url.startsWith("/")
        ? getStrapiURL(media.data.attributes.url)
      : media.data.attributes.url
    : '';
    console.log(media)
  console.log(imageUrl)
  return imageUrl;
}