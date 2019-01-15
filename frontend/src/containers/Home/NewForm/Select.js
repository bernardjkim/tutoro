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
        <Select
            name = 'languagePreferences'
            placeholder='Language Preference'
            value={value}
            onChange={handleSelectChange}
            options={lan}
        />

    );

}
export const locationPrefInput = (value, handleSelectChange) => {

    return (

        <Select
            name = "locationPreferences"
            placeholder='Location Preference'
            value={value}
            onChange={handleSelectChange}
            options={locationPrefOptions}
        />


    );

}

export const majorInput = (value, handleSelectChange) => {
    
    return (
        <Select
            name = 'major'
            placeholder='Major'
            value={value}
            isMulti= {true}
            onChange={handleSelectChange}
            options={majorOptions}
        />

    );
}

export const enrollmentInput = (value, handleSelectChange) => {

    return(
        <Select
            name = 'enrollment'
            placeholder='Enrollment'
            value={value}
            onChange={handleSelectChange}
            options={enrollmentOption}
        />
    );
}

export const coursesTakenInput = (value, handleSelectChange) => {

    return(
        <div className='form-group'>
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
