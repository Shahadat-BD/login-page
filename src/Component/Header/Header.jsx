import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const {user,logOut} = useContext(AuthContext)
    const handleLogOut = ()=>{
            logOut()
            .then(()=>{
                toast('user logout successfully')
            }).catch((error)=>{
                console.log(error.message);
            })
    }

    const link = 
    <>
    <li className='pr-7'> <NavLink to={'/'}>Home</NavLink></li>
    {
        user ?  <li className='pr-7' onClick={handleLogOut}><button>sign out</button></li> 
        : 
        <li className='pr-7'> <NavLink to={'/login'}>Login</NavLink></li>
    }
    <li className='pr-7'> <NavLink to={'/Register'}>Register</NavLink></li>
    <li className='pr-7 mt-2'> {user ? user.displayName : ''} </li>


   </>
    return (
        <div>
            <div className="navbar">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal">
                        {link}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Header;