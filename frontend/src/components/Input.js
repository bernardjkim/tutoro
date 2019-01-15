import React from 'react';

export default ({
    type = 'text',
    name = '',
    onChange = '',
    placeholder = '',
    value = '',
    divClassName = 'form-group',
    inputClassName = 'form-control',
    ref = null,
    accept = null,
}) => (
    <div className = {divClassName}>
        <input
        className={inputClassName}
        name = {name}
        onChange = {onChange}
        placeholder = {placeholder}
        value = {value}
        type = {type}
        ref = {ref}
        accept = {accept}
            />
    </div>
);