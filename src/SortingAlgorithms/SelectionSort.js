export function getSelectionSortAnimations(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let animations = [];

    selectionSort(arr, animations);

    return animations;
}

function selectionSort(arr, animations) {
    let size = arr.length;
 
    for (let i = 0; i < size - 1; i++) {

        let min_idx = i;

        for (let j = i + 1; j < size; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }

            animations.push([min_idx, j , arr[min_idx], arr[j], false]); // indexes not swapped
        }
 
        animations.push([min_idx, i , arr[min_idx], arr[i], true]); // indexes swapped

        swap(arr, i, min_idx); // Swap the found minimum element with the first element
    } 
}

function swap(arr, a ,b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
