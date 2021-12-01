import React from "react";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Image from "../../components/image";
import Seo from "../../components/seo";
import { getStrapiMedia } from "../../lib/media";

const Project = ({ project, categories }) => {
  const imageUrl = getStrapiMedia(project.image);

  const seo = {
    metaTitle: project.title,
    metaDescription: project.description,
    shareImage: project.image,
    project: true,
  };

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{project.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown source={project.content} escapeHtml={false} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div className="uk-width-expand">
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{project.published_at}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const projects = await fetchAPI("/projects?populate=*");
  return {
      paths: projects.data.map((project) => ({
          params: {
              slug: project.attributes.Slug,
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const projects = await fetchAPI(
        `/projects?slug=${params.slug}&populate=*`
        );
    const categories = await fetchAPI("/categories?populate=*");

  return {
    props: { project: projects.data[0], categories },
    revalidate: 1,
  };
}

export default Project;