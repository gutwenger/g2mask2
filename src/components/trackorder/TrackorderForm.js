import React from 'react'

const TrackorderForm = ({ handleSubmit }) => {

    return (
        <form id="trackorderForm" className="trackorderForm" onSubmit={(event)=>handleSubmit(event)}>
            <label className="trackorderForm__label" htmlFor="trackorderForm__input">
                Please entre your order number:
            </label>
            <textarea
                id="trackorderForm__input"
                className="trackorderForm__textarea"
                name="trackorderInput"
                type="text"
                rows="2"
                maxLength={36}
                required
            />
            <button
                className="trackorderForm__btn standardBtn--2"
                type="submit"
            >
                Track order
            </button>
        </form>
    )
}

export default TrackorderForm;