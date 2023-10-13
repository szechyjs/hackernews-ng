export interface Item {
  id: number;
  dead?: boolean;
  deleted?: boolean;
  descendants?: number;
  by: string;
  kids: number[];
  title: string;
  score: number;
  text?: string;
  time: number;
  type: 'story' | 'job' | 'comment' | 'poll' | 'pollopt';
  url: string;
}
