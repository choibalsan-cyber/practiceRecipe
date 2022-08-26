const arr = [1, 3, 6];

const myFunc = (a) => console.log(`Your entered number is: ${a}`);

const arr1 = [...arr, 33, 44, 55];

myFunc(arr1[3]);
