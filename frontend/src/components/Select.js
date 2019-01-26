import React from 'react';
import PropTypes from 'prop-types';
import _Select from 'react-select';
import _AsyncSelect from 'react-select/lib/Async';
export const Select = ({ value, onChange, options, name, placeholder, isMulti, className }) => {
    return (
        <div className={className}>
        <_Select
            name = {name}
            placeholder={placeholder}
            value={value}
            isMulti = {isMulti}
            onChange={onChange}
            options={options}
            />
        </div>

    );

}

Select.prototype = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.arrary,
    placeholder: PropTypes.string,
    isMulti: PropTypes.bool,
    className: PropTypes.string
};

Select.defaultProps = {
    value: 'No Value Given',
    onChange: ()=> console.log('No onChange func given'),
    name: 'No Name Given',
    options: [{label: 'No options Given'}],
    placeholder: 'No Placeholder Given',
    isMulti: false,
    className: 'Select-input'
};

export const AsyncSelect = ({clearable, value, onChange, options, name, placeholder, isMulti, className }) => {
    const loadOptions = (input, callback) => {
        if (input.length > 1) {
            const newOption = options.filter(el => {
                const search = input.toLowerCase();
                return el.label.toLowerCase().includes(search);
            });
            callback( newOption);
        }   
    }
    return(
        <div className={className}>
        < _AsyncSelect
            name = {name}
            clearable={clearable}
            placeholder={placeholder}
            value={value}
            isMulti = {isMulti}
            onChange={onChange}
            loadOptions={loadOptions}
            />
        </div>
    );

}

AsyncSelect.prototype = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isMulti: PropTypes.bool,
    className: PropTypes.string
};

AsyncSelect.defaultProps = {
    value: 'No Value Given',
    onChange: ()=> console.log('No onChange func given'),
    name: 'No Name Given',
    placeholder: 'No Placeholder Given',
    isMulti: false,
    className: 'Select-input'
};
