import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function RouterGuard(props) {
    const {Cmp, path, isLogin} = props
    return(
        <Route
        render={ prop => {
            console.log(prop)
            return isLogin ? '': (<Redirect to={{pathname:'/'}}/>) 
        }}
        ></Route>
    )
}