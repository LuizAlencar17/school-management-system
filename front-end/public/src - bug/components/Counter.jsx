import React from 'react'

export default class Counter extends React.Component {
    state = {
        step: this.props.step,
        value: this.props.value
    }

    increment = () => {
        this.setState({
            value: this.state.value+this.state.step
        })
    }

    decrement = () => {
        this.setState({
            value: this.state.value-this.state.step
        })
    }

    render() {
        return (
            <div>
                <label>Step: </label>
                <input id="stepInput" type="number" 
                    value={this.state.step} 
                    onChange={e => this.setState({step: +e.target.value})}>
                </input>

                <p>Value: {this.state.value}</p>
                <button className="big-button" onClick={this.increment}>+</button>
                <button className="big-button" onClick={this.decrement}>-</button>
            </div>
        )
    }
}