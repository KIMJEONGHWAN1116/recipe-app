import { Link, useNavigate, useParams } from "react-router-dom";
import useRecipes from "../hooks/useRecipes.js";

export default function RecipeDetail() {
    const { id } = useParams();
    const nav = useNavigate();
    const { getById, remove } = useRecipes();

    const recipe = getById(id);

    if (!recipe) {
        return (
            <section className="stack">
                <h2>レシピが見つかりません。</h2>
                <Link className="btn" to="/recipes">一覧へ</Link>
            </section>
        );
    }

    const onDelete = () => {
        const ok = confirm("本当に削除しますか？");
        if (!ok) return;
        remove(recipe.id);
        nav("/recipes");
    };

    return (
        <section className="stack">
            <div className="row row--between">
                <h2>{recipe.title}</h2>
                <div className="row">
                    <Link className="btn btn--ghost" to={`/recipes/${recipe.id}/edit`}>編集</Link>
                    <button className="btn btn--danger" onClick={onDelete}>削除</button>
                </div>
            </div>

            {recipe.image && <img src={recipe.image} alt="" className="preview" />}

            {recipe.description && <p>{recipe.description}</p>}

            <div className="chipRow">
                {recipe.tags?.map(t => <span key={t} className="chip">#{t}</span>)}
            </div>

            <h3>材料</h3>
            <ul className="list">
                {recipe.ingredients.map((x, i) => <li key={i}>{x}</li>)}
            </ul>

            <h3>作り方</h3>
            <ol className="list">
                {recipe.steps.map((x, i) => <li key={i}>{x}</li>)}
            </ol>

            <p className="muted">
                更新日時: {new Date(recipe.updatedAt).toLocaleString("ja-JP")}
            </p>
        </section>
    );
}