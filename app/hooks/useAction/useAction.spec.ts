/**
 * @jest-environment jsdom
 */
import test from 'jest-gwt';
import { mocked } from 'ts-jest/utils';
import {
  renderHook,
  RenderResult,
} from '@testing-library/react-hooks';
import {
  noop,
  identity,
} from 'lodash/fp';

import {
  useDispatch,
} from 'react-redux';

import useAction from './useAction';

jest.mock('react-redux');
const mocked_useDispatch = mocked(useDispatch);

describe('hooks > use action', () => {
  test('dispatches action', {
    given: {
      dispatch,
      action,
    },
    when: {
      using_action,
      invoking_callback,
    },
    then: {
      action_dispatched_WITH_ARGS,
      returns_action_result,
    },
  });

  test('callback is same', {
    given: {
      dispatch,
      action,
    },
    when: {
      using_action,
      using_action_AGAIN,
    },
    then: {
      action_is_SAME_ACTION,
    },
  });
});

type Context = {
  dispatch: () => any,
  rerender: (props?: unknown) => void,
  call_action: RenderResult<(...args: any[]) => any>,
  action: (...args: any[]) => any,
  result: any,
};

function dispatch(this: Context) {
  this.dispatch = jest.fn().mockImplementation(identity);
  mocked_useDispatch.mockReturnValue(this.dispatch);
}

function action(this: Context) {
  this.action = jest.fn().mockReturnValue(Symbol.for('result'));
}

function using_action(this: Context) {
  const { result, rerender } = renderHook(() => useAction(this.action));

  this.call_action = result;
  this.rerender = rerender;
}

function using_action_AGAIN(this: Context) {
  this.rerender();
}

function invoking_callback(this: Context) {
  this.result = this.call_action.current('one', 3, noop);
}

function action_is_SAME_ACTION(this: Context) {
  expect(this.call_action.current).toBe(this.call_action.all[0]);
}

function action_dispatched_WITH_ARGS(this: Context) {
  expect(this.action).toHaveBeenCalledWith(
    'one',
    3,
    noop,
  );
}

function returns_action_result(this: Context) {
  expect(this.result).toBe(Symbol.for('result'));
}
