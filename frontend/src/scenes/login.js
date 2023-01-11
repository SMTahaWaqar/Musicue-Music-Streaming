import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = (props) => {

    // const location = useLocation();
    // console.log(location.pathname);

    // const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    
    const loginSchema = Yup.object().shape({
        username: Yup.string()
          .min(4, "Too short")
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        password: Yup.string()
          .min(7, 'Must be 7 character or greater')
          .required('Required'),
    })

    const registerSchema = Yup.object().shape({
        firstName: Yup.string()  
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          username: Yup.string()
          .min(4, "Too short")
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
          password: Yup.string()
          .min(7, 'Must be 7 character or greater')
          .required('Required'),
    })

    const initialValuesRegister = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        likedSongs: [],
        customePlaylist: []
    }
    
    const initialValuesLogin = {
        username: "",
        password: "",
    }
    
    const register = async (values) => {
        console.log(values);
        try {
            const res = await axios.post('http://localhost:3001/auth/register', values)
            console.log(res.data);
            setIsLogin(true);
        } catch (error) {
            console.log(error);
        }
    }

    const login = async (values) => {
        // console.log(values);
        try {
            const res = await axios.post('http://localhost:3001/auth/login', values)
            // console.log(res.data);
            // navigate('/home', {state: res.data});
            props.sendData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: isLogin ? initialValuesLogin : initialValuesRegister,
        validationSchema: isLogin ? loginSchema : registerSchema,
        onSubmit: isLogin ? login : register,
    });

    // style={{backgroundImage: "linear-gradient(115deg, #9f7aea, #fee2fe", padding: "40px 0px"}}

  return (
    <div className='min-h-screen flex justify-center items-center bg-[#023047]' >
        <div className='container mx-auto'>
            <div className='w-8/12 bg-[#227C70] rounded-xl mx-auto shadow-lg overflow- flex flex-col lg:flex-row'>
                {/* Image */}
                <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center' style={{backgroundImage: "url('https://img.freepik.com/free-vector/musical-notes-frame-with-text-space_1017-32857.jpg?w=826&t=st=1673467941~exp=1673468541~hmac=7348b70b9982ef237a2292a45dd0240a0ce330389336b38d61be16778e203eeb')"}}>
                    <h1 className='text-white text-center font-bold text-4xl mb-3'>Welcome To Musicue</h1>
                    <div>
                        <p className='text-white font-bold text-2xl text-center'>Musique gives you access to a world of free music, curated playlists, artists you love. <br /> Discover new music, top songs or listen to your favorite artists and albums.</p>
                    </div>
                </div>
                {/* Form */}
                {!isLogin ?
                    <div className='w-full lg:w-1/2 py-16 px-12'>
                        <h2 className='text-3xl mb-4 text-center lg:text-left'>Register</h2>
                        <p className='mb-4 text-center lg:text-left'>Create an Account. It Only takes a minute!</p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='lg:grid lg:grid-cols-2 lg:gap-5 flex flex-col w-full'>

                                <input
                                id='firstName'
                                name="firstName" 
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName} 
                                placeholder='First Name' 
                                className='border bg-[#4d70bd] font-semibold border-gray-400 py-1 px-2 hover:bg-white hover:cursor-pointer  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <p className='text-sm text-red-500'>{formik.errors.firstName}</p>
                                ) : null}
    
                                <input
                                id='lastName'
                                name="lastName"
                                type="text" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName} 
                                placeholder='Last Name' 
                                className='border bg-[#4d70bd] font-semibold  hover:bg-white border-gray-400 py-1 px-2 mt-5 lg:mt-0 hover:cursor-pointer'
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <p className='text-sm text-red-500'>{formik.errors.lastName}</p>
                                ) : null}

                            </div>
                            <div className='mt-5'>
                                
                                <input
                                id='email'
                                name="email" 
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email} 
                                placeholder='Email' 
                                className='border bg-[#4d70bd] font-semibold hover:bg-white border-gray-400 py-1 px-2 w-full hover:cursor-pointer'
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <p className='text-sm text-red-500'>{formik.errors.email}</p>
                                ) : null}
                            
                            </div>
                            <div className='mt-5'>

                                <input
                                id='username'
                                name="username" 
                                type="text" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username} 
                                placeholder='Username' 
                                className='border bg-[#4d70bd] font-semibold hover:bg-white border-gray-400 py-1 px-2 w-full hover:cursor-pointer'
                                />
                                {formik.touched.username && formik.errors.username? (
                                    <p className='text-sm text-red-500'>{formik.errors.username}</p>
                                ) : null}
                            
                            </div>
                            <div className='mt-5'>

                                <input 
                                id='password'
                                name="password" 
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password} 
                                placeholder='Password' 
                                className='border bg-[#4d70bd] font-semibold hover:bg-white border-gray-400 py-1 px-2 w-full hover:cursor-pointer'
                                />
                                {formik.touched.password && formik.errors.password? (
                                    <p className='text-sm text-red-500'>{formik.errors.password}</p>
                                ) : null}
                            
                            </div>
                            <div className='mt-5'>
                                <button type='submit' className='w-full bg-green-500 py-3 text-center font-bold text-xl text-white hover:bg-green-700'>SignUp</button>
                            </div>
                        </form>
                        <p onClick={() => setIsLogin(true)} className="font-semibold hover:font-bold hover:cursor-pointer underline mt-2">Already have an account? Sign in here</p>
                    </div>
                : 
                    // Login
                    <div className='w-full lg:w-1/2 py-16 px-12'>
                        <h2 className='text-3xl mb-4 text-center lg:text-left'>Login</h2>
                        <p className='mb-4 text-center lg:text-left'>Sign in here to indulge in a whole new world!</p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='mt-5'>

                                <input
                                id='username'
                                name="username" 
                                type="text" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username} 
                                placeholder='Username' 
                                className='border bg-[#4d70bd] text-black font-semibold border-gray-400 py-1 px-2 w-full hover:bg-white hover:cursor-pointer'
                                />
                                {formik.touched.username && formik.errors.username? (
                                    <p className='text-sm text-red-500'>{formik.errors.username}</p>
                                ) : null}
                            
                            </div>
                            <div className='mt-5'>

                                <input 
                                id='password'
                                name="password" 
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password} 
                                placeholder='Password' 
                                className='border bg-[#4d70bd] font-semibold border-gray-400 py-1 px-2 w-full hover:bg-white hover:cursor-pointer'
                                />
                                {formik.touched.password && formik.errors.password? (
                                    <p className='text-sm text-red-500'>{formik.errors.password}</p>
                                ) : null}
                            
                            </div>
                            <div className='mt-5'>
                                <button type='submit' className='w-full bg-green-500 py-3 text-center font-bold text-xl text-white hover:bg-green-700'>Login</button>
                            </div>
                        </form>
                        <p onClick={() => setIsLogin(false)} className="font-semibold hover:font-bold hover:cursor-pointer underline mt-2">Don't have an account? Create one here!</p>
                    </div>
                    }
            </div>
        </div>
    </div>
  )
}

export default Login;
