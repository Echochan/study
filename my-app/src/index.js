import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import { BrowserRouter as Router, Switch, Route, history } from 'react-router-dom';
import Front from './containers/Front/Front';
import Admin from './containers/Admin/Admin'
ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route path="/admin" component={Admin} />
                <Route component={Front} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
);
