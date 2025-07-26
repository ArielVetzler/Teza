import React from 'react';
import Card from '../Card/Card';
import './ArticleFeed.css';

export default React.memo(function ArticleFeed({ articles }) {
  const maxTagsToShow = 4;
  return (
    <Card>
      <h2 className="feed-title">
        <span><span className="feed-dot blue"></span>Live Article Feed</span>
      </h2>
      <div className="title-separator"></div>
      <div className="feed-content">
        {articles.map((article, index) => {
          return (
            <Card key={`${article.id}-${index}`} className="article-card">
              <div className="feed-item">
                <h3 className="feed-item-title">{article.title}</h3>
                {article.content && <p className="feed-item-summary">{article.content}</p>}
                <div className="tag-container">
                  {(article.llm_tags && article.llm_tags.length > 0 ? article.llm_tags : article.tags || []).slice(0, maxTagsToShow).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                  {(article.llm_tags && article.llm_tags.length > 0 ? article.llm_tags : article.tags || []).length > maxTagsToShow && (
                    <span className="tag">+{(article.llm_tags && article.llm_tags.length > 0 ? article.llm_tags : article.tags || []).length - maxTagsToShow} more</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
});