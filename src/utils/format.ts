export const formatAddress = (address: string, chars = 4): string => {
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};

export const formatCelo = (amount: string, decimals = 4): string => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '0';
  if (num === 0) return '0';
  if (num < 0.0001) return '< 0.0001';
  return num.toFixed(decimals).replace(/\.?0+$/, '');
};

export const formatNumber = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
};

export const formatDate = (timestamp: number): string => {
  if (!timestamp) return 'Unknown';
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const formatPercent = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};
