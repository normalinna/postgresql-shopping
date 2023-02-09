import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/authContext';
import { cartServices } from '../../Services/cartServices';
import { useEffectOnce } from '../../Utils/hooks';
import './styles.scss'

const Cart = () => {
    const [products, setProducts] = useState([])
    const [ authState ] = useContext(AuthContext)

    const total = products.length ?
        products.map(item => item.products.price * item.quantity).reduce((prev, curr) => prev + curr, 0)
        : 0

    useEffectOnce(() => {
        if(authState.id && authState.role === 'user') {
            let isSubscribed = true
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

    return (
        <div className='cart'>
            <h3 className='cart-title'>
                Shopping Cart
            </h3>

            <div className='cart-table'>
                { products?.length ?
                products.map((item, i) => {
                    return (
                        <div key={`${i}-${item.id}`} className='cart-item'>
                            <div className='image-wrapper'>
                                <img src="http://fakeimg.pl/150/e5e5e5/adadad/?text=IMG" alt="shopping"/>
                            </div>
        
                            <div className='content'>
                                <div className='title'>
                                    {item.products.title}
                                </div>
                            </div>
        
                            <div className='qty'>
                                {item.quantity}
                            </div>
        
                            <div className='price'>
                                <span>{item.quantity * item.products.price} $</span>
                            </div>
                        </div>
                    )
                })
                : <div className='empty-cart'>Your cart is empty</div>}
            </div>

            {total !== 0 && <div className='cart-total'>
                <span>
                    {total} $
                </span>
            </div> }
        </div>
    )
}

export default Cart
