import React from 'react';
import ReactLoading from 'react-loading';

const style = {
    display: "flex",
    justifyContent: "center"
}

export default  ({ type='bubbles' , color ='#563D7C' }) => (
    <div style = {style}>
        <ReactLoading  type={type} color={color} height={667} width={375} />
    </div>
);
