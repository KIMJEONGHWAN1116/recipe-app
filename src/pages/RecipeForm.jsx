import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRecipes from "../hooks/useRecipes.js";

const INGREDIENT_OPTIONS = [
  "卵", "牛乳", "バター", "小麦粉", "砂糖",
  "玉ねぎ", "にんにく", "醤油", "塩", "こしょう",
  "鶏肉", "豚肉", "牛肉", "トマト", "チーズ",
];

function splitLines(text) {
  return text
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);
}

function splitTags(text) {
  return text
    .split(",")
    .map(s => s.trim().replace(/^#/, ""))
    .filter(Boolean);
}

export default function RecipeForm({ mode }) {
  const nav = useNavigate();
  const { id } = useParams();
  const { add, update, getById } = useRecipes();

  const editing = mode === "edit";
  const target = useMemo(
    () => (editing ? getById(id) : null),
    [editing, id, getById]
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ 材料選択（チェックボックス）
  const [ingredients, setIngredients] = useState([]); // string[]

  // ✅ 作り方（1行に1つ）
  const [stepsText, setStepsText] = useState("");

  // ✅ タグ
  const [tagsText, setTagsText] = useState("");

  // ✅ 写真アップロード（base64）
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState(""); // ✅ 表示用ファイル名

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!editing) return;
    if (!target) return;

    setTitle(target.title);
    setDescription(target.description || "");
    setIngredients(target.ingredients || []);
    setStepsText((target.steps || []).join("\n"));
    setTagsText((target.tags || []).map(t => `#${t}`).join(", "));
    setImage(target.image || "");
    setFileName(""); // 編集時は既存画像の元ファイル名が不明なので空にする
  }, [editing, target]);

  if (editing && !target) {
    return (
      <section className="stack">
        <h2>編集するレシピが見つかりません。</h2>
        <button className="btn" onClick={() => nav("/recipes")}>一覧へ</button>
      </section>
    );
  }

  const toggleIngredient = (name) => {
    setIngredients(prev =>
      prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
    );
  };

  const onPickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルが大きすぎる場合を防止（目安：2MB以下）
    if (file.size > 2 * 1024 * 1024) {
      alert("写真が大きすぎます（2MB以下を推奨）。もっと小さい画像を選んでください！");
      // 同じファイルを選び直せるようにリセット
      e.target.value = "";
      setFileName("");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return alert("タイトルは必須です！");
    if (ingredients.length === 0) return alert("必要な材料を1つ以上選んでください！");
    const steps = splitLines(stepsText);
    if (steps.length === 0) return alert("作り方を1つ以上入力してください！");

    const payload = {
      title: trimmed,
      description: description.trim(),
      ingredients,
      steps,
      tags: splitTags(tagsText),
      image,
    };

    if (editing) {
      update(target.id, payload);
      nav(`/recipes/${target.id}`);
    } else {
      const newId = add(payload);
      nav(`/recipes/${newId}`); // ✅ 保存後、詳細へ移動
    }
  };

  return (
    <section className="stack">
      <h2>{editing ? "レシピ編集" : "新しいレシピを追加"}</h2>

      <form className="form" onSubmit={onSubmit}>
        <label className="label">
          タイトル *
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="label">
          説明
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="label">
          必要な材料を選択 *
          <div className="checkGrid">
            {INGREDIENT_OPTIONS.map(name => (
              <label key={name} className="checkItem">
                <input
                  type="checkbox"
                  checked={ingredients.includes(name)}
                  onChange={() => toggleIngredient(name)}
                />
                {name}
              </label>
            ))}
          </div>
        </div>

        {/* ✅ ファイル入力は隠して、表示は日本語ボタンにする */}
        <div className="label">
          写真を登録（任意）
          <div className="row">
            <label className="btn" style={{ cursor: "pointer" }}>
              画像を選択
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onPickImage}
                style={{ display: "none" }}
              />
            </label>
            <span className="muted">
              {fileName ? fileName : "未選択"}
            </span>
          </div>
        </div>

        {image && (
          <img
            src={image}
            alt="preview"
            className="preview"
          />
        )}

        <label className="label">
          作り方 *（1行に1つ）
          <textarea
            className="textarea"
            value={stepsText}
            onChange={(e) => setStepsText(e.target.value)}
          />
        </label>

        <label className="label">
          タグ（カンマ区切り、例：#チキン, #ダイエット）
          <input
            className="input"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">{editing ? "保存" : "追加"}</button>
          <button className="btn btn--ghost" type="button" onClick={() => nav(-1)}>
            キャンセル
          </button>
        </div>
      </form>
    </section>
  );
}