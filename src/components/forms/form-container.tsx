import React from 'react';
import css from './form-container.module.scss';


const FormContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div className={ css.container }>
            { props.children }
        </div>
    );
};

export default FormContainer;