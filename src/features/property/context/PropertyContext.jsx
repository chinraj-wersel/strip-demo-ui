import { createContext, useContext, useState, useCallback } from 'react';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([
    {
      id: 'P001',
      address: '123 High Street, London, SW1A 1AA',
      type: 'Single Unit',
      status: 'Active',
      units: null,
      assets: [
        { name: 'Gas Boiler', make: 'Worcester', expiry: '2025-12-01', status: 'Valid' },
        { name: 'Smoke Alarm', make: 'FireAngel', expiry: '2024-06-15', status: 'Valid' }
      ]
    },
    {
      id: 'P002',
      address: '456 Queen Road, Manchester, M1 1AA',
      type: 'Multi Unit (5 Units)',
      status: 'Active',
      units: [
        { id: 'U1', floor: 1, bedrooms: 2, status: 'Occupied' },
        { id: 'U2', floor: 1, bedrooms: 1, status: 'Available' },
        { id: 'U3', floor: 2, bedrooms: 2, status: 'Occupied' },
        { id: 'U4', floor: 2, bedrooms: 1, status: 'Occupied' },
        { id: 'U5', floor: 3, bedrooms: 2, status: 'Available' }
      ],
      assets: [
        { name: 'Fire Alarm System', make: 'Advanced', expiry: '2023-11-20', status: 'Expired' },
        { name: 'Emergency Lighting', make: 'Eaton', expiry: '2024-01-10', status: 'Expiring Soon' }
      ]
    },
    {
      id: 'P003',
      address: '789 King Avenue, Birmingham, B1 1AA',
      type: 'Single Unit',
      status: 'Maintenance',
      units: null,
      assets: [
        { name: 'Gas Boiler', make: 'Vaillant', expiry: '2025-05-20', status: 'Valid' }
      ]
    },
    {
      id: 'P004',
      address: '22 Baker Street, London, NW1 6XE',
      type: 'Single Unit',
      status: 'Active',
      units: null,
      assets: [
        { name: 'Gas Boiler', make: 'Baxi', expiry: '2026-03-15', status: 'Valid' },
        { name: 'Carbon Monoxide Detector', make: 'Kidde', expiry: '2025-08-20', status: 'Valid' }
      ]
    },
    {
      id: 'P005',
      address: '15 Oxford Street, Leeds, LS1 3AY',
      type: 'Multi Unit',
      status: 'Active',
      units: [
        { id: 'U1', floor: 1, bedrooms: 3, status: 'Occupied' },
        { id: 'U2', floor: 1, bedrooms: 2, status: 'Occupied' },
        { id: 'U3', floor: 2, bedrooms: 3, status: 'Available' }
      ],
      assets: [
        { name: 'Fire Alarm System', make: 'Honeywell', expiry: '2025-09-10', status: 'Valid' },
        { name: 'Emergency Lighting', make: 'Eaton', expiry: '2025-07-22', status: 'Valid' }
      ]
    },
    {
      id: 'P006',
      address: '88 Victoria Road, Glasgow, G42 8YZ',
      type: 'Commercial',
      status: 'Active',
      units: null,
      assets: [
        { name: 'Fire Suppression System', make: 'Tyco', expiry: '2025-11-30', status: 'Valid' },
        { name: 'HVAC System', make: 'Daikin', expiry: '2026-02-14', status: 'Valid' }
      ]
    },
    {
      id: 'P007',
      address: '33 Castle Street, Edinburgh, EH2 3DN',
      type: 'Single Unit',
      status: 'Suspended',
      suspendReason: 'Tenant Dispute',
      suspendComments: 'Legal proceedings in progress',
      units: null,
      assets: [
        { name: 'Gas Boiler', make: 'Ideal', expiry: '2024-12-01', status: 'Expiring Soon' }
      ]
    },
    {
      id: 'P008',
      address: '101 Marine Drive, Brighton, BN2 1WB',
      type: 'Multi Unit',
      status: 'Active',
      units: [
        { id: 'U1', floor: 1, bedrooms: 2, status: 'Occupied' },
        { id: 'U2', floor: 2, bedrooms: 2, status: 'Occupied' },
        { id: 'U3', floor: 3, bedrooms: 1, status: 'Occupied' },
        { id: 'U4', floor: 3, bedrooms: 1, status: 'Available' }
      ],
      assets: [
        { name: 'Fire Alarm System', make: 'Apollo', expiry: '2025-06-18', status: 'Valid' },
        { name: 'Lift Maintenance', make: 'Otis', expiry: '2025-04-05', status: 'Valid' }
      ]
    },
    {
      id: 'P009',
      address: '47 Park Lane, Bristol, BS1 5AH',
      type: 'Single Unit',
      status: 'Active',
      units: null,
      assets: [
        { name: 'Gas Boiler', make: 'Glow-worm', expiry: '2025-10-12', status: 'Valid' },
        { name: 'Smoke Alarm', make: 'Nest', expiry: '2026-01-25', status: 'Valid' }
      ]
    },
    {
      id: 'P010',
      address: '56 Riverside Way, Cardiff, CF10 4UW',
      type: 'Commercial',
      status: 'Pending',
      units: null,
      assets: [
        { name: 'Fire Extinguisher', make: 'Chubb', expiry: '2024-08-30', status: 'Expired' },
        { name: 'Security System', make: 'ADT', expiry: '2025-12-20', status: 'Valid' }
      ]
    }
  ]);

  const [logs, setLogs] = useState([]);

  const addProperty = useCallback((property) => {
    const newProperty = {
      ...property,
      id: 'P' + (portfolio.length + 1).toString().padStart(3, '0')
    };
    setPortfolio(prev => [...prev, newProperty]);
    addLog(`Property ${newProperty.address} added. Event: PROPERTY_CREATED`, 'success');
    return newProperty;
  }, [portfolio.length]);

  const updateProperty = useCallback((id, updates) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const suspendProperty = useCallback((id, reason, comments) => {
    updateProperty(id, { status: 'Suspended', suspendReason: reason, suspendComments: comments });
    addLog(`Property ${id} suspended. Event: PROPERTY_STATUS_CHANGED`, 'success');
  }, [updateProperty]);

  const reinstateProperty = useCallback((id) => {
    updateProperty(id, { status: 'Active' });
    addLog(`Property ${id} reinstated. Event: PROPERTY_STATUS_CHANGED`, 'success');
  }, [updateProperty]);

  const addLog = useCallback((message, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, message, type, id: Date.now() }]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const value = {
    portfolio,
    setPortfolio,
    addProperty,
    updateProperty,
    suspendProperty,
    reinstateProperty,
    logs,
    addLog,
    clearLogs
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

