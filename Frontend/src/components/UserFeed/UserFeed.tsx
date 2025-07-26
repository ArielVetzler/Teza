import React from 'react';
import Card from '../Card/Card';
import './UserFeed.css';

const UserFeed = React.memo(({ users }) => {
  const maxTagsToShow = 4;
  return (
    <Card>
      <h2 className="feed-title">
        <span><span className="feed-dot green"></span>Live User Feed</span>
      </h2>
      <div className="title-separator"></div>
      <div className="feed-content">
        {users.map(user => {
          const isDiverse = user.tags.length > 5; // Example threshold for diverse
          const diversityClass = isDiverse ? 'diverse' : 'casual';

          return (
            <Card key={user.id} className="user-card">
              <div className="feed-item">
                <div className="user-header">
                  <div className="user-info">
                    <span className="user-icon">👤</span> {/* Default user icon */}
                    <h3 className="feed-item-id">{user.id.substring(0, 10)}</h3>
                  </div>
                  <span className={`user-diversity-label ${diversityClass}`}>
                    {isDiverse ? '✨ Diverse' : '🌿 Casual'}
                  </span>
                </div>
                <div className="tag-container">
                  <span className="tags-prefix">Tags:</span>
                  {user.tags.slice(0, maxTagsToShow).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                  {user.tags.length > maxTagsToShow && (
                    <span className="tag">+{user.tags.length - maxTagsToShow} more</span>
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

export default UserFeed;
