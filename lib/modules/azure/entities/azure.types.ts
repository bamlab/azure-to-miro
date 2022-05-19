export interface WorkItem {
  WorkItemId: number;
  WorkItemType: WorkItemType;
  State: 'New' | 'Done';
  Title: string;
  Effort: number | null;
  RemainingWork: number | null;
}

export interface Feature extends WorkItem {
  Children: WorkItem[];
}

export enum WorkItemType {
  Feature = 'Feature',
  ProductBacklogItem = 'Product Backlog Item',
  Task = 'Task',
  Bug = 'Bug',
}
