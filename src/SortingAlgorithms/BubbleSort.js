export function getBubbleSortAnimations(arr) {
    const auxiliaryArray = arr.slice();
    const animations = [];

    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - 1 - i; j++) {
            
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                animations.push([j, j + 1, auxiliaryArray[j], auxiliaryArray[j + 1], true]); // swapped

                [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];

            } else {
                animations.push([j, j + 1, auxiliaryArray[j], auxiliaryArray[j + 1], false]); // not swapped
            }
            
        }
    }

    return animations;
}
