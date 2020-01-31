import React from 'react'

export default function Search(props) {


    return (
        <div>
            <form
                onSubmit={props.onSubmitHandler}
                class="form-inline mt-2">
                <input
                    placeholder={props.placeholder}
                    onChange={props.onChangeHandler}
                    name="search"
                    className="form-control mr-sm-2 btn-lg"
                    type="text"
                    aria-label="Search" />
            </form>
        </div>
    )
}
