import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="logo">RecipeNote</NavLink>
        <nav className="nav">
          <NavLink to="/recipes" className="nav__link">レシピ</NavLink>
          <NavLink to="/recipes/new" className="nav__link">追加</NavLink>
        </nav>
      </div>
    </header>
  );
}