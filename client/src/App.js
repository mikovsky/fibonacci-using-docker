import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Welcome to <code>React</code>!
                    </p>
                    <Link className="App-link" to="/">Home</Link>
                    <Link className="App-link" to="/otherPage">OtherPage</Link>
                </header>
                <div className="container">
                    <Route exact path="/" component={Fib} />
                    <Route path="/otherPage" component={OtherPage} />
                </div>
            </div>
        </Router>
    );
}

export default App;
