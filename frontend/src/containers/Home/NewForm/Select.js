import React from 'react';
import Select from 'react-select';
import SelectVir from "react-virtualized-select";
import LanOp from './languages';

export const languageInput = (value, handleSelectChange, options) => {
    return (
        <div className='Select-input'>
        <Select
            name = 'languagePreferences'
            placeholder='Language Preference'
            value={value}
            onChange={handleSelectChange}
            options={options}
            />
        </div>

    );

}
export const locationPrefInput = (value, handleSelectChange, options) => {

    return (

        <div className='Select-input'>
        <Select
            name = "locationPreferences"
            placeholder='Location Preference'
            value={value}
            onChange={handleSelectChange}
            options={options}
            />
        </div>


    );

}

export const majorInput = (value, handleSelectChange, options) => {
    
    return (
        <div className='Select-input'>
        <Select
            name = 'major'
            placeholder='Major'
            value={value}
            isMulti= {true}
            onChange={handleSelectChange}
            options={options}
            />
        </div>

    );
}

export const enrollmentInput = (value, handleSelectChange) => {
    const enrollmentOption = [
            {
                value: 'Freshman',
                label: 'Freshman'
            },
            {
                value: 'Sophmore',
                label: 'Sophmore'
            },
            {
                value: 'Junior',
                label: 'Junior'
            },
            {
                value: 'Senior',
                label: 'Senior'
            },
            {
                value: 'Graduate',
                label: 'Graduate'
            }
        ]
    return(
        <div className='Select-input'>
        <Select
            name = 'enrollment'
            placeholder='Enrollment'
            value={value}
            onChange={handleSelectChange}
            options={enrollmentOption}
            />
        </div>
    );
}

export const coursesTakenInput = (value, handleSelectChange, options) => {

    return(

        <div className='Select-input'>
        <Select
            name='courseTaken'
            isMulti= {true}
            placeholder='Courses that you most enjoyed'
            value={value}
            onChange={handleSelectChange}
            options={options}
            />
        </div>
    );

}
