import React from 'react'

export default function Search(props) {


    return (
        <div>
            <form
                onSubmit={props.onSubmitHandler}
                class="form-inline mt-2">
                <input
                    onChange={props.onChangeHandler}
                    name="search"
                    class="form-control mr-sm-2 btn-lg"
                    type="text"
                    placeholder="Search"
                    aria-label="Search" />
            </form>
        </div>
    )
}
