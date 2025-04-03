export const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'custom', label: 'Custom (every X days)' },
] as const;

export enum HabitStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export const cardColors = {
  variant1: '#ffffff',
  variant2: '#ffc9d2',
  variant3: '#e1c9ff',
  variant4: '#c9cdff',
  variant5: '#c9ecff',
  variant6: '#c9ffdc',
  variant7: '#fdffc9',
  variant8: '#ffc9c9',
} as const;
