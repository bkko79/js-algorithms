var Heap = (function(){
    function Heap(){
        this.arr = [];
    }
    function reheapUp(self, idx){
        if (idx) {
            var parent = parseInt((idx -1) /2);
            if (self.arr[idx] > self.arr[parent]){
                var temp = self.arr[idx];
                self.arr[idx] = self.arr[parent];
                self.arr[parent] = temp;
                reheapUp(self, parent);
            }
        }
    }

    function reheapDown(self, idx){
        var left = 0;
        var right = 0;
        var large;
        if (idx * 2 + 1 < self.arr.length){
            left = self.arr[idx*2+1];
            if(idx*2+2 < self.arr.length -1){
                right = self.arr[idx*2+2];
            }
            if(left > right){
                large = idx*2+1;
            } else {
                large = idx*2+2;
            }
            if (self.arr[idx] < self.arr[large]){
                var temp = self.arr[idx];
                self.arr[idx] = self.arr[large];
                self.arr[large] = temp;
                reheapDown(self,large);
            }
        }
    }

    Heap.prototype.insert = function(number){
        var last = this.arr.length;
        this.arr[last] = number;
        reheapUp(this, last);
        return true;
    }

    Heap.prototype.delete = function(){
        if(this.arr.length === 0){
            return false;
        }
        var del = this.arr[0];
        this.arr[0] = this.arr.pop();
        reheapDown(this,0);
        return del;
    }

    Heap.prototype.sort = function(){
        var sort =[];
        var count =this.arr.length;
        for (var i = 0; i < count; i++){
            sort.push(this.delete());
        }
        return sort;
    };
    return Heap;
})();

var heap = new Heap();
heap.insert(5);
heap.insert(3);
heap.insert(7);
heap.insert(4);
heap.insert(2);
heap.insert(6);
heap.insert(1);
console.log(heap);
console.log(heap.sort()); // Insert and remove(automatic sort) = O(log N)