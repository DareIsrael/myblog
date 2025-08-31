import React from 'react';
import './RecentNews.css';

const RecentNews = () => {
  const articles = [
    { id: 1, title: 'Breaking News: Major Event Happens', content: 'Details about the major event that just happened.' },
    { id: 2, title: 'Local News: Community Event This Weekend', content: 'Information about the upcoming community event.' },
    { id: 3, title: 'Sports Update: Local Team Wins Championship', content: 'Summary of the championship game and its highlights.' },
  ];

  return (
    <div className="recent-news">
      <h2>Recent News</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentNews;