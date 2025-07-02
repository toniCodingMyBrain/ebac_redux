import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/carrinho'

const store = configureStore({
  reducer: {
    carrinho: cartReducer
  }
})

export default store

//* Tipagem do rootreducer inferindo a função returntype para descobrir automaticamente.
export type RootReducer = ReturnType<typeof store.getState>
