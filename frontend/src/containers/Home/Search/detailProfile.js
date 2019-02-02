import React from 'react';



export default ({ profile }) => {
    const {
        major,
        enrollment,
        locationPreferences,
        languagePreferences,
    } = profile;
    const majors = major.map(el=> el.name).join(', ');
    const locations = locationPreferences.map(el=> el.name).join(', ');
    const language = languagePreferences.map(el=> el.name).join(', ');

    return <div className='detail-background'>
        <div className='details-profile-container'>
            <div><strong>MAJOR:  </strong>{majors}</div>
            <div><strong>ENROLLMENT:   </strong>{enrollment}</div>
            <div><strong>MAIN LOCATION:   </strong>{ locations }</div>
            <div><strong>LANGUAGE:   </strong> {language}</div>
        </div>
        <div className='button-container'>
            <button className='signup-button'> MATCH</button>
        </div>
    </div>
}