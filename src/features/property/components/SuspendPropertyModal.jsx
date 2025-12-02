import { useState } from 'react';

export const SuspendPropertyModal = ({ propertyId, onConfirm, onClose }) => {
  const [reason, setReason] = useState('Maintenance Required');
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    onConfirm(reason, comments);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">Suspend Property</h2>
        <p className="text-gray-600 mb-6">This will prevent new tenancies and flag the property for review.</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Maintenance Required</option>
            <option>Legal Issue</option>
            <option>Owner Request</option>
            <option>Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Additional details..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
          >
            Confirm Suspension
          </button>
        </div>
      </div>
    </div>
  );
};

