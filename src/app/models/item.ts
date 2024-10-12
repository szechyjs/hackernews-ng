interface Base {
  by: string;
  id: number;
  dead?: boolean;
  deleted?: boolean;
  time: number;
}

export interface Story extends Base {
  descendants?: number;
  kids: number[];
  score: number;
  title: string;
  type: 'story';
  url: string;
}

export interface Comment extends Base {
  kids: number[];
  parent: number;
  text: string;
  type: 'comment';
}

export interface Ask extends Base {
  descendants?: number;
  kids: number[];
  score: number;
  text: string;
  title: string;
  type: 'story';
}

export interface Job extends Base {
  score: number;
  text: string;
  title: string;
  type: 'job';
  url: string;
}

export type Item = Story | Comment | Ask | Job;
