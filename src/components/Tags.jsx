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
    <div className="collapse-tags">
      <button
        className="btn collapse-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseTags"
        aria-expanded="false"
        aria-controls="collapseTags"
      >
        Filter by tags
      </button>
      <div className="collapse" id="collapseTags">
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
      </div>
    </div>
  );
};

export default Tags;
