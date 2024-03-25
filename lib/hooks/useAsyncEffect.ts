import { useEffect } from 'react';

export default function useAsyncEffect<T>(
  callback: (isMounted: () => boolean) => T | Promise<T>,
  onDestroyOrDependencies: null | ((result?: T) => void) | any[] = [],
  dependencies: any[] = []
) {
  let deps: any[];
  let destroy: (result?: T) => void;

  // simulating args overloading
  if (typeof onDestroyOrDependencies === 'function') {
    destroy = onDestroyOrDependencies;
    deps = dependencies;
  } else {
    deps = onDestroyOrDependencies ?? [];
  }

  useEffect(() => {
    let result: T;
    let mounted = true;

    const maybePromise = callback(() => {
      return mounted;
    });

    Promise.resolve(maybePromise).then((value) => {
      result = value;
    });

    return () => {
      mounted = false;

      if (typeof destroy === 'function') {
        destroy(result);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
