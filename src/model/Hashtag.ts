export interface HashTags {
  id: number;
  type: 'tag' | 'word';
  title: string;
  count: number;
  weight: number;
}
