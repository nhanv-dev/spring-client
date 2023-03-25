export function similarArray(arr1, arr2) {
    const v1 = [...new Set(arr1).values()]; // unique values of arr1
    const v2 = [...new Set(arr2).values()]; // unique values of arr2
    return v1.length !== v2.length ? false : v1.every(x => v2.includes(x));
}
