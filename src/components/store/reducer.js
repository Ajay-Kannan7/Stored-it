let initialState={
    homeData:null,
    cartData:[],
    productAdded:[],
    cartProducts:0
}

let reducerMethod=(state=initialState,action)=>{
    if(action.type==="LOADDATA"){
        return{
            ...state,
            homeData:action.payload
        }
    }
    if(action.type==="CARTQUANTITY"){
        let total=state.cartProducts
        return{
            ...state,
            cartProducts:parseInt(total)+parseInt(action.payload)
        }
    }
    return{
        ...state
    }
}

export default reducerMethod