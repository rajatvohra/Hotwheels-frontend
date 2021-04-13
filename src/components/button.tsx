import React from 'react';
interface IbuttonProps{
    canClick:Boolean;
    loading:Boolean;
    actionText:string;
}

export const Button : React.FC<IbuttonProps> =({
    canClick,
    loading,
    actionText,
}) => (
    <button   className={ `btn ${canClick?"" :" cursor-not-allowed"}` }>
        {loading ?"loading":actionText}

        </button>
        );
