import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <li className="card">
      <Link to={`/recipes/${recipe.id}`} className="card__link">
        {recipe.image && <img src={recipe.image} alt="" className="thumb" />}
        <h3 className="card__title">{recipe.title}</h3>
        {recipe.description && <p className="card__desc">{recipe.description}</p>}
        <div className="chipRow">
          {recipe.tags?.slice(0, 3).map(t => (
            <span key={t} className="chip">#{t}</span>
          ))}
        </div>
      </Link>
    </li>
  );
}