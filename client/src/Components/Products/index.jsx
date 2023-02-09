import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/authContext'
import { CartContext } from '../../Context/cartContext'
import { cartServices } from '../../Services/cartServices'
import { productServices } from '../../Services/productServices'
import { useEffectOnce } from '../../Utils/hooks'
import './styles.scss'

const Products = () => {
    const [ authState ] = useContext(AuthContext)

    const context = useContext(CartContext)
    const setProductsState = context[1]
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [inventory, setInventory] = useState([])

    if(!authState.signedIn) {
        navigate('/')
    }

    const handleClick = (itemId) => {

        if (authState.role === 'user') {
            let isSubscribed = true;

            const fetchData = async () => {
                const data = await cartServices.addProductToCart({userId: authState.id, productId: itemId})
                const json = await data.data.productsCart

                if (isSubscribed) {
                    setProductsState(json)
                }
              }
    
              fetchData()
                  .catch(err=> console.error(err))
                return () => isSubscribed = false
        } else {
            return 
        }

    }

    useEffectOnce(() => {
        let isSubscribed = true
        if (!products.length) {
            const fetchData = async () => {
                const data = await productServices.getAllProducts()
                const json = await data.data.products
                const results = await data.data.inventory
    
                if (isSubscribed) {
                    setProducts(json)
                    setInventory(results)
                }
            }
            
            fetchData()
                .catch(err=> console.error(err))
            return () => isSubscribed = false
        }

      }, [products.length])

    return (
        <div className='container'>
            
            <div className='products'>

                <div className='products-list'>

                    {products?.length ? products.map((item, i) => {
                        return (
                            <div key={`${i}-${item.id}`} 
                                className={`product-item ${authState?.role === 'user' ? 'cursor-pointer' : ''}`} 
                                onClick={e => handleClick(item.id)}
                            >
                                <div className='image-wrapper'>
                                    {item.image ? <img src={item.image} alt="shopping"/> 
                                    : <img src="http://fakeimg.pl/150/e5e5e5/adadad/?text=IMG" alt="shopping"/>}
                                </div>
                                <div className='content'>
                                    <div className='title'>
                                        {item.title}
                                    </div>
                                    <div className='description'>
                                        {item.description}
                                    </div>
                                </div>

                                <div className='price'>
                                    <span>{item.price} $</span>
                                </div>
                            </div>
                        )
                    })
                    : <div className="loading">Loading...</div>}
                </div>
            </div>
            
            <div className='inventory'>

            <h4 className='inventory-title'>Inventory</h4>
                {inventory?.map((item, idx) => {
                    return (
                        <div key={`${idx}-${item.totalAmount}`} className='inventory-item'>
                            <div className='seller-name'>
                                {item['user.email']}
                            </div>
                            <div className='seller-count'>
                                {item.count}
                            </div>
                            <div className='seller-total'>
                                {item.totalAmount} $
                            </div>
                        </div>
                    )
                })}    
            </div>
        </div>
    )
}

export default Products