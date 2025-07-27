export type FirstArgument<T> = T extends (...args: any[]) => any
  ? Parameters<T>[0]
  : never;
