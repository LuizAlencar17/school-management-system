import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './components/Counter';
import Card from './components/Card';

ReactDOM.render(
  <>
  <Card tittle="Contador"><Counter step={10} value={0}/></Card>
  </>,
  document.getElementById('root')
)