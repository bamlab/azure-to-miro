export interface MiroCard {
  type: 'card';
  x: number;
  y: number;
  scale?: number;
  title: string;
  description?: string;
  date?: string;
  assignee?: Assignee;
  style?: Style;
}

export interface Assignee {
  userId: string;
}

export interface Style {
  backgroundColor: string;
}
