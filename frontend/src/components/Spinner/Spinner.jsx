import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

const Spinner = ({ fullPage = false }) => {
    return (
        <div
            style={{
                width: '100%',
                height: fullPage ? '100vh' : '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            className='container'
        >
            <GridLoader color='#febd69' />
        </div>
    );
};

export default Spinner;
