export type TList = {
  creationAt: Date;
  id: number;
  image: string;
  name: string;
  updatedAt: Date;
};


export type TState = {
    list: [] | TList[],
    isLoading: boolean,
}