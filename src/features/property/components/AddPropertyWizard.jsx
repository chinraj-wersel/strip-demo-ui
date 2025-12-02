import { useState, useEffect } from 'react';
import { useProperty } from '../context/PropertyContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '@/app/constants';
import { PageHeader } from '@/components/ui/page-header';
import { PlusCircle, ChevronLeft } from 'lucide-react';

const ONBOARDING_STEPS = [
  { id: 'postcode', title: 'Location' },
  { id: 'address', title: 'Address' },
  { id: 'ownership', title: 'Ownership' },
  { id: 'details', title: 'Details' },
  { id: 'assets', title: 'Assets' },
  { id: 'compliance', title: 'Compliance' },
  { id: 'review', title: 'Review' }
];

// UK Postcode Validation Function
const validateUKPostcode = (postcode) => {
  if (!postcode || postcode.trim() === '') {
    return { valid: false, error: 'Postcode is required' };
  }

  // Remove spaces and convert to uppercase for validation
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
  
  // UK Postcode regex pattern
  // Format: 1-2 letters, 1-2 digits, optional space, 1 digit, 2 letters
  // Examples: SW1A1AA, M11AA, EC1A1BB, W1A0AX, B338TH
  const ukPostcodePattern = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[0-9][A-Z]{2}$/;
  
  if (!ukPostcodePattern.test(cleaned)) {
    return { 
      valid: false, 
      error: 'ERR P01: Invalid Postcode - Please enter a valid UK postcode format (e.g., SW1A 1AA, M1 1AA)' 
    };
  }

  return { valid: true, error: null };
};

