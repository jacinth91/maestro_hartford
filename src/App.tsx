import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import FileUpload from './components/FileUpload';
import LoginScreen from './components/LoginScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'upload'>('chat');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('chat');
    setShowSuggestions(false);
  };

  const handleFilesSummarized = () => {
    setShowSuggestions(true);
    setActiveTab('chat');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        onTabChange={setActiveTab} 
        activeTab={activeTab} 
        onLogout={handleLogout}
      />
      
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold text-gray-900">
              {activeTab === 'chat' ? 'MarketMaestro Assistant' : 'File Upload'}
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'chat' ? (
            <ChatInterface showSuggestions={showSuggestions} />
          ) : (
            <FileUpload onSummarized={handleFilesSummarized} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;