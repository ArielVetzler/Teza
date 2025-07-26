import React from 'react';
import Card from '../Card/Card';
import './MatchStream.css';

const MatchStream = React.memo(({ matches }) => {
  return (
    <Card>
      <h2 className="feed-title">
        <span><span className="feed-dot orange"></span>Match Stream</span>
      </h2>
      <div className="title-separator"></div>
      <div className="feed-content">
        {matches.map((match, index) => {
          return (
            <Card key={`${match.article_id}-${match.user_id}-${index}`} className="match-card">
              <div className="feed-item">
                <p className="feed-item-text">
                  <span className="feed-item-bold">Match! </span> Article: <span className="feed-item-link">{match.article_name}</span> & User: <span className="feed-item-link">{match.user_id.substring(0, 10)}</span>
                </p>
                <p className="feed-item-text">
                  <span className="feed-item-bold">Score:</span> <span className="feed-item-score">{match.score.toFixed(2)}</span>
                </p>
                <div className="tag-container">
                  <span className="feed-item-bold">Matching Tags:</span>
                  {match.matched_tags.map(tag => (
                    <span key={tag} className="tag green">{tag}</span>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
});

export default MatchStream;