export const PropertyModal = ({ property, onClose }) => {
  const getStatusBadge = (status) => {
    const badges = {
      'Active': 'bg-green-100 text-green-800',
      'Suspended': 'bg-yellow-300 text-yellow-900',
      'Maintenance': 'bg-yellow-100 text-yellow-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">{property.address}</h2>
        
        <div className="space-y-3 mb-6">
          <p><strong>Type:</strong> {property.type}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(property.status)}`}>
              {property.status}
            </span>
          </p>
        </div>

        {property.units && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Units</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {property.units.map((unit) => (
                <div key={unit.id} className="bg-gray-100 border border-gray-200 rounded-lg p-3 text-center">
                  <div className="font-semibold mb-1">{unit.id}</div>
                  <div className="text-xs text-gray-600">
                    Floor {unit.floor} • {unit.bedrooms} bed
                  </div>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
                    unit.status === 'Occupied' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {unit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-3">Assets</h3>
          <ul className="space-y-2">
            {property.assets.map((asset, index) => (
              <li key={index} className="text-gray-700">
                {asset.name} ({asset.make}) - {asset.status}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

