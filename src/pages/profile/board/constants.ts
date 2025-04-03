import { ColorVariant } from 'src/api/interfaces';

export interface ColorSelectorProps {
  selectedColor: ColorVariant;
  onSelect: (color: ColorVariant) => void;
}
