import { PageHeader } from '@/components/ui/page-header';
import { Bell } from 'lucide-react';

export const AlertsCenter = () => {
  return (
    <div className="min-h-screen bg-card">
      {/* Header with Title and Search */}
      <PageHeader 
        icon={Bell} 
        title="Alerts Center" 
        showSearch={false}
      />

      <div className="px-6 py-6">

      <div className="space-y-4">
        <div className="bg-card rounded-xl p-6 border-l-4 border-red-500 border border-border shadow-sm">
          <div className="font-semibold text-red-700 mb-2 flex items-center gap-2">
            🔴 Certificate Expired
          </div>
          <div className="text-foreground mb-4">Fire Alarm System at 456 Queen Road has expired!</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm">
              Book Engineer
            </button>
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm">
              Upload New Cert
            </button>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border-l-4 border-yellow-500 border border-border shadow-sm">
          <div className="font-semibold text-yellow-700 mb-2 flex items-center gap-2">
            ⚠️ Certificate Expiring
          </div>
          <div className="text-foreground mb-4">Emergency Lighting at 456 Queen Road expires in 45 days.</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm">
              Snooze
            </button>
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm">
              Action
            </button>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border-l-4 border-yellow-500 border border-border shadow-sm">
          <div className="font-semibold text-yellow-700 mb-2 flex items-center gap-2">
            ⚠️ Rent Overdue
          </div>
          <div className="text-foreground">Tenant at 789 King Avenue is 5 days late.</div>
        </div>
      </div>
      </div>
    </div>
  );
};

