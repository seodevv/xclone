interface Default {
  id: number;
  title: string;
  count: number;
}

export interface Tag extends Default {
  type: 'tag';
}

export interface Word extends Default {
  type: 'word';
  position: number;
  weight: number;
}

export type Tags = Tag | Word;
