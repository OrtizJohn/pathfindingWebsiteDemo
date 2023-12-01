import node from "/static/node.js";
import delay from "/static/utils.js";
import PriorityQueue from '/static/priorityQueue.js';
/* https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2
    A star algorithm 
    write psuedo code for testing here ...
		add start node to openLIst 

		while open list not empty
			currentNOde = minF score node

			remove currentNode from OpenList
			add to closed list

			check if endnode == current node
				backtrack...
			find qualifying neighbors 
			run through neighbors
				update all scores 
				check if neibors on openList 
					if yes 
						check gScore lower than one on openLIst 
							if yes replace gScore and do not add neighbor to open list
					if no
						add neighbors to open list
*/

export default async function aStar(grid,delayValue){

	let openList =[];
	let closedList=[];

	console.log("StartNode: ", grid.startNode.id, " TargetNode: ", grid.targetNode.id)

	//add start node to openlist
	openList.push(grid.startNode);
	grid.startNode.fScore = 0; 

	let passCt = 0;
	let finalPath =[];
	let prevNode = null;
	let currentNode = null;
	while (openList.length != 0){
		//step1 select min fscore 
		//need to change here so it does not get stuck on same issue
		let currentResults = minFscore(openList,prevNode);
		

		prevNode = currentNode;
		currentNode = currentResults.minNode;
		let currentIdx = currentResults.minIndex;

		

		let tempNodeType = currentNode.nodeType;
        currentNode.nodeType = "current";
        grid.updateCurrentCell(currentNode);

		console.log("____________________");
		console.log(passCt," -Current Node: ",currentNode.id, currentIdx);

		//step2 remove currentnode from open list and add to closed list
		//openList.pop(currentIdx);
		openList.splice(currentIdx,1);
		closedList.push(currentNode);

		//step3 check if currentNode is endNode //FIx here 
		if(currentNode.id == grid.targetNode.id){
			console.log("hit target Node!!");
			console.log("Backtracking path...");
			while (currentNode.id != grid.startNode.id){
				finalPath.push(currentNode.id);
				console.log(currentNode.id);
				if(currentNode.parent == null){
					console.log("Ripp");
				}
				currentNode = currentNode.parent;
			}
		
			return finalPath;
		}
		


		//step4 check all children
		let neighborsAdjustment = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
		let neighbors = [];
		let neighborsCSS =[];
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

			let newNeighborNode;
			if(  neighborNode.nodeType !== "start" && neighborNode.nodeType !== "target" && neighborNode.nodeType !== "obstacle") {
				
				neighborNode.nodeType= "neighbor";
				newNeighborNode = new node(neighborNode.id, "neighbor");
						
			}
			else{
				newNeighborNode = new node(neighborNode.id, neighborNode.nodeType);
			}
			
			//new node for aStar method
			
			newNeighborNode.parent = currentNode;//set parent as current node
			
			
			neighbors.push(newNeighborNode);
		}
		//update currentNode type to closed 
        await delay(150 +delayValue);
        grid.updateCurrentNodeColorAstar(tempNodeType,currentNode);
		//call to refresh html
		grid.updatePortionGrid(neighbors);
		//grid.updatePortionGrid(neighborsCSS);
        await delay(delayValue);

		//step 5 loop through neighbors 

		for (let i=0; i<neighbors.length;i++){

			for (let j=0 ; j< closedList.length;j++){
				if( neighbors[i].id == closedList[j].id ){
					continue;
				}
			}
			neighbors[i].gScore = Number(currentNode.gScore) + 1;
			neighbors[i].hScore = hScoreF(neighbors[i], grid.targetNode);
			neighbors[i].fScore = Number(neighbors[i].gScore) + Number(neighbors[i].hScore);

			let found = false;
			for (let j = 0; j < openList.length; j++) {
				if (neighbors[i].id == openList[j].id) {
					found = true;
					if (neighbors[i].gScore < openList[j].gScore) {
						
						openList[j].gScore = neighbors[i].gScore;
						openList[j].fScore = neighbors[i].fScore;
						openList[j].parent = neighbors[i].parent;
					}
					break;
				}
			}

		if (!found) {
			openList.push(neighbors[i]);
		}
	
		}

		

		passCt= passCt +1;
	}

} 

function hScoreF(tempNode,endNode){
	let tempNodeCoord = tempNode.getCoord();
	let endNodeCoord = endNode.getCoord();
	let deltaX = Number(tempNodeCoord[0])- Number(endNodeCoord[0]);
	let deltaY = Number(tempNodeCoord[1])- Number(endNodeCoord[1]);
	let hScore = Number(deltaX ** 2) + Number(deltaY **2);
	//console.log("Node", tempNode.id, "- hScore: ", hScore);
	return hScore;
}

function minFscore(arr,prevNode){
	let minNode = arr[0];
	let minIndex = 0;
	if(prevNode == null){
		for (let i=1;i<arr.length;i++){
			if(arr[i].fScore < minNode.fScore){
				minNode = arr[i]
				minIndex = i;
			}
			else if(arr[i].fScore == minNode.fScore){
				if(arr[i].hScore < minNode.hScore){
					minNode = arr[i];
					minIndex = i;
				}
			}
		}
		//console.log("Selected CurrentNode = ",minNode, "--", minIndex);
	}
	else{
		if(minNode.id == prevNode.id){
			minNode = arr[1];
			minIndex = 1;
		}
		let ctStart = minIndex;
		for (let i=ctStart+1;i<arr.length;i++){
			if(arr[i].id != prevNode.id){
				if(arr[i].fScore < minNode.fScore){
					minNode = arr[i]
					minIndex = i;
				}
				else if(arr[i].fScore == minNode.fScore){
					if(arr[i].hScore < minNode.hScore){
						minNode = arr[i];
						minIndex = i;
					}
				}
			}
			
		}
		console.log("Selected CurrentNode = ",minNode, "--", minIndex);
	}
	return {minNode,minIndex};
}

