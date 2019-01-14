import React from 'react';
import logo from '../../images/logo.png';

export default ({
    errors,
    password,
    password2,
    email,
    handleInput,
    handleSubmit,
    openModal
     }) => {

    return (
         <form className='form-container signup'>
            <div id='signup-title'>Sign Up for Free</div>
            <div className='logo-container'>
              <img className='signup-logo' 
              alt='signup_logo'
              src={logo}/>
            </div>
            <div>
                {errors}
            </div>
                <input 
                placeholder="Email" 
                type='text'
                name="email"
                value={email}
                onChange={handleInput}/>
                
                <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={handleInput}
                />
                <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={handleInput}
                />
                
                <button className ='signup-button' onClick={handleSubmit}>Sign Up</button>
             <p>Already a member? <a id='login-atag' onClick={openModal} >Log in</a></p>
            </form>
    );
}