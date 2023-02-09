import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/authContext"
import { CartContext } from "../../Context/cartContext"
import { cartServices } from "../../Services/cartServices"
import { useEffectOnce, useOutsideClick } from "../../Utils/hooks"

import './styles.scss'

const CartModal = ({toggle}) => {
    const navigate = useNavigate()
    const [isAddProduct, setIsAddProduct] = useContext(CartContext)
    const [products, setProducts] = useState([])

    const handleClickOutside = () => {
        toggle()
      }

    const ref = useOutsideClick(handleClickOutside)

    const [ authState ] = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        navigate('/cart')
    }

    const total = products.length ?
        products.map(item => item.products.price * item.quantity).reduce((prev, curr) => prev + curr, 0)
        : 0

    const getProducts = useCallback(() => {
        if(authState.id && authState.role === 'user') {
            let isSubscribed = true;
    
            const fetchData = async () => {
                const data = await cartServices.getProductsInCart({userId: authState.id})
                const json = await data.data.products
    
                if (isSubscribed) {
                    setProducts(json)
                }
            }
        
            fetchData().catch(err=> console.error(err))
            return () => isSubscribed = false
        }
      }, [authState.id, authState.role])

    useEffectOnce(() => {
        getProducts()
        setIsAddProduct(false)
    }, [getProducts, setIsAddProduct])

    useEffect(() => {
        isAddProduct && getProducts()
    }, [isAddProduct, getProducts])

    return(
        <div className='dropdown-menu' ref={ref}>
            <ul>
                { (products?.length && authState.signedIn) ?
                    products.map((item, i) => {
                        return (
                            <li key={`${i}-${item.id}`} className='cart-item'>
                                <div className='product-name'>
                                    {item.products.title}
                                </div>
                                <div className='product-count'>
                                    {item.quantity}
                                </div>
                                <div className='product-price'>
                                    {item.products.price} $
                                </div>
                            </li>)
                    })

                    : <div className="empty-cart">Your cart is empty</div> }
            </ul>

            {(authState.signedIn && total !==0) && <div className='total'>
                Total: {total} $
            </div>}

            <div className='cart-actions'>
                <button className='btn btn-blue btn-small' onClick={handleClick}>
                    Proceed
                </button>
            </div>
        </div>
    )
}

export default CartModal
