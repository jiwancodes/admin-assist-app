import React from 'react'
import './InputField.css'

function InputField({ type, name, value, onChangeHandler, placeholder,errors }) {
    return (
        // <input className="InputField" type={type} name={name} value={value} onChange={onChangeHandler} placeholder={placeholder}></input>
        <React.Fragment>
        <input className="InputField"
                name={name}
               type={type}
               onChange={onChangeHandler}
               value={value}
               placeholder={placeholder}
            />

            {errors[name] ? (<div className="errorFeedback">{errors[name]}</div>) : null}
            </React.Fragment>
    )
}

export default InputField