export const AddPropertyWizard = () => {
  const { portfolio, addProperty, updateProperty, addLog } = useProperty();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editPropertyId = searchParams.get('edit');
  const isEditMode = !!editPropertyId;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [property, setProperty] = useState({
    postcode: '',
    address: '',
    type: 'Single Unit',
    assets: [],
    status: 'Pending',
    units: null,
    ownershipResolved: false,
    landlord: ''
  });
  const [originalProperty, setOriginalProperty] = useState(null);
  const [error, setError] = useState(null);
  const [postcodeError, setPostcodeError] = useState(null);
  const [floors, setFloors] = useState(2);
  const [unitsPerFloor, setUnitsPerFloor] = useState(2);
  const [previewUnits, setPreviewUnits] = useState([]);

  // Load property data in edit mode
  useEffect(() => {
    if (isEditMode && editPropertyId) {
      const existingProperty = portfolio.find(p => p.id === editPropertyId);
      if (existingProperty) {
        setOriginalProperty({ ...existingProperty });
        setProperty({
          postcode: existingProperty.postcode || '',
          address: existingProperty.address || '',
          type: existingProperty.type || 'Single Unit',
          assets: existingProperty.assets || [],
          status: existingProperty.status || 'Pending',
          units: existingProperty.units || null,
          ownershipResolved: existingProperty.ownershipResolved || false,
          landlord: existingProperty.landlord || ''
        });
        if (existingProperty.units && existingProperty.units.length > 0) {
          setPreviewUnits(existingProperty.units);
        }
      }
    }
  }, [isEditMode, editPropertyId, portfolio]);

  const step = ONBOARDING_STEPS[currentStep];

  const handleNext = () => {
    setError(null);
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setError(null);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Real-time postcode validation
  const handlePostcodeChange = (value) => {
    setProperty({ ...property, postcode: value });
    
    // Clear error when field is cleared
    if (value.trim() === '') {
      setPostcodeError(null);
      return;
    }

    // Real-time validation
    const validation = validateUKPostcode(value);
    if (!validation.valid) {
      setPostcodeError(validation.error);
    } else {
      setPostcodeError(null);
    }
  };

  const handlePostcode = () => {
    const pc = property.postcode.trim();
    
    // Check if empty
    if (!pc) {
      const errorMsg = 'ERR P01: Invalid Postcode - Postcode is required';
      setError(errorMsg);
      setPostcodeError(errorMsg);
      addLog(`Error: ${errorMsg}`, 'error');
      return;
    }

    // Validate UK postcode format
    const validation = validateUKPostcode(pc);
    if (!validation.valid) {
      setError(validation.error);
      setPostcodeError(validation.error);
      addLog(`Error: ${validation.error}`, 'error');
      return;
    }

    // Clear errors if valid
    setError(null);
    setPostcodeError(null);
    addLog(`Valid UK postcode entered: ${pc}`, 'success');
    handleNext();
  };

  const handleAddress = (addr) => {
    setProperty({ ...property, address: addr });
    handleNext();
  };

  const handleOwnershipMismatch = () => {
    setError('Ownership Mismatch - Please upload proof');
  };

  const handleResolveOwnership = () => {
    setProperty({ ...property, ownershipResolved: true });
    setError(null);
  };

  const generatePreviewUnits = () => {
    const units = [];
    for (let f = 1; f <= floors; f++) {
      for (let u = 1; u <= unitsPerFloor; u++) {
        units.push({ id: `U${units.length + 1}`, floor: f, bedrooms: 1, status: 'Available' });
      }
    }
    setPreviewUnits(units);
    setProperty(prev => ({ ...prev, units }));
  };

  const toggleUnitFields = () => {
    if (property.type === 'Multi Unit') {
      generatePreviewUnits();
    } else {
      setProperty(prev => ({ ...prev, units: null }));
      setPreviewUnits([]);
    }
  };

  const handleSaveDetails = () => {
    if (property.type === 'Multi Unit' && previewUnits.length === 0) {
      generatePreviewUnits();
    }
    handleNext();
  };

  const handleComplete = () => {
    if (isEditMode && editPropertyId) {
      // Edit mode: Check if landlord changed
      const landlordChanged = originalProperty && 
        originalProperty.landlord !== property.landlord;
      
      const updates = {
        ...property,
        assets: property.assets.length > 0 ? property.assets : [
          { name: 'Gas Boiler', make: 'Generic', expiry: '2026-01-01', status: 'Valid' }
        ]
      };

      // If landlord changed, set status to Pending for verification
      if (landlordChanged) {
        updates.status = 'Pending';
        addLog(`Property ${editPropertyId} landlord changed. Status set to Pending for verification.`, 'info');
      }

      updateProperty(editPropertyId, updates);
      addLog(`Property ${editPropertyId} updated successfully.`, 'success');
      navigate(ROUTES.PROPERTIES);
    } else {
      // Add mode
      const newProperty = {
        ...property,
        status: 'Active',
        assets: property.assets.length > 0 ? property.assets : [
          { name: 'Gas Boiler', make: 'Generic', expiry: '2026-01-01', status: 'Valid' }
        ]
      };
      addProperty(newProperty);
      navigate(ROUTES.PROPERTIES);
    }
  };

  const renderStepContent = () => {
    switch (step.id) {
      case 'postcode':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">📍 Location</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Postcode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={property.postcode}
                onChange={(e) => handlePostcodeChange(e.target.value)}
                onBlur={(e) => {
                  // Validate on blur as well
                  if (e.target.value.trim()) {
                    const validation = validateUKPostcode(e.target.value);
                    if (!validation.valid) {
                      setPostcodeError(validation.error);
                    } else {
                      setPostcodeError(null);
                    }
                  }
                }}
                placeholder="e.g. SW1A 1AA, M1 1AA"
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors bg-background text-foreground ${
                  postcodeError 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500' 
                    : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/40'
                }`}
                style={{ fontSize: '0.875rem' }}
              />
              {/* Error Message */}
              {postcodeError && (
                <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span>❌</span>
                  <span>{postcodeError}</span>
                </div>
              )}
              {/* Success Message */}
              {!postcodeError && property.postcode.trim() && (
                <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  <span>✅</span>
                  <span>Valid UK postcode format</span>
                </div>
              )}
            </div>
            <button
              onClick={handlePostcode}
              disabled={!!postcodeError || !property.postcode.trim()}
              className={`px-6 py-2 rounded-lg transition-colors ${
                postcodeError || !property.postcode.trim()
                  ? 'bg-muted-foreground/50 cursor-not-allowed text-muted'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
            >
              Find Address
            </button>
          </div>
        );

      case 'address':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Select Address</h2>
            <div className="space-y-2 mb-6">
              <div
                onClick={() => handleAddress(`10 Downing St, London, ${property.postcode}`)}
                className="p-4 border-b border-border cursor-pointer hover:bg-muted rounded"
              >
                10 Downing St, London, {property.postcode}
              </div>
              <div
                onClick={() => handleAddress(`11 Downing St, London, ${property.postcode}`)}
                className="p-4 border-b border-border cursor-pointer hover:bg-muted rounded"
              >
                11 Downing St, London, {property.postcode}
              </div>
            </div>
            <button
              onClick={handlePrevious}
              className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          </div>
        );

      case 'ownership':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">🔐 Ownership Check</h2>
            
            {/* Landlord Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Landlord <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={property.landlord}
                onChange={(e) => setProperty({ ...property, landlord: e.target.value })}
                placeholder="Enter landlord name"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                style={{ fontSize: '0.875rem' }}
              />
            </div>

            {!property.ownershipResolved && !error ? (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 rounded">
                <div className="font-semibold text-green-700 dark:text-green-400 mb-1">✅ Verified</div>
                <div className="text-foreground">HMLR Match Confirmed.</div>
              </div>
            ) : error ? (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded">
                <div className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Ownership Mismatch</div>
                <p className="text-foreground mb-2"><strong>HMLR Record:</strong> John Smith</p>
                <p className="text-foreground mb-4"><strong>Your Account:</strong> Jane Doe</p>
                <div className="space-y-2">
                  <input type="file" accept=".pdf,.jpg,.png" className="text-sm text-foreground" />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setError('ERR F01: Invalid File Format')}
                      className="px-3 py-1 bg-muted hover:bg-muted/80 text-foreground rounded text-sm"
                    >
                      Upload Invalid
                    </button>
                    <button
                      onClick={handleResolveOwnership}
                      className="px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded text-sm"
                    >
                      Upload Proof
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 rounded">
                <div className="font-semibold text-green-700 dark:text-green-400 mb-1">✅ Ownership Verified (Override Approved)</div>
              </div>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'details':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                <select
                  value={property.type}
                  onChange={(e) => {
                    setProperty({ ...property, type: e.target.value });
                    if (e.target.value === 'Multi Unit') {
                      setTimeout(toggleUnitFields, 0);
                    } else {
                      setProperty(prev => ({ ...prev, units: null }));
                      setPreviewUnits([]);
                    }
                  }}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                >
                  <option>Single Unit</option>
                  <option>Multi Unit</option>
                </select>
            </div>

            {property.type === 'Multi Unit' && (
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Number of Floors</label>
                  <input
                    type="number"
                    value={floors}
                    onChange={(e) => {
                      setFloors(parseInt(e.target.value));
                      generatePreviewUnits();
                    }}
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Units per Floor</label>
                  <input
                    type="number"
                    value={unitsPerFloor}
                    onChange={(e) => {
                      setUnitsPerFloor(parseInt(e.target.value));
                      generatePreviewUnits();
                    }}
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
                {previewUnits.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Preview: {previewUnits.length} Units</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {previewUnits.map((unit) => (
                        <div key={unit.id} className="bg-muted border border-border rounded p-2 text-center text-sm">
                          <div className="font-semibold">{unit.id}</div>
                          <div className="text-xs text-muted-foreground">Floor {unit.floor} • {unit.bedrooms} bed</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleSaveDetails}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Save & Continue
              </button>
            </div>
          </div>
        );

      case 'assets':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">📦 Assets</h2>
            <p className="text-muted-foreground mb-4">Auto-detected: Gas Boiler, Smoke Alarm</p>
            {property.type === 'Multi Unit' && (
              <p className="text-yellow-600 mb-4">⚠️ Communal assets: Fire Alarm System</p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={() => {
                  setProperty({
                    ...property,
                    assets: [{ name: 'Gas Boiler', make: 'Generic', expiry: '2026-01-01', status: 'Valid' }]
                  });
                  handleNext();
                }}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Confirm Assets
              </button>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">✅ Compliance</h2>
            <p className="text-muted-foreground mb-4">All documents uploaded.</p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Finish
              </button>
            </div>
          </div>
        );

      case 'review':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Review & {isEditMode ? 'Save Changes' : 'Activate'}</h2>
            <p className="text-muted-foreground mb-2">
              {isEditMode ? 'Ready to update' : 'Ready to add'} <strong>{property.address}</strong> {isEditMode ? 'in' : 'to'} portfolio.
            </p>
            <p className="text-muted-foreground mb-2">Type: <strong>{property.type}</strong></p>
            {property.landlord && (
              <p className="text-muted-foreground mb-2">Landlord: <strong>{property.landlord}</strong></p>
            )}
            {property.units && (
              <p className="text-muted-foreground mb-4">Units: <strong>{property.units.length}</strong></p>
            )}
            {isEditMode && originalProperty && originalProperty.landlord !== property.landlord && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  ⚠️ <strong>Note:</strong> Landlord has been changed. Status will be set to "Pending" for verification.
                </p>
              </div>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                {isEditMode ? '💾 Save Changes' : '🚀 Activate Property'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Title and Search */}
      <PageHeader 
        icon={PlusCircle} 
        title="Add New Property" 
        searchPlaceholder="Search"
        showSearch={false}
      />

      <div className="px-6 py-6">
        {/* Progress Bar */}
      <div className="bg-muted p-4 rounded-xl mb-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {ONBOARDING_STEPS.map((s, index) => (
            <div
              key={s.id}
              className={`flex items-center ${index === currentStep ? 'text-primary' : index < currentStep ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground opacity-50'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index < currentStep
                    ? 'bg-green-600 text-white'
                    : index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted-foreground/30 text-muted-foreground'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="ml-2 whitespace-nowrap">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
        <div className="bg-card rounded-xl p-8 border border-border shadow-sm max-w-3xl">
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded">
              <div className="font-semibold text-red-700 dark:text-red-400 mb-1">❌ Error</div>
              <div className="text-foreground">{error}</div>
            </div>
          )}
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

