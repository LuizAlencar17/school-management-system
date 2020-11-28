import React, { Component } from 'react';

import { Provider } from 'react-redux';

import store from './components/store/index';

import Counter from './components/Counter';
import Card from './components/Card';
import Sidebar from './components/Sidebar/index';
import Video from './components/Video/index';

export default class App extends Component {
    render() {
        return (
            <div className="cardList">
                <Provider store={store}>
                    <Card tittle="#01 Contador">
                        <Counter step={10} value={0}/>
                    </Card>
                    <Card tittle="#02 Lista">
                        <Video/>
                        <Sidebar/>
                    </Card>
                </Provider>
            </div>
        )
    }
}
