export default class Node {
    constructor(id, nodeType){
        this.id = id;
        this.nodeType = nodeType;

        //a-Star
        this.parent = null;
        this.hScore = 0;
        this.gScore = 0;
        this.fScore = 0;

        this.distFromSrc= Infinity;
        this.weight = Math.random();
        //console.log(this.weight)
    }

    getCoord(){
        let pos = this.id.split('-');
        return pos;
    }
}
