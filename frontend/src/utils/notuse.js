// const initialValue = {
//     cartList: [],
//     favouriteList: [],
// };

// const productReducer = (state, action) => {
//     if (action.type === 'ADD_TO_CART') {
//         if (state.cartList.some((product) => product.id === action.payload)) {
//             const indexExistProduct = state.cartList.findIndex(
//                 (product) => product.id === action.payload
//             );
//             const updatedCartList = [...state.cartList];
//             updatedCartList[indexExistProduct].quantity += 1;
//             return {
//                 ...state,
//                 cartList: [...updatedCartList],
//             };
//         }
//         return {
//             ...state,
//             cartList: [...state.cartList, { id: action.payload, quantity: 1 }],
//         };
//     }
//     if (action.type === 'TOGGLE_FAVOURITE') {
//         if (state.favouriteList.includes(action.payload)) {
//             state.favouriteList = state.favouriteList.filter(
//                 (id) => id != action.payload
//             );
//             return {
//                 ...state,
//             };
//         }
//         return {
//             ...state,
//             favouriteList: [...state.favouriteList, action.payload],
//         };
//     }
// };

// const [product, dispatch] = useReducer(productReducer, initialValue);

// const handleAddToCart = (e) => {
//     e.preventDefault();
//     const buttonEle = e.target.closest('button');

//     dispatch({
//         type: 'ADD_TO_CART',
//         payload: buttonEle.dataset.productId,
//     });
// };

// const handleToggleFavourite = (e) => {
//     e.preventDefault();
//     const buttonEle = e.target.closest('button');

//     dispatch({
//         type: 'TOGGLE_FAVOURITE',
//         payload: buttonEle.dataset.productId,
//     });
// };

// const handleQuickViewProduct = (e) => {
//     e.preventDefault();
// };
