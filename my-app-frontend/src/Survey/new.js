import React from 'react';

const createSurvey = () => {
    return (
        <div>
            <h2>Create Survey</h2>
            <form onSubmit={postLogin}>

            <label> Title </label>
            <input type="text" name="title" id="title"/>

            <label> Description </label>
            <input type="text" name="description" id="description"/>

            <label> Survey's Start Date </label>
            <input type="date" name="startDate" id="startDate"/>

            <label> Survey's End Date </label>
            <input type="date" name="endDate" id="endDate"/>

            <button type="submit"> Create </button>
            </form>
        </div>
    )
}