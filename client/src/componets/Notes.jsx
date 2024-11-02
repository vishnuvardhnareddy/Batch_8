import React from 'react'

const Notes = () => {
    return (
        <div className="storage w-100  bg-dark">
            <h1 className="w-25 m-auto text-light">Notes</h1>
            <div className="box d-block w-25 m-auto my-5">
                <label
                    className="text-white" htmlFor="text">Notes</label>
                <input type="text" className='d-block w-100 p-5 m-auto' />
                <button className='rounded bg-success text-center text-light ms-5'>Add Notes</button>
            </div>
        </div>
    )
}

export default Notes