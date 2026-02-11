import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="stack">
            <h1>レシピを作って保存し、いつでも閲覧できます</h1>
            <p className="muted">料理を愛するすべての人のためのレシピ管理アプリです。<br />
                材料選択や画像登録、手順の記録を通して、自分だけのレシピを体系的に整理することができます。<br />
                登録したレシピはいつでも閲覧・編集・削除が可能で、検索や並び替え機能により必要な情報を素早く見つけられます。<br />
                日々の料理をより便利に、そして楽しくサポートします。</p>
            <div className="row">
                <Link className="btn" to="/recipes">レシピ一覧</Link>
                <Link className="btn btn--ghost" to="/recipes/new">新しいレシピを追加</Link>
            </div>
        </section>
    );
}