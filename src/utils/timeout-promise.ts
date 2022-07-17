export function timeoutPromise<T>(
  promise: Promise<T>,
  timeout: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => reject(new Error("timeout")), timeout);

    promise.then(
      /* onFulfilled */ (value) => {
        resolve(value);
        clearTimeout(timeoutID);
      },
      /* onRejected */ (reason) => {
        reject(reason);
        clearTimeout(timeoutID);
      }
    );
  });
}
