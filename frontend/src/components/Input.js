import React from 'react';

export default ({
    type = 'text',
    name = '',
    onChange = '',
    placeholder = '',
    value = '',
    divClassName = 'form-group',
    inputClassName = 'form-control',
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
    </div>
);