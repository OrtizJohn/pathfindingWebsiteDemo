class PriorityQueue {
    constructor() {
      this.heap = [];
    }
  
    enqueue(element) {
      this.heap.push(element);
      this._bubbleUp();
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
  
      const min = this.heap[0];
      const lastNode = this.heap.pop();
  
      if (this.heap.length > 0) {
        this.heap[0] = lastNode;
        this._sinkDown();
      }
  
      return min;
    }
  
    isEmpty() {
      return this.heap.length === 0;
    }
    printHeap(){
      console.log("Heap:");
      const nodeIDs = this.heap.map(node => node.id);
      console.log(nodeIDs.join(', '));
    }
  
    _bubbleUp() {
      let index = this.heap.length - 1;
      const node = this.heap[index];
  
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.heap[parentIndex];
  
        
        //compare dijkstra's 
        if (node.distFromSrc >= parent.distFromSrc) {
          break;
        }
        
        
  
        this.heap[parentIndex] = node;
        this.heap[index] = parent;
        index = parentIndex;
      }
    }
  
    _sinkDown() {
      let index = 0;
      const length = this.heap.length;
      const node = this.heap[0];
  
      while (true) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;
  
        if (leftChildIndex < length) {
          leftChild = this.heap[leftChildIndex]; 
          if (leftChild.distFromSrc < node.distFromSrc) {
            swap = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.heap[rightChildIndex];
          if (
            (swap === null && rightChild.distFromSrc < node.distFromSrc) ||
            (swap !== null && rightChild.distFromSrc < leftChild.distFromSrc)
          ) {
            swap = rightChildIndex;
          }
        }
  
        if (swap === null) break;
        this.heap[index] = this.heap[swap];
        this.heap[swap] = node;
        index = swap;
      }
    }
  }
  
  export default PriorityQueue;
  