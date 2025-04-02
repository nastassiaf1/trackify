export enum CardStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  ARCHIVED = 'Archived',
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

export type ColorVariant = keyof typeof cardColors;

export interface ColorSelectorProps {
  selectedColor: ColorVariant;
  onSelect: (color: ColorVariant) => void;
}
