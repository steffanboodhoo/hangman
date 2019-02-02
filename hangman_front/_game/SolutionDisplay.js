import React from 'react';

const SolutionDisplay = ({solution}) => {
    const text = solution.join(' ');
    return(
        <h1>{text}</h1>
    )
}

export default SolutionDisplay;