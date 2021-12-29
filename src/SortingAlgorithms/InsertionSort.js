export function getInsertionSortAnimations(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let animations = [];

    insertionSort(arr, animations);

    return animations;
}

function insertionSort(arr, animations) {
    let i, key, j; 

    for (i = 1; i < arr.length; i++) { 
        key = arr[i]; 
        j = i - 1;
        
        while (j >= 0 && arr[j] > key)
        { 
            animations.push([j+1, arr[j]]);

            arr[j + 1] = arr[j];
            j = j - 1;
        } 

        animations.push([j+1, key]);

        arr[j + 1] = key;
    } 
} 
