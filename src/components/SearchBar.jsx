export default function SearchBar({ value, onChange }) {
    return (
      <div className="search">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="タイトル／タグで検索…"
          className="input"
        />
      </div>
    );
  }