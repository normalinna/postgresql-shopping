import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import createPersistedState from 'use-persisted-state'
import { AuthContext } from './Context/authContext'
import { CartContext } from './Context/cartContext'
import { router } from './routes'

function App() {
  const useAuthState = createPersistedState('auth');
  const [authState, setAuthState] = useAuthState(
    {
        id: '',
        email: '',
        role: '',
        signedIn: false
    }
  )

  const [isAddProduct, setIsAddProduct] = useState(false)

  return (
      <div className="App">
        <AuthContext.Provider value={[authState, setAuthState]} >
          <CartContext.Provider value={[isAddProduct, setIsAddProduct]} >
            <RouterProvider router={router} />
          </CartContext.Provider>
        </AuthContext.Provider>
      </div>
  );
}

export default App;
