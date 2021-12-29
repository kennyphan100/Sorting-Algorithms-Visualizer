export function getQuickSortAnimations(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let animations = [];

    quickSort(arr, 0, arr.length - 1, animations);

    return animations;
}

function quickSort(arr, left, right, animations) {
    if (left >= right) {
        return;
    }

    let index = partition(arr, left, right, animations);
    quickSort(arr, left, index - 1, animations);
    quickSort(arr, index, right, animations);

}

function partition(arr, left, right, animations) {
    let pivotIdx = Math.floor((left + right) / 2);
    let pivot = arr[pivotIdx];

    while (left <= right) {
        if (arr[left] < pivot) {
            animations.push([pivotIdx, left, 0, 0, 0, false]);
        }

        while (arr[left] < pivot) {
            left++;
            animations.push([pivotIdx, left, 0, 0, 0, false]);
        }

        if (arr[right] > pivot) {
            animations.push([pivotIdx, right, 0, 0, 0, false]);
        }

        while (arr[right] > pivot) {
            right--;
            animations.push([pivotIdx, right, 0, 0, 0, false]);
        }

        if (left <= right) {
            animations.push([pivotIdx, left, right, arr[left], arr[right], true]);

            [arr[left], arr[right]] = [arr[right], arr[left]]; // swap elements

            left++;
            right--;
        }

    }

    return left;
}
