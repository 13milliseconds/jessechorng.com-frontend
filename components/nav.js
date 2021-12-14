import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import { useQuery, gql } from "@apollo/client";

const Nav = ({}) => {
  const context = useContext(GlobalContext);
  const { loading, error, data } = useQuery(gql`
  query {
    categories{
        data { 
          attributes{
            Title
          }
        }
      }
    }
    `);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
  const categories = data.categories.data;
  
  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
              <Link href="/">
                <a className="title">{ context.data.attributes.title } </a>
          </Link>
          is an
          <div id="categories">
            { categories.map(category =>
            <div className="category">
              <div className="box"></div>{ category.attributes.Title}
              </div>
              )}
          </div>
        </div>
        <div className="uk-navbar-right">
          <Link href="/info">
                <a>Info</a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;