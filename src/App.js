import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Login } from "./components/login/Login.jsx"
import { Header } from "./components/navigation-and-search-components/header.jsx"
import "materialize-css"
import { useDispatch, useSelector } from "react-redux"
import { Users } from "./components/lists/feeds"
import { NavCreatePost } from "./components/navigation-and-search-components/navCreatePost"
import { useState } from "react"
import { Auth } from "./actions/user"

function App() {

  const [arrFeeds, setArrFeeds] = useState(() => [{
    name: "NASA",
    link: "https://www.nasa.gov/rss/dyn/breaking_news.rss"
  },
  {
    name: "CNN-edition",
    link: "http://rss.cnn.com/rss/edition.rss"
  },
  {
    name: "NY-times",
    link: "http://feeds.nytimes.com/nyt/rss/HomePage"
  }])

  const [items, setItems] = useState([]);

  const [rssUrl, setRssUrl] = useState("https://www.nasa.gov/rss/dyn/breaking_news.rss");

  const [curentName, setCurrentName] = useState("")

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(() => {
    if (isAuth) {
      dispatch(Auth(curentName))
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="container" >
        <Header setItems={setItems} />
        {!isAuth ?
          <Switch>
            <Route exact path={"/"} component={() => <Login
              setCurrentName={setCurrentName}
            />} />
          </Switch>
          :
          <Switch>
            <Route exact path={"/feedList"} component={() => <Users
              setItems={setItems}
              items={items}
              arrFeeds={arrFeeds}
              setArrFeeds={setArrFeeds}
              rssUrl={rssUrl}
              setRssUrl={setRssUrl}
            />} />

            <Route exact path={"/addFeed"} component={() => <NavCreatePost
              setArrFeeds={setArrFeeds}
              arrFeeds={arrFeeds}
              setRssUrl={setRssUrl}
            />} />
          </Switch>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;

