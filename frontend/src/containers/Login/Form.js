import React from 'react';
import logo from '../../images/logo.png';

export default ({
    errors,
    email,
    handleInput,
    password,
    handleSubmit
}) => {
    return (
        <form className='form-container login'>
            <div id='signup-title'>Log In</div>
            <div className='logo-container'>
              <img className='signup-logo' 
              alt='login_logo'
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
                            
                <button className ='signup-button' onClick={handleSubmit}>Log In</button>
            </form>

    );
}