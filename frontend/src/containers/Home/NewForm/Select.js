import React from 'react';
import Select from 'react-select';
import LanOp from './languages';
import {
    majorOptions,
    enrollmentOption,
    courseTakenOption,
    locationPrefOptions
    } from './options';


export const languageInput = (value, handleSelectChange) => {
    let lan = Object.values(LanOp).map(el=> {
        return {value: el.name, label: el.nativeName};
    });
    return (
        <div className='Select-input'>
        <Select
            name = 'languagePreferences'
            placeholder='Language Preference'
            value={value}
            onChange={handleSelectChange}
            options={lan}
            />
        </div>

    );

}
export const locationPrefInput = (value, handleSelectChange) => {

    return (

        <div className='Select-input'>
        <Select
            name = "locationPreferences"
            placeholder='Location Preference'
            value={value}
            onChange={handleSelectChange}
            options={locationPrefOptions}
            />
        </div>


    );

}

export const majorInput = (value, handleSelectChange) => {
    
    return (
        <div className='Select-input'>
        <Select
            name = 'major'
            placeholder='Major'
            value={value}
            isMulti= {true}
            onChange={handleSelectChange}
            options={majorOptions}
            />
        </div>

    );
}

export const enrollmentInput = (value, handleSelectChange) => {

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

export const coursesTakenInput = (value, handleSelectChange) => {

    return(

        <div className='Select-input'>
        <Select
            name='courseTaken'
            isMulti= {true}
            placeholder='Taken Courses'
            value={value}
            onChange={handleSelectChange}
            options={courseTakenOption}
            />
        </div>
    );

}
