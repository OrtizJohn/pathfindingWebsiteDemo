import delay from "/static/utils.js";

/*BFS PSUEDO
Assumption: As bfs is meant for nodes the grid displayed will act as graph as each cell/node will have a path to another if that cell/node is adjacent and is not a wall/obstacle
1-create to lists one
    openList (queue ) will be used to cycle through all nodes
    closedList(set) will be used to mark which nodes have been visited
2-Add start node to openList 
3-Create while loop to run till openList is not empty
    currentNode = first node openList
    if(target = currentNode)
        break
        backtrack path

    add all neighbor nodes (defined to be adjacent nodes) to openList
 */

export default async function bfs(grid,delayValue){
    let openList =[];
	let closedList = new Set();
    let finalPath = [];

	//console.log("StartNode: ", grid.startNode.id, " TargetNode: ", grid.targetNode.id)

	//add start node to openlist
	openList.push(grid.startNode);

    while(openList.length >0){
        let currentNode = openList.shift();
        //console.log("____________________");
		//console.log(" -Current Node: ",currentNode.id);

        if(currentNode == undefined){
            throw Error("Open list must be empty as current node is being returned: undefined");
        }

        //check if target node hit
        if(currentNode.id == grid.targetNode.id){
            console.log("Hit target!!!");
            
            //console.log("Backtracking path...");
			while (currentNode.id != grid.startNode.id){
				finalPath.push(currentNode.id);
				//console.log(currentNode.id);
				if(currentNode.parent == null){
					console.log("Ripp");
				}
				currentNode = currentNode.parent;
			}
		
			return finalPath; 
        }


        //step4 check all children
		let neighborsAdjustment = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
        let neighbors_CSS =[];
		for (let i = 0; i < neighborsAdjustment.length; i++) {
			let posAdj = neighborsAdjustment[i];
			var neighborPosX = Number(currentNode.getCoord()[0]) + Number(posAdj[0]);
			var neighborPosY = Number(currentNode.getCoord()[1]) + Number(posAdj[1]); 
			
			

			//in borders
			if ( neighborPosX <0 || neighborPosX >= grid.n || neighborPosY <0 || neighborPosY >= grid.m ){
				continue;
			}

			//html edits here
			let neighborNode = grid.nodes[neighborPosX][neighborPosY];
			//not wall/blocked of area
			if( neighborNode.nodeType == "obstacle"){
				continue;
			}

			if(  neighborNode.nodeType != "start" && neighborNode.nodeType != "target" && neighborNode.nodeType != "obstacle") {
				neighborNode.nodeType= "neighbor";
				
			}
			
            //console.log("Neighbor: ", neighborNode.id);
            
			
            if(!closedList.has(neighborNode)){
                neighborNode.parent=currentNode;
                closedList.add(neighborNode)
			    openList.push(neighborNode); //add neighbors to openList
                neighbors_CSS.push(neighborNode);
            }
            
		}

		//call to refresh html
        grid.updatePortionGrid(neighbors_CSS);
        await delay(delayValue);

        //break;

    }



}