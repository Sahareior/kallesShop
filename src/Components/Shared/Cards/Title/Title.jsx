import React from 'react';
import './Title.css'
const Title = ({text}) => {
    return (
        <div>
            <div className="twelve">
  <h1>{text}</h1>
</div>
        </div>
    );
};

export default Title;