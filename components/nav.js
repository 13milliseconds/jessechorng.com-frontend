import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../pages/_app";

const Nav = ({ categories }) => {
  const context = useContext(GlobalContext);
  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
              <Link href="/">
                <a>{ context.data.attributes.title }</a>
              </Link>
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