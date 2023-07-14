
export interface ItemState {
  items: any;
}

export type ItemAction =
  | { type: 'ADD_ITEM'; payload: { data: object } }
  | { type: 'VIEW_ITEM' }
  | { type: 'DELETE_ITEM'; payload: { data: object } }
  | { type: 'UPDATE_ITEM'; payload: { data: object } }


export const initialItemState: ItemState = {
  items: null,
};

export const itemReducer = (state: ItemState, action: ItemAction): ItemState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: action.payload.data,
      };
    case 'VIEW_ITEM':
      return {
        ...state,
        items: JSON.parse(localStorage.getItem("item") || '[]'),
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        items: action.payload.data,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: action.payload.data,
      };
    default:
      return state;
  }
};