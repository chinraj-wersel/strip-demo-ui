import { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/constants';
import { PageHeader } from '@/components/ui/page-header';
import { Upload } from 'lucide-react';

export const BulkImport = () => {
  const { addProperty, addLog } = useProperty();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState(null);
  const [importedProperties, setImportedProperties] = useState([]);

  const handleDownloadTemplate = () => {
    addLog("Template downloaded: property_import_template.csv");
  };

  const handleProcessImport = () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setProcessing(true);
    setError(null);
    setProgress('Validating file format...');
    addLog("Starting bulk import...");

    // Simulate processing steps
    setTimeout(() => {
      setProgress('File validated. Checking mandatory fields...');
    }, 1000);

    setTimeout(() => {
      setProgress('Mandatory fields checked. Duplicate detection...');
    }, 2000);

    setTimeout(() => {
      setProgress('No duplicates found. HMLR verification...');
    }, 3000);

    setTimeout(() => {
      const newProps = [
        {
          id: '',
          address: '15 Baker St, London, NW1 6XE',
          type: 'Single Unit',
          status: 'Active',
          units: null,
          assets: []
        },
        {
          id: '',
          address: '22 Oxford Rd, Manchester, M1 5QA',
          type: 'Single Unit',
          status: 'Active',
          units: null,
          assets: []
        }
      ];

      const imported = newProps.map(prop => addProperty(prop));
      setImportedProperties(imported);
      setProgress('complete');
      addLog("Event: BULK_IMPORT_COMPLETED. 2 properties imported.", "success");
    }, 4500);
  };

  const showError = (msg) => {
    setError(msg);
    addLog(`Simulated Error: ${msg}`, 'error');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Title and Search */}
      <PageHeader 
        icon={Upload} 
        title="Bulk Import" 
        searchPlaceholder="Search"
        showSearch={false}
      />

      <div className="px-6 py-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Upload File</h2>
        <p className="text-muted-foreground mb-6">Download the template, fill in property details, and upload for batch processing.</p>

        <button
          onClick={handleDownloadTemplate}
          className="mb-6 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-foreground"
        >
          📥 Download Template
        </button>

        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">Select File (CSV/XLSX)</label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        {processing && progress !== 'complete' && (
          <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <div className="text-blue-700 animate-pulse">⏳ {progress}</div>
          </div>
        )}

        {progress === 'complete' && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <div className="font-semibold text-green-700 mb-2">✅ Import Complete!</div>
            <p className="text-foreground mb-2">Successfully imported: <strong>2 properties</strong></p>
            <p className="text-foreground mb-4">Failed: <strong>0</strong></p>

            <h3 className="font-semibold mb-2">Imported Properties</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Address</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {importedProperties.map((prop) => (
                  <tr key={prop.id} className="border-b">
                    <td className="py-2">{prop.address}</td>
                    <td className="py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">Added</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => navigate(ROUTES.PROPERTIES)}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
            >
              View Properties
            </button>
          </div>
        )}

        <button
          onClick={handleProcessImport}
          disabled={processing}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md disabled:opacity-50"
        >
          Upload & Process
        </button>

        <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs font-bold text-gray-500 uppercase mb-2">Simulate Errors</div>
            <button
              onClick={() => showError('ERR B01: Invalid File Format')}
              className="px-2 py-1 text-xs bg-red-100 text-red-700 border border-red-300 rounded hover:bg-red-200"
            >
              Simulate B01
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

