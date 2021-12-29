export function getHeapSortAnimations(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let animations = [];

    heapSort(arr, animations);

    return animations;
}

function heapSort(arr, animations) {
    let size = arr.length;

    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        heapify(arr, size, i, animations);
    }

    for (let i = size - 1; i > 0 ; i--) {
        animations.push([0, i, arr[0], arr[i]]);

        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        heapify(arr, i, 0, animations);
    }
}

function heapify(arr, size, i, animations) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < size && arr[l] > arr[largest]) {
        largest = l;
    }

    if (r < size && arr[r] > arr[largest]) {
        largest = r;
    }

    if (largest !== i) {
        animations.push([i, largest, arr[i], arr[largest]]);

        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        heapify(arr, size, largest, animations);
    }
}
