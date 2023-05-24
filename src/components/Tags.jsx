import { useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const isTagActive = (tagName, selectedTags) => {
  const tag = tagName.toLowerCase();
  return selectedTags.includes(tag)
    ? "active"
    : tag === "all" && selectedTags.length === 0
    ? "active"
    : "";
};

const Tags = ({ tags, selectedTags, handleTagsSelection }) => {
  const matches = useMediaQuery("(max-width: 768px)");
  const [collapsed, setCollapsed] = useState(true);

  const mediumViewTags = (
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

  const smallViewTags = (
    <div className="collapse-tags">
      <button
        className="btn collapse-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseTags"
        aria-expanded="false"
        aria-controls="collapseTags"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "Show filters" : "Hide filters"}
      </button>
      <div
        className={collapsed ? "collapse" : "collapse show"}
        id="collapseTags"
      >
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

  if (matches) {
    return smallViewTags;
  } else {
    return mediumViewTags;
  }
};

export default Tags;
