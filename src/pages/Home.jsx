import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="stack">
      <h1>レシピを作って保存し、いつでも閲覧できます</h1>
      <p className="muted">ローカル保存（localStorage）なので、ログインなしですぐに使えます！</p>
      <div className="row">
        <Link className="btn" to="/recipes">レシピ一覧</Link>
        <Link className="btn btn--ghost" to="/recipes/new">新しいレシピを追加</Link>
      </div>
    </section>
  );
}