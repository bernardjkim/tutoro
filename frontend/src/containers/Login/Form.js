import React from 'react';

export default ({
    errors,
    email,
    handleInput,
    password,
    handleSubmit,
    otherForm
}) => {
    return (
        <form className='form-container signup login-form'>
            <div id='signup-title'>WELCOME BACK !</div>
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
                <p>Not Registered Yet? <a href='#' id='login-atag' onClick={otherForm} >Join Us!</a></p>

            </form>

    );
}