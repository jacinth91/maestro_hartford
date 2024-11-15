import React, { useState } from 'react';
import { X, Loader2, FileText, Check, TrendingUp, TrendingDown, AlertTriangle, LineChart } from 'lucide-react';

interface FileStatus {
  name: string;
  size: string;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface SummaryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileStatus[];
}

interface Suggestion {
  icon: React.ElementType;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
}

const SummaryDialog: React.FC<SummaryDialogProps> = ({ isOpen, onClose, files }) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const staticFiles = [
    {
      name: 'q3-2024-earnings-report.pdf',
      size: '2.8 MB',
      status: 'completed' as const
    },
    {
      name: 'market-trend-analysis-2024.pdf',
      size: '3.2 MB',
      status: 'completed' as const
    },
    {
      name: 'competitor-performance-q3.pdf',
      size: '2.5 MB',
      status: 'completed' as const
    },
    {
      name: 'industry-outlook-2024.pdf',
      size: '4.1 MB',
      status: 'completed' as const
    },
    {
      name: 'risk-assessment-q3-2024.pdf',
      size: '1.9 MB',
      status: 'completed' as const
    }
  ];

  const suggestions: Suggestion[] = [
    {
      icon: TrendingUp,
      title: 'Strong Noninterest Income Growth',
      description: 'Noninterest income up 12% YoY indicates successful fee-based revenue diversification',
      type: 'positive'
    },
    {
      icon: TrendingDown,
      title: 'Net Interest Income Pressure',
      description: 'Consider strategies to mitigate 11% YoY decline in net interest income',
      type: 'negative'
    },
    {
      icon: AlertTriangle,
      title: 'Credit Quality Watch',
      description: 'Monitor CRE exposure given increased net charge-offs',
      type: 'warning'
    },
    {
      icon: LineChart,
      title: 'Capital Position',
      description: 'Strong CET1 ratio at 11.3% provides flexibility for growth initiatives',
      type: 'neutral'
    }
  ];

  const allFiles = [...files, ...staticFiles];

  const handleSummarize = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setIsSummarizing(false);
      setShowResults(true);
    }, 2000);
  };

  const getSuggestionColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'negative':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getIconColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  if (showResults) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

          <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-center text-gray-900 mb-4">
                Files Summarized Successfully
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getSuggestionColor(suggestion.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <suggestion.icon className={`h-5 w-5 mt-0.5 ${getIconColor(suggestion.type)}`} />
                      <div>
                        <h4 className="font-medium mb-1">{suggestion.title}</h4>
                        <p className="text-sm opacity-90">{suggestion.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 mb-2">Processed Files</h4>
                {allFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{file.name}</span>
                    <span className="flex-shrink-0 ml-auto">
                      <Check className="h-4 w-4 text-green-500" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          {isSummarizing ? (
            <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Summarizing Files</h3>
              <p className="text-sm text-gray-500">Please wait while we process your documents...</p>
            </div>
          ) : (
            <>
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="px-6 pt-6 pb-4">
                <h3 className="text-lg font-medium text-gray-900">File Summary</h3>
                <div className="mt-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allFiles.map((file, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {file.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {file.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              file.status === 'completed' 
                                ? 'bg-green-100 text-green-800'
                                : file.status === 'error'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 flex justify-end">
                <button
                  type="button"
                  onClick={handleSummarize}
                  disabled={isSummarizing || allFiles.some(f => f.status === 'uploading')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSummarizing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    'Summarize Files'
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryDialog;