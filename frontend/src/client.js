import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: new Date().toISOString().slice(0, 10),
  token: process.env.REACT_APP_SANITY_API_TOKEN,
  useCdn: true,
  ignoreBrowserTokenWarning: true,
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
