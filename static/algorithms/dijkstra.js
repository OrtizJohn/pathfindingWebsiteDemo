
/*
For this implementation of dijkstra's algorithm:
    -weights assigned to each node are representative of edge weights to traverse from one cell to another cell. Of course this is just to demonstrate knowledge of the algorithm more so than to be implemented in practice as each weight is randomly generated btw 0 and 1
    -algorithm will essentiially work the same bfs except will start with whichever neighbors have the lowest weight hence overall lowest distance
    -as such this only goes to show the decision in the algorithm will be based lowest total distance to shortest path
*/ 
import delay from '/static/utils.js'; // Assuming you have a delay function
import PriorityQueue from '/static/priorityQueue.js';

export default async function dijkstra(grid, delayValue) {
    console.log("Running Dijkstra's Algorithm...");

    let openList = new PriorityQueue();
    let closedList = new Set();
    let finalPath = [];

    grid.startNode.distFromSrc=0;
    grid.startNode.weight =0;

    openList.enqueue(grid.startNode);
    let ct =0;
    while ( !openList.isEmpty() ) {
        //set currentNode
        let currentNode = openList.dequeue();

        let tempNodeType = currentNode.nodeType;
        currentNode.nodeType = "current";
        grid.updateCurrentCell(currentNode);

        if (currentNode === undefined) {
            throw Error("Open list must be empty as current node is being returned: undefined");
        }

        if (currentNode.id === grid.targetNode.id) {
            console.log("Hit target!!!");

            while (currentNode.id !== grid.startNode.id) {
                finalPath.push(currentNode.id);
                currentNode = currentNode.parent;
            }

            return finalPath;
        }

        let neighborsAdjustment = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
        let neighbors_CSS =[];
        for (let i = 0; i < neighborsAdjustment.length; i++) {
            let posAdj = neighborsAdjustment[i];
            let neighborPosX = Number(currentNode.getCoord()[0]) + Number(posAdj[0]);
            let neighborPosY = Number(currentNode.getCoord()[1]) + Number(posAdj[1]);

            if (neighborPosX < 0 || neighborPosX >= grid.n || neighborPosY < 0 || neighborPosY >= grid.m) {
                continue;
            }

            let neighborNode = grid.nodes[neighborPosX][neighborPosY];

            if (neighborNode.nodeType === "obstacle") {
                continue;
            }
            if (!closedList.has(neighborNode)) {
                neighborNode.parent = currentNode;
        
                if (neighborNode.nodeType !== "start"  && neighborNode.nodeType !== "obstacle") {
                    //&& neighborNode.nodeType !== "target"
                    if(neighborNode.nodeType !== "target"){
                        neighborNode.nodeType = "neighbor";
                    }
                    neighborNode.distFromSrc = currentNode.distFromSrc + neighborNode.weight;
                }

                openList.enqueue(neighborNode);
                neighbors_CSS.push(neighborNode);
                closedList.add(neighborNode);

            }
        }

        //update currentNode type to closed 
        await delay(150 +delayValue);
        grid.updateCurrentNodeColor(tempNodeType,currentNode);
     
        
        //grid.updateHTMLGrid();
        grid.updatePortionGrid(neighbors_CSS);
        grid.updateInnerHtmlCell(neighbors_CSS, true);
        await delay(delayValue); // Introduce a delay
       
    }

    return finalPath;
}
