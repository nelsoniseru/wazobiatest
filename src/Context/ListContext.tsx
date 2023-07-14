import React, { createContext, useReducer, useEffect } from 'react';
import { itemReducer, ItemState, ItemAction, initialItemState } from '../Reducers/ListReducer';
import { useNavigate } from 'react-router-dom';
interface ListContextProps {
  state: ItemState;
  addItem: (name: string, description: string) => void;
  deleteItem: (id: number) => void;
  findItem: (id: number) => any;
  updateItem: (id: number, name: string, description: string) => any;
}

export const ListContext = createContext<ListContextProps>({
  state: initialItemState,
  addItem: () => { },
  deleteItem: () => { },
  findItem: () => { },
  updateItem: () => { },
});


type ListContextProviderType = {
  children: React.ReactNode
}
export const ListProvider = ({ children }: ListContextProviderType) => {
  const [state, dispatch] = useReducer(itemReducer, initialItemState);
  const navigate = useNavigate();
  useEffect(() => {
    let data = [
      { id: 1, name: "Item 1", description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet." },
      { id: 2, name: "Item 2", description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet." },
      { id: 3, name: "Item 3", description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet." }
    ]
    const items = JSON.parse(localStorage.getItem("item") || '[]');
    if (items.length <= 0) {
      localStorage.setItem("item", JSON.stringify(data))
    }
    dispatch({ type: 'VIEW_ITEM' });
  }, [])

  const addItem = async (name: string, description: string) => {
    try {
      const data = {
        name,
        description,
      }

      const items = JSON.parse(localStorage.getItem("item") || '[]');
      let id = items.length + 1
      let newdata = { id, ...data }
      items.push(newdata)

      localStorage.setItem("item", JSON.stringify(items))
      dispatch({ type: 'ADD_ITEM', payload: { data: items } });
      navigate('/dashboard');

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const deleteItem = async (id: number) => {

    const items = JSON.parse(localStorage.getItem("item") || '[]');
    let findById = items.find((e: any) => e.id == id)
    if (findById) {
      let newItems = items.filter((e: any) => e.id !== id)
      localStorage.setItem("item", JSON.stringify(newItems))
      dispatch({ type: 'DELETE_ITEM', payload: { data: newItems } });
    }
  }
  const findItem = async (id: number) => {
    const items = JSON.parse(localStorage.getItem("item") || '[]');
    let findById = items.find((e: any) => e.id == id)
    if (findById) {
      return findById
    }
  }

  const updateItem = async (id: number, name: string, description: string) => {
    const items = JSON.parse(localStorage.getItem("item") || '[]');
    let findById = items.find((e: any) => e.id == id)
    if (findById) {
      findById.name = name
      findById.description = description
      localStorage.setItem("item", JSON.stringify(items))
      dispatch({ type: 'UPDATE_ITEM', payload: { data: items } });

    }
  }
  return (
    <ListContext.Provider value={{ state, addItem, deleteItem, findItem, updateItem }}>
      {children}
    </ListContext.Provider>
  );
};