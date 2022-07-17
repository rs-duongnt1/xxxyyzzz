export function delayPromise(timeout: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      resolve(true);
    }, timeout);
  });
}
