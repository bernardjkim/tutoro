import React from 'react';

export default ({
    type = 'text',
    name = '',
    onChange = null,
    placeholder = '',
    value = '',
    divClassName = 'Select-input',
    inputClassName = 'input',
}) => (
    <div className = {divClassName}>
        <input
        className={inputClassName}
        name = {name}
        onChange = {onChange}
        placeholder = {placeholder}
        value = {value}
        type = {type}
            />
     </div>)
    
        
        
    
