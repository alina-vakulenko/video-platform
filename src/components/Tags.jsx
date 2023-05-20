const Tags = ({ tags, selectedTags, handleTagsSelection }) => {
  const isTagActive = (tagName, selectedTags) => {
    const tag = tagName.toLowerCase();
    return selectedTags.includes(tag)
      ? "active"
      : tag === "all" && selectedTags.length === 0
      ? "active"
      : "";
  };

  return (
    <ul className="tags-array">
      {tags?.map(([tag, count]) => (
        <li key={tag} className={isTagActive(tag, selectedTags)}>
          <button onClick={handleTagsSelection}>
            {tag.toUpperCase()[0].concat(tag.slice(1).toLowerCase())}
            <span className="badge-circle">
              <span className="badge-count">{count}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tags;
