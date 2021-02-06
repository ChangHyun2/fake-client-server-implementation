export const TimeoutPromise = (cb, sec) =>
  new Promise((res, rej) => {
    setTimeout(() => res("resolved"), sec);
  }).then(() => new Promise(cb));
