import React from 'react';

export default ({
    errors,
    password,
    password2,
    email,
    handleInput,
    handleSubmit,
    otherForm
     }) => {

    return (
         <form className='form-container signup'>
            <div id='signup-title'>JOIN US!</div>
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
                
                <button className ='signup-button' onClick={handleSubmit}>JOIN</button>
             <p>Already a member? <a href='#' id='login-atag' onClick={otherForm} >Log in</a></p>
            </form>
    );
}