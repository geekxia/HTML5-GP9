import { useState, FC } from 'react';

import { useAppSelector, useAppDispatch } from '@/hooks/redux';

// action生成器
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
} from '@/store/slices/counter';

import './style.scss'

import QfTabBar from '@/components/tabbar'



function Study() {
  const count = useAppSelector(state=>state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className='row'>
        <button
          className='button'
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className='value'>{count}</span>
        <button
          className='button'
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className='row'>
        <input
          className='textbox'
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className='button'
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className='asyncButton'
          onClick={() => dispatch(incrementAsync())}
        >
          Add Async
        </button>

      </div>

      <QfTabBar />
    </div>
  );
}

export default Study
