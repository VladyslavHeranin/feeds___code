import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import Parser from "rss-parser"

export const Users = (props) => {

    const currentUser = useSelector(state => state.user.currentUser[0])
    const [items, setItems] = useState([]);
    const [remove, setRemove] = useState("")
    const [deleteCss, setDeleteCss] = useState("blocknone")

    const feeds = props.arrFeeds
    const feedRemove = props.setArrFeeds

    const CORS_PROXY = "https://cors.bridged.cc/"

    const parser = new Parser();

    const classCheck = (link) => {
        if (props.rssUrl === link) {
            return "feedsCheck"
        } else {
            return "feeds"
        }
    }


    useEffect(async () => {
        try {
            parser.parseURL(CORS_PROXY + props.rssUrl, function (err, feed) {
                if (err) throw err;
                setItems(feed.items);
            })
        } catch (e) {
            console.log(e);
            window.M.toast({ html: "URL is not defined" })
        }
    }, [props.rssUrl])

    return (
        <div>
            <div className="sort__div">
                <p className="welcome">
                    Welcome, {currentUser.name}
                </p>
                <div>
                    <button className="btn yellow"> <NavLink to="/addFeed" >Add new feed</NavLink></button>
                    <button className="btn blue" onClick={() => {
                        const result = [...items].sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate))
                        setItems(result)
                    }
                    }>Sort for date
                    </button>
                </div>
            </div>
            <div className="main">
                <div className="title">

                    <div className={deleteCss} onClick={() => setDeleteCss("blocknone")}>

                        <p className="confirm">Are you sure you want to delete feed?</p>
                        <div>
                            <button className="btn red" onClick={() => {
                                feedRemove(arr => arr.filter(item => item.link !== remove))
                            }
                            }>Confirm</button>
                        </div>
                    </div>

                    {feeds.map((feed, i) => {
                        return (
                            <div className={classCheck(feed.link)} onClick={() => props.setRssUrl(feed.link)} key={i} >
                                <p className="feed" >{feed.name}</p>
                                <button className="feed__delete" onClick={() => {
                                    setRemove(feed.link)
                                    setDeleteCss("delete")
                                }}></button>
                            </div>
                        )
                    })}
                </div>

                <div className="link">
                    {items.map((item, i) => {
                        return (
                            <div className="item" key={i}>
                                <a target="_blank" className="item__title" href={item.link}>
                                    <p>{item.title}</p>
                                </a>
                                <p className="description">{item.content}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}