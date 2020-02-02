import React from 'react'
import { Input, Form } from 'antd';
import './SearchBar.css';
import PropTypes from 'prop-types';


const { Search } = Input;

export default function SearchBar(props) {
    return (
        <div className="SearchBar">
            <Form
                className="input"
                onSubmit={props.onSubmitHandler} >
                <Search
                    style={{ marginTop: props.marginTop }}
                    size="large"
                    placeholder={`${props.placeholder}`}
                    onChange={props.onChangeHandler}
                    aria-label="Search"
                />
            </Form>
        </div>
    )
}

SearchBar.propTypes = {
    onSubmitHandler: PropTypes.func,
    marginTop: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeHandler: PropTypes.func
}
