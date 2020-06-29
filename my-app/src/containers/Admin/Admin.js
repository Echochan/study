import React, {Component} from 'react'
import {Switch, Router, Route} from 'react-router-dom'
import './style.css'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import AdminManagerUser from '../AdminMabagerUser/AdminManagerUser'
import AdminIndex from '../AdminIndex/AdminIndex'
import AdminManagerTags from '../AdminManagerTags/AdminManagerTags'
import AdminManagerArticle from '../AdminManagerArticle/AdminManagerArticle'
import AdminNewArticle from '../AdminNewArticle/AdminNewArticle'
class Admin extends Component{
    render() {
        const { url } = this.props.match;
        console.log('Admin', url)
        return(
            <div>
                {
                  <div className="admin_container">
                      <div className="menuContainer">
                          <AdminMenu  history={this.props.history} />
                      </div>
                      <div className="contentContainer">
                          <Switch>
                              <Route  exact path={url} component={AdminIndex}/>
                              <Route  path={`${url}/managerUser`} component={AdminManagerUser}/>
                              <Route  path={`${url}/managerTags`} component={AdminManagerTags}/>
                              <Route  path={`${url}/managerArticle`} component={AdminManagerArticle}/>
                              <Route  path={`${url}/managerNewArticle`} component={AdminNewArticle}/>
                          </Switch>
                      </div>
                  </div>  
                }
            </div>
        )
    }
}
export default Admin