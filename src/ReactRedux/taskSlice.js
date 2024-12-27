import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    task : [],
    cart: []
}
const taskSlice = createSlice({
    name: "taskSlice",
    initialState,
    reducers: {
        addtask: (state, {payload}) =>{
            const id = Date.now()
            const taskWithId = { ...payload, id };
            state.task.push(taskWithId);
        },
        addCart:(state,{payload}) => {
            const isExists = state.cart.find(data=> data._id === payload._id)
            if(!isExists){

                state.cart.push(payload)
            }
        },
        deleteItem: (state, {payload}) => {
            console.log(payload)
           state.task = state.task.filter(info=> info.id !== payload)
        },
        updateItem: (state,{payload}) => {
            const targetedItem = state.task.find(item => item.id == payload.id)
            console.log(targetedItem)
            if(targetedItem){
                targetedItem.name = payload.name
                targetedItem.task = payload.task

            }
        }
    },
})

export const {addtask, deleteItem,updateItem,addCart} = taskSlice.actions
export default taskSlice.reducer