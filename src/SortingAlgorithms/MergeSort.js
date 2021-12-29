export function  getMergeSortAnimations(array) {
    let animations = [];

    if (array.length <= 1) {
        return array;
    }

    let copyArray = array.slice();

    mergeSort(array, 0, array.length - 1, copyArray, animations);

    return animations;
}
  
function mergeSort(mainArray, startIndex, endIndex, copyArray, animations) {
    if (startIndex === endIndex) {
        return;
    }

    let middleIndex = Math.floor((startIndex + endIndex) / 2);

    mergeSort(copyArray, startIndex, middleIndex, mainArray, animations);
    mergeSort(copyArray, middleIndex + 1, endIndex, mainArray, animations);

    merge(mainArray, startIndex, middleIndex, endIndex, copyArray, animations);
}
  
function merge(mainArray, startIndex, middleIndex, endIndex, copyArray, animations) {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;

    while (i <= middleIndex && j <= endIndex) {
        animations.push([i, j]);
        animations.push([i, j]);

        if (copyArray[i] <= copyArray[j]) {
            animations.push([k, copyArray[i]]);
            mainArray[k++] = copyArray[i++];
            
        } else {
            animations.push([k, copyArray[j]]);
            mainArray[k++] = copyArray[j++];
        }
    }

    while (i <= middleIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, copyArray[i]]);

        mainArray[k++] = copyArray[i++];
    }

    while (j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, copyArray[j]]);

        mainArray[k++] = copyArray[j++];
    }
}
