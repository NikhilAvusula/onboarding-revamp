export const STATUS_COLORS = {
  prequalification: {
    border: '#9333ea',
    font: 'text-blue-500',
  },
  underwriting: {
    border: '#ea580c',
    font: 'text-green-500',
  },
  application: {
    border: '#2563eb',
    font: 'text-yellow-500',
  },
  onboarding: {
    border: '#991b1b',
    font: 'text-purple-500',
  },
  default: {
    border: '#777777',
    font: 'text-purple-500',
  },
};

export const getStatusColor = (status: string) => {
  const lowerStatus = status.toLowerCase();
  return STATUS_COLORS[lowerStatus as keyof typeof STATUS_COLORS] || STATUS_COLORS.default;
};