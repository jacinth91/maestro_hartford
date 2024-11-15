import React from 'react';
import { Upload, MessageSquare, Settings, Home, LogOut } from 'lucide-react';

interface SidebarProps {
  onTabChange: (tab: 'chat' | 'upload') => void;
  activeTab: 'chat' | 'upload';
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onTabChange,
  activeTab,
  onLogout,
}) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', value: 'chat' as const },
    { icon: MessageSquare, label: 'Chat', value: 'chat' as const },
    { icon: Upload, label: 'Upload Files', value: 'upload' as const },
    { icon: Settings, label: 'Settings', value: 'chat' as const },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0 flex flex-col">
      <div className="p-4 flex items-center space-x-3 border-b border-gray-800">
        <img
          src="/harthfors_logo.png"
          alt="Hartford Logo"
          className="h-10 w-auto"
        />
        <span className="text-xl font-semibold">MarketMaestro</span>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onTabChange(item.value)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.value &&
                  item.label !== 'Dashboard' &&
                  item.label !== 'Settings'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-gray-800"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
