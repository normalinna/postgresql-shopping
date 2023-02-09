import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { authServices } from '../../Services/authServices'
import { setToken } from '../../Utils/utils'

import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/authContext'

const Home = () => {
    const navigate = useNavigate()

    const [ authState, setAuthState ] = useContext(AuthContext)

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not invalid'),
        password: Yup.string()
    })

    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = async (data) => {

        const resData = await authServices.signIn(data)

        if (resData.status === 200) {
            setToken(resData.data.token)

            setAuthState({
                signedIn: true,
                id: resData.data.user.id,
                email: resData.data.user.email,
                role: resData.data.user.role
            })
        }
    }

    useEffect(() => {
        if (authState.signedIn){
           return navigate('/products')
        }
     },[authState.signedIn, navigate])

    return (
        <div className='container'>
            <div className='login'>
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-wrapper">
                        <input 
                            type="email" 
                            name="email" 
                            {...register('email')} />
                        <label className='label'>Email</label>
                        <span className="line"></span>
                    </div>
                     <p className="error">{errors?.email && errors.email.message}</p>

                    <div className="input-wrapper">
                        <input 
                            type="password" 
                            name="password" 
                            {...register('password')}/>
                        <label className='label'>Password</label>
                        <span className="line"></span>
                    </div>

                    <p className="error">{errors?.password && errors.email.password}</p>
                    
                    <div className='form-action'>
                        <button type='submit' className='btn btn-blue' onClick={e => handleSubmit(onSubmit)}>
                            Sign In
                        </button>
                    </div>
                </form>  

            </div>
        </div>
    )
}

export default Home