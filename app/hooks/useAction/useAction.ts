import {
  useCallback,
} from 'react';
import {
  useDispatch,
} from 'react-redux';

type Prepend<E, T extends any[]> =
  ((head: E, ...args: T) => any) extends ((...args: infer U) => any)
    ? U
    : T;
type Tail<T extends any[]> =
  ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any)
    ? TT
    : [];
type Length<T extends any[]> = T['length'];
type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>
  1: T
}[
  Length<I> extends N
    ? 1
    : 0
];
type Cast<X, Y> = X extends Y ? X : Y;

type RemainingArgs<P extends any[], CArgs extends any[]> = (
  Drop<Length<CArgs>, P> extends [any, ...any[]]
    ? Drop<Length<CArgs>, P>
    : never
);
type CompleteCall<P extends any[], R, CArgs extends any[]> = (
  (...args: RemainingArgs<P, CArgs>) => R
);

export const useCurry = <P extends any[], R, CArgs extends any[]>(
  fn: (...args: P) => R,
  ...curriedArgs: Cast<CArgs, Partial<P>>
): CompleteCall<P, R, CArgs> => useCallback(
    (...args: RemainingArgs<P, CArgs>): R => (
      fn(...[...curriedArgs, ...args] as P)
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...curriedArgs, fn],
  );

export default <P extends any[], R, CArgs extends any[]>(
  fn: (...args: P) => R,
  ...curriedArgs: Cast<CArgs, Partial<P>>
): CompleteCall<P, R, CArgs> => {
  const dispatch = useDispatch();

  return useCallback(
    (...args: RemainingArgs<P, CArgs>): R => (
      dispatch(fn(...[...curriedArgs, ...args] as P))
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...curriedArgs, dispatch, fn],
  );
};
