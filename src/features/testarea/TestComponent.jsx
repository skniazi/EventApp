import React, { Component } from 'react'

//using connect which is a higher order component
import {connect} from 'react-redux';

import { Button } from 'semantic-ui-react';
import {incrementCounter,decrementCounter} from './testActions'

//MapStateToProps i-e it helps to fetch the state from the store
const mapSate = (state) => ({
    data: state.test.data
})

//MapDispatchToProps
const actions = {
    incrementCounter,
    decrementCounter
}

 class TestComponent extends Component {
   
    render() {
        const {data,incrementCounter,decrementCounter} = this.props;
        return (
            <div>
                <h1>Test Component</h1>
                <h3>The state coming from the store is : {data}</h3>

                <Button onClick={incrementCounter} positive content='Increment' />
                <Button onClick={decrementCounter} negative content='Decrement' />
            </div>
        )
    }
}

//passing connect as higher order component
//its called first and then the componenet is loaded getting
//the props from the Store via mapState()
export default connect(mapSate,actions)(TestComponent) 
