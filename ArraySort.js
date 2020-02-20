var mergeSort = function(array){ //O(N^2)
    if (array.length < 2){
        return array;
    }
    let pivot = Math.floor(array.length /2);
    let left = array.slice(0, pivot);
    let right = array.slice(pivot, array.length);
    
    return merge(mergeSort(left), mergeSort(right));
}

var merge = function(left,right){
    let result = [];
    while (left.length && right.length){
        if (left[0] <= right[0]){
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length){ result.push(left.shift()); }
    while (right.length){ result.push(right.shift()); }

    return result;
}

var bubbleSort = function(array){ //time complexity O(N^2) BUT better space complexity
    let length = array.length;
    let i, j, temp;
    for(i = 0; i < length; i++){
        for(j = 0; j < length - 1 - i; j++){
            if (array[j] > array[j+1]){
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return array;
}

var selectionSort = function(array){ // time complexity O(N^2)
    let length = array.length;
    let i, j, temp, minIndex;
    for (i = 0; i < length; i++){
        minIndex = i;
        for (j = i + 1; j < length; j++){
            if (array[j] < array[minIndex]){
                minIndex = j;
            }
        }
        temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;
    }
    return array;
}

var quickSort = function(array, left, right){
    if (!left) left = 0;
    if (!right) right = array.length -1;
    let pivotIndex = right;
    pivotIndex = partition(array,left,right-1, pivotIndex);
    if (left < pivotIndex -1){
        quickSort(array, left, pivotIndex -1);
    }
    if (right > pivotIndex +1){
        quickSort(array, pivotIndex +1, right);
    }
    return array;
}

var partition = function(array, left, right, pivotIndex){
    let temp;
    let pivot = array[pivotIndex];
    while (left <= right){
        while (array[left] < pivot){
            left++;
        }
        while (array[right] > pivot){
            right--;
        }
        if (left <= right){
            temp = array[left];
            array[left] = array[right];
            array[right] = temp;
            left++;
            right--;
        }
    }
    temp = array[left];
    array[left] = array[pivotIndex];
    array[pivotIndex] = temp;
    return left;
}

var countingSort = function(array, k){
    let count = [], result = [];
    for (let i = 0; i <= k; i++){
        count[i] = 0;
    }
    for (j = 0; j < array.length; j++){
        count[array[j]] += 1;
    }
    for (i = 0; i < k; i++){
        count[i + 1] += count[i];
    }
    for (j = 0; j < array.length; j++){
        result[count[array[j]] - 1] = array[j];
        count[array[j]] -= 1;
    }
    return result;
}

var radixLSD = function(array, d){
    let counter = [];
    let mod = 10;
    for ( let i = 0; i < d; i++, mod *= 10){
        for (let j = 0; j < array.length; j++){
            let bucket = parseInt(array[j] % mod);
            if (counter[bucket] == null ){
                counter[bucket] = [];
            }
            counter[bucket].push(array[j]);
        }
        let pos = 0;
        for (j = 0; j < counter.length; j++){
            let value = null;
            if (counter[j] != null){
                while( (value = counter[j].shift()) != null){
                    array[pos++] = value;
                }
            }
        }
        console.log(array);
    }
    return array;
}

console.log(mergeSort([5,2,4,7,6,1,3,8]));  // O(N^2)
console.log(bubbleSort([5,2,4,7,6,1,8,3]));   // O(N^2)
console.log(selectionSort([5,2,4,7,6,1,8,3]));   // O(N^2)
console.log(quickSort([5,2,4,7,6,1,8,3]));   // Worst: O(N^2); Amortized O(NlogN)
console.log(countingSort([3,4,0,1,2,4,2,4], 4));   // O(N+K) when K is smaller than N
console.log(radixLSD([125,383,274,96,0,9,81,72], 3)); // O(DN) D = unit