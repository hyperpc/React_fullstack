import React from 'react';
import CounterBase from './CounterBase';
import CounterBaseBetter from './CounterBaseBetter';

const CounterWrapper = props =>(
    <div key="counterWrapper">
        <CounterBase initialValue={null} />
        <CounterBase initialValue={12} />
        <CounterBaseBetter initialValue={null} />
        <CounterBaseBetter initialValue={12} />
    </div>
);

export default CounterWrapper;