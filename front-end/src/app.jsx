import React from 'react';

import Counter from './components/Counter';
import Card from './components/Card';

export default function App () {
    return (
        <div className="cardList">
            <Card tittle="#01 Contador"><Counter step={10} value={0}/></Card>
            <Card tittle="#02 Contador">Atividade aqui</Card>
        </div>
    )
}
