import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";
import { useQuery, gql } from "@apollo/client";
import slugify from 'slugify'

const Nav = ({changeCat}) => {
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

  // Select or unselect a category
  const updateCat = (cat) => {
    context?.updateCat(context.currentCat == cat ? '' : cat)
  }
  
  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
              <Link href="/">
                <a className="title">{ context.data.attributes.title } </a>
          </Link>
          is a
          <div id="categories">
            {categories.map(category => { 
              const slug = slugify(category.attributes.Title, { lower: true })
              return <div
                className={slug == context.currentCat ? "category selected" : "category"}
                onClick={() => updateCat(slug)}
                key={category.attributes.Title}>
              <div className="box"></div>{ category.attributes.Title}
              </div>
            })}
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