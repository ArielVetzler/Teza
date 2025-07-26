import React, { useState, useEffect, useRef, useCallback } from 'react';
import ArticleFeed from './components/ArticleFeed/ArticleFeed';
import UserFeed from './components/UserFeed/UserFeed';
import MatchStream from './components/MatchStream/MatchStream';
import DashboardHeader from './components/DashboardHeader/DashboardHeader';
import './App.css';

const WS_URL = 'ws://localhost:8000/ws'; // Replace with your WebSocket URL

const App = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const ws = useRef(null);

  const connectWebSocket = useCallback(() => {
    if (ws.current) ws.current.close();

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const type = message.type;
      const data = message.data;

      switch (type) {
        case 'new_article':
          setArticles(prev => {
            const newArticles = [...prev, data];
            return newArticles.length > 20 ? newArticles.slice(1) : newArticles;
          });
          break;
        case 'new_user':
          setUsers(prev => {
            const newUsers = [...prev, data];
            return newUsers.length > 20 ? newUsers.slice(1) : newUsers;
          });
          break;
        case 'new_matches':
          setMatches(prev => {
            const newMatches = [...prev, JSON.parse(data[0])];
            return newMatches.length > 20 ? newMatches.slice(1) : newMatches;
          });
          break;
        default:
          console.warn('Unknown message type:', type);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, []);

  const disconnectWebSocket = useCallback(() => {
    if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
      ws.current.close();
    }
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [connectWebSocket, disconnectWebSocket]);

  return (
    <div className="app-container">
      <div className="decorative-left"></div>
      <div className="main-content">
        <DashboardHeader />
        <div className="grid-container">
          <ArticleFeed articles={articles} />
          <UserFeed users={users} />
          <MatchStream matches={matches} />
        </div>
      </div>
      <div className="decorative-right"></div>
    </div>
  );
};

export default App;
