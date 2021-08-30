import React, { useState } from "react"
import { NavLink } from "react-router-dom"

export const NavCreatePost = (props) => {
    const [groupInf, setGroupInf] = useState({
        name: "",
        link: "",
    })

    const createGroupInf = (event) => {
        setGroupInf({
            ...groupInf, [event.target.name]: event.target.value
        })
    }

    const testURL = (url) => {
        const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
        if (!urlRegex.test(url)) {
            return true
        } else {
            return false
        }
    }

    return <div className={props.modal}>
        <div className="card  darken-1 black-text">

            <div className="row">
                <div className="col s6 offset-s3">
                    <h2>Add new feed item</h2>
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <div>

                                <div className="input-field ">
                                    <input
                                        placeholder="feed name"
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={createGroupInf}
                                    />

                                </div>

                                <div className="input-field ">
                                    <input
                                        placeholder="feed URL"
                                        id="link"
                                        type="text"
                                        name="link"
                                        onChange={createGroupInf}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            {(groupInf.name === "" ||
                                testURL(groupInf.link)) === false ?
                                <NavLink to="/feedList" >
                                    <button
                                        className="btn yellow"
                                        onClick={() => {
                                            props.setArrFeeds(items => items.concat(groupInf))
                                            props.setRssUrl(groupInf.link)
                                            setGroupInf({
                                                name: "",
                                                link: "",
                                            })
                                        }} >
                                        ADD
                                    </button>
                                </NavLink>
                                :
                                <button
                                    className="btn grey"
                                    onClick={() => {
                                        window.M.toast({ html: "make sure that all lines are filled in the second field correct URL" })
                                    }} >
                                    Add
                                </button>
                            }
                            <NavLink to="/feedList" >
                                <button className="btn greey" >
                                    Cancel
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
}