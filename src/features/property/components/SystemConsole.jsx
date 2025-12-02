import { useState } from 'react';
import { useProperty } from '../context/PropertyContext';

export const SystemConsole = () => {
  const { logs, clearLogs } = useProperty();
  const [isOpen, setIsOpen] = useState(false);

  const getLogColor = (type) => {
    const colors = {
      'success': 'text-green-500',
      'error': 'text-red-500',
      'info': 'text-gray-300'
    };
    return colors[type] || colors.info;
  };

  return (
    <>
      {/* Toggle Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center shadow-2xl z-40 transition-all"
        title="System Log"
      >
        <svg
          className="w-6 h-6 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {logs.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {logs.length}
          </span>
        )}
      </button> */}

      {/* Console Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-96 h-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 flex flex-col">
          <div className="flex justify-between items-center border-b border-gray-700 p-4">
            <span className="text-sm font-bold text-gray-300 uppercase">System Log</span>
            <div className="flex items-center gap-3">
              <button
                onClick={clearLogs}
                className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-xs">
            {logs.map((log) => (
              <div key={log.id} className="border-b border-gray-800 pb-1">
                <span className="text-gray-500">[{log.time}]</span>{' '}
                <span className={getLogColor(log.type)}>{log.message}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-gray-500 text-xs">No logs yet...</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

