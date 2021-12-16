import React from "react";
import ReactMarkdown from "react-markdown";
import { fetchAPI } from "../../lib/api";
import Layout from "../../components/layout";
import Image from "../../components/image";
import Seo from "../../components/seo";
import UpdateBlock from "../../components/update-block";
import { getStrapiMedia } from "../../lib/media";
import { useQuery, gql } from "@apollo/client";

const Project = ({ params }) => {
    const { loading, error, data } = useQuery(gql`
    query Project($slug: String) {
        projects(filters: { Slug: { eq: $slug }}){
            data { 
            id
            attributes {
                  Slug
                Name
              project_updates{
                data{
                  id,
                  attributes{
                    Content{
                      __typename
                      ... on ComponentMediaPhoto{
                        id
                        Description
                        Photo{
                          data{
                            attributes{
                              url
                              width
                              height
                              alternativeText
                              name
                            }
                          }
                        }
                      }
                      ... on ComponentMediaText{
                        id
                        Text
                      }
                    }
                  }
                }
                  }
                category {
                data {
                    id
                    attributes {
                    Title
                    }
                }
                }
            }
            }
        }
    }
    `, { variables: { slug: params.slug } });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    const project = data.projects.data[0];
    
  const imageUrl = getStrapiMedia(project.image);

  const seo = {
    metaTitle: project.attributes.Name,
    metaDescription: project.description,
    shareImage: project.image,
    project: true,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-flex uk-flex-center uk-flex-middle uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{project.attributes.Name}</h1>
      </div>
          <div className="uk-section">
        <div className="uk-container uk-container-small">
              {project.attributes.project_updates.data.map(update => <UpdateBlock update={update} key={ update.id }/>) }
              </div>
        </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown source={project.content} escapeHtml={false} />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
          </div>
        </div>
          </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const projects = await fetchAPI("/api/projects?populate=*");
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

  return {
    props: {params},
    revalidate: 1,
  };
}

export default Project;