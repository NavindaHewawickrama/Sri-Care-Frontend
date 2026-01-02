export const mockBills = [
  {
    id: '1',
    month: 'January 2026',
    amount: 2500,
    dueDate: '2026-01-15',
    status: 'Paid',
    services: ['Voice', 'Data 50GB', 'SMS Package'],
  },
  {
    id: '2',
    month: 'December 2025',
    amount: 2350,
    dueDate: '2025-12-15',
    status: 'Paid',
    services: ['Voice', 'Data 50GB', 'SMS Package'],
  },
  {
    id: '3',
    month: 'November 2025',
    amount: 2800,
    dueDate: '2025-11-15',
    status: 'Paid',
    services: ['Voice', 'Data 50GB', 'SMS Package', 'International Roaming'],
  },
];

export const mockServices = [
  {
    id: '1',
    name: 'International Roaming',
    description: 'Make calls and use data while traveling abroad',
    active: false,
    monthlyFee: 500,
    category: 'roaming',
  },
  {
    id: '2',
    name: 'Ring-in Tone Personalization',
    description: 'Customize your caller tune',
    active: true,
    monthlyFee: 50,
    category: 'vas',
  },
  {
    id: '3',
    name: 'Data Top-up 10GB',
    description: 'Add 10GB to your monthly data allowance',
    active: false,
    monthlyFee: 750,
    category: 'data',
  },
  {
    id: '4',
    name: 'Premium Voicemail',
    description: 'Extended voicemail storage and transcription',
    active: true,
    monthlyFee: 100,
    category: 'vas',
  },
  {
    id: '5',
    name: 'Family Share Plan',
    description: 'Share your data with up to 5 family members',
    active: false,
    monthlyFee: 300,
    category: 'data',
  },
  {
    id: '6',
    name: 'Spam Call Blocker',
    description: 'Automatically block spam and telemarketing calls',
    active: true,
    monthlyFee: 150,
    category: 'vas',
  },
];

export const mockNotifications = [
  {
    id: '1',
    title: 'Bill Generated',
    message: 'Your January 2026 bill of LKR 2,500 is now available',
    date: '2026-01-01',
    type: 'bill',
    read: false,
  },
  {
    id: '2',
    title: 'Payment Successful',
    message: 'Your payment of LKR 2,350 has been received',
    date: '2025-12-10',
    type: 'payment',
    read: true,
  },
  {
    id: '3',
    title: 'Data Usage Alert',
    message: 'You have used 80% of your monthly data allowance',
    date: '2025-12-20',
    type: 'usage',
    read: true,
  },
  {
    id: '4',
    title: 'Service Activated',
    message: 'Ring-in Tone Personalization has been activated',
    date: '2025-11-15',
    type: 'service',
    read: true,
  },
];

export const mockUsageData = {
  voice: {
    used: 450,
    total: 1000,
    unit: 'minutes',
  },
  data: {
    used: 35,
    total: 50,
    unit: 'GB',
  },
  sms: {
    used: 180,
    total: 500,
    unit: 'messages',
  },
};
