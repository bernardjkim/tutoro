import React from 'react';
import PropTypes from 'prop-types';
import RSelect from 'react-select';
import RAsyncSelect from 'react-select/lib/Async';

const customStyles = {
      option: (base, state) => ({
            ...base,
             backgroundColor: state.isSelected ? '#4F2C73' : 'white',
                 '&:hover': {
                     backgroundColor: state.isFocused ? '#6E4D8F' : 'white',
                     color: 'white'
                 }      
        }),
        placeholder: (base, state) => ({ ...base, color: '#984C8A'}),
        singleValue: (base, state) => ({ ...base, color: '#984C8A' }),
        multiValue: (base, state) => ({...base, backgroundColor:'white'}),
        multiValueLabel: (base, state) => ({ ...base, color: '#984C8A', fontSize: 16}),
        multiValueRemove: (base, state) => ({ ...base, 
            color: '#984C8A',
            ':hover': {
                backgroundColor: '#9177AC',
                color: 'white',
            },
        }),
        control: (base, state) => ({
            ...base,
            border: '0 !important',
            // This line disable the blue border
            boxShadow: '0 !important',
            '&:hover': {
                border: '0 !important'
            }
        })
};

export const Select = ({ value, onChange, options, name, placeholder, isMulti, className }) => {
    return (
        <div className={className}>
        <RSelect
            styles={customStyles}
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
        < RAsyncSelect
            styles={customStyles}
            name = {name}
            clearable={clearable}
            placeholder={placeholder}
            noOptionsMessage={() => 'Please type at least 2 inputs'}
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

