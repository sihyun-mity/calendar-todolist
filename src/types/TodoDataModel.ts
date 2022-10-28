export interface TodoDataModel {
  [props: string]: TodoItemModel[];
}

export type TodoItemModel = {
  time: string;
  value: string;
};
