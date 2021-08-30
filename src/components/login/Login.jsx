import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../actions/user"
import { NavLink } from "react-router-dom"

export const Login = (props) => {
    const [form, setForm] = useState({
        name: "",
        password: ""
    })

    const changeHandler = event => {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field ">
                                <input
                                    placeholder="name"
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-field ">
                                <input
                                    placeholder="password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        {form.password.length < 4 ? <button
                            className=" btn greey "
                        >
                            LOG IN
                        </button> :
                            <NavLink to="/feedList"><button
                                className=" btn yellow "
                                onClick={() => {
                                    dispatch(login(form.name))
                                    props.setCurrentName(form.name)
                                }}
                            >
                                LOG IN
                            </button></NavLink>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

