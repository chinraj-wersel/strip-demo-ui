import { Search } from 'lucide-react';

export const PageHeader = ({
  icon: Icon,
  title,
  searchPlaceholder = "Search",
  onSearchChange,
  searchValue,
  showSearch = true,
  rightContent
}) => {
  return (
    <div className="px-12 py-1 bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
          <h1 className="text-lg font-medium text-foreground" style={{ fontSize: '1rem' }}>
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-10 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  style={{ fontSize: '0.875rem' }}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          )}
          {rightContent}
        </div>
      </div>
    </div>
  );
};
