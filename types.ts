export enum DropItemType {
  LOGIC = 'LOGIC',
  DEMAND = 'DEMAND',
  HAIR = 'HAIR',
  LOVE = 'LOVE'
}

export interface DropConfig {
  emoji: string;
  count: number;
}

export interface DropItemConfig {
  type: DropItemType;
  label: string;
  color: string;
  shadowColor: string; // For the 3D button effect
  message: string;
  soundType: 'coin' | 'heavy' | 'bounce';
  drops: DropConfig[];
}

export interface SectionProps {
  id: string;
}