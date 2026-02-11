import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useRecipes from "../hooks/useRecipes.js";
import SearchBar from "../components/SearchBar.jsx";
import RecipeCard from "../components/RecipeCard.jsx";

export default function RecipeList() {
  const { recipes } = useRecipes();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return recipes;
    return recipes.filter(r => {
      const inTitle = r.title.toLowerCase().includes(query);
      const inTags = (r.tags || []).some(t => t.toLowerCase().includes(query));
      return inTitle || inTags;
    });
  }, [q, recipes]);

  return (
    <section className="stack">
      <div className="row row--between">
        <h2>레시피 목록</h2>
        <Link className="btn" to="/recipes/new">+ 추가</Link>
      </div>

      <SearchBar value={q} onChange={setQ} />

      {filtered.length === 0 ? (
        <p className="muted">레시피가 없어요. 새로 추가해볼까?</p>
      ) : (
        <ul className="grid">
          {filtered.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </ul>
      )}
    </section>
  );
}