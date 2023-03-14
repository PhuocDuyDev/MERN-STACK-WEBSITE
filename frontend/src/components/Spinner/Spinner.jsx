import React from 'react';
import GridLoader from 'react-spinners/GridLoader';

const Spinner = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
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
