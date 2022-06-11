export type Modify<T, R> = Omit<T, keyof R> & R;

export type WithoutId<T> = Omit<T, 'id'>;

export type PartialRecord<K extends keyof never, T> = {
  [P in K]?: T;
};
