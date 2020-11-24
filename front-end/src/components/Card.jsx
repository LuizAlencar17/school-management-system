import React from 'react'

export default class Counter extends React.Component {
    render() {
        return (
            <div class="card">
                <div class="container">
                    <h4><b>{this.props.tittle}</b></h4>
                    {this.props.children}
                </div>
            </div>
        )
    }
}