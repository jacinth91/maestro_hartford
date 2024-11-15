import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot, TrendingUp, TrendingDown, AlertTriangle, LineChart } from 'lucide-react';
import QueryResult from './QueryResult';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  metrics?: {
    category: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
    details?: string;
  }[];
}

interface Suggestion {
  icon: React.ElementType;
  title: string;
  query: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
}

const ChatInterface = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions: Suggestion[] = [
    {
      icon: TrendingUp,
      title: 'Analyze Noninterest Income Growth',
      query: 'What factors contributed to the 12% YoY increase in noninterest income?',
      type: 'positive'
    },
    {
      icon: TrendingDown,
      title: 'Review Net Interest Income',
      query: 'Explain the 11% decline in net interest income and its impact.',
      type: 'negative'
    },
    {
      icon: AlertTriangle,
      title: 'Credit Quality Analysis',
      query: 'What are the key risks in the commercial real estate portfolio?',
      type: 'warning'
    },
    {
      icon: LineChart,
      title: 'Capital Position Overview',
      query: 'How does our CET1 ratio of 11.3% compare to regulatory requirements?',
      type: 'neutral'
    }
  ];

  const metrics = [
    {
      category: "Revenue",
      value: "$20.4 billion",
      trend: "down",
      details: "Down 2% YoY"
    },
    {
      category: "Net Income",
      value: "$5.1 billion",
      trend: "up",
      details: "$1.42 per diluted share"
    },
    {
      category: "Net Interest Income",
      value: "$11.7 billion",
      trend: "down",
      details: "Down 11% YoY"
    },
    {
      category: "Noninterest Income",
      value: "$8.7 billion",
      trend: "up",
      details: "Up 12% YoY"
    },
    {
      category: "Average Loans",
      value: "$910.3 billion",
      trend: "down",
      details: "Down 3% YoY"
    },
    {
      category: "Average Deposits",
      value: "$1.3 trillion",
      trend: "neutral",
      details: "Stable YoY"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Here are the relevant financial metrics based on your query:',
        metrics
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.query);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getSuggestionColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 text-green-700 hover:bg-green-100';
      case 'negative':
        return 'bg-red-50 text-red-700 hover:bg-red-100';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100';
      default:
        return 'bg-blue-50 text-blue-700 hover:bg-blue-100';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      >
        {messages.length === 0 && showSuggestions && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Suggested Questions</h2>
            <div className="grid grid-cols-1 gap-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${getSuggestionColor(suggestion.type)}`}
                >
                  <suggestion.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm text-left">{suggestion.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5 text-white" />
                )}
              </div>
              <div className={`flex flex-col space-y-2 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-lg px-4 py-2 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.metrics && (
                  <div className="w-full">
                    <QueryResult metrics={message.metrics} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-4">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
          <div className="relative rounded-lg shadow-sm bg-white border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <textarea
              ref={textareaRef}
              rows={1}
              className="block w-full resize-none rounded-lg border-0 bg-transparent py-3 px-4 pr-14 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Ask about Q3 2024 financial metrics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2">
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;