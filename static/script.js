import grid from "/static/grid.js";
//import Controller from "/static/controller.js";
import aStar from "/static/algorithms/aStar.js";
import dijkstra from "/static/algorithms/dijkstra.js";
import bfs from "/static/algorithms/bfs.js";
import dfs from "/static/algorithms/dfs.js";

/*Create controller class for controlling different algorithms*/
class Controller {
  constructor(){
      this.uniqueGrid = null;
      this.algorithm = null;
      this.algorithmStarted = 0;

  }
  createGrid(n,m){
      this.uniqueGrid = new grid(n,m);
  }
  getGrid(){
      return this.uniqueGrid;
  }
  updateGridFinalPath(finalPath,gridHtml){
    for (let i =1; i<finalPath.length;i++){
      console.log(finalPath[i]);
      let result = finalPath[i].split('-');
      this.uniqueGrid.nodes[result[0]][result[1]].nodeType = "path";
    }
    this.uniqueGrid.updateHTMLGrid();
  }
  

  async callAlgorithm(algo, gridHtml){

       // Disable generateGrid button 
      const generateGridButton = document.getElementById('generateGrid');
      const runAlgorithmButton = document.getElementById('runAlgorithm');
      generateGridButton.disabled = true;
      runAlgorithmButton.disabled = true;


      this.algorithm = algo;
      const delaySlider = document.getElementById('delaySlider');
      const delayValue = parseInt(delaySlider.value);
      let finalPath;

      console.log("Set algorithm:", this.algorithm);

      if(this.uniqueGrid == null){
        console.log("Grid is Null Erroring out");
      }
      else{
        if(algo == "Dijkstra's"){
          finalPath = await dijkstra(this.uniqueGrid,delayValue);
          this.updateGridFinalPath(finalPath,gridHtml);
        }
        else if(algo == "A* Algorithm"){
          
          finalPath = await aStar(this.uniqueGrid,delayValue);
          //this.updateGridFinalPath(finalPath,gridHtml);
          //this.uniqueGrid.updateHTMLGrid(gridHtml);
        }
        else if(algo == "BFS"){
          finalPath = await bfs(this.uniqueGrid,delayValue);
          this.updateGridFinalPath(finalPath,gridHtml);
        }else if(algo == "DFS"){
          finalPath = await dfs(this.uniqueGrid,delayValue);
          console.log("Made it back should change color now");
          this.updateGridFinalPath(finalPath,gridHtml);
        }

        // Enable generateGrid button
        generateGridButton.disabled = false;
        runAlgorithmButton.disabled = false;
      }
      
  }
}

function showPopup(header, content, listItem1,listItem2,listItem3,listItem4) {
  const popupContainer = document.querySelector('.popup-container');
  const popupHeader = document.querySelector('.popup-header');
  const popupContent = document.querySelector('.popup-content');

  popupHeader.textContent = header;
  popupContent.textContent = content;

  //setListInstructions
  document.getElementById("ins1").textContent = listItem1;
  document.getElementById("ins2").textContent = listItem2;
  document.getElementById("ins3").textContent = listItem3;
  document.getElementById("ins4").textContent = listItem4;

  popupContainer.style.display = 'block';
}
function updateAlgoDescription(){
  // Get the selected value from the dropdown
  const selectedAlgorithm = document.getElementById('algorithm').value;

  // Update the algorithm name and description in the DescriptionBar based on the selected value
  const algoNameDB = document.getElementById('algoNameDB');
  const algoDescrDB = document.getElementById('algoDescrDB');
  const timeComplexity = document.getElementById('timeComplexity');
  const spaceComplexity = document.getElementById('spaceComplexity');

  // Example logic: Update the algorithm name and description based on the selected value
  if (selectedAlgorithm === 'Dijkstra\'s') {
    algoNameDB.textContent = 'Dijkstra\'s Algorithm (using priority queue)';
    algoDescrDB.textContent = 'This algorithm with a priority queue utilizes node weights to represent edge weights between cells, randomly generated between 0 and 1 in this scenario, showcasing algorithmic principles rather than practical application. Unlike BFS, it commences exploration from neighbors with the lowest weights, aiming to find the shortest path by prioritizing nodes with the smallest accumulated distance. The algorithm iteratively explores neighboring nodes, updating their distances based on the current minimum distance, ultimately determining the shortest path from a source node to all other nodes in the graph by maintaining a priority queue.';
    timeComplexity.textContent = 'O(V + E log V), where V represents the number of nodes/cells in the graph (rows x columns), E is the number of edges which in this case will be porportional to number of nodes ';
    spaceComplexity.textContent = 'O(V), where V (rows x columns) in the worst case based on priority queue data structure';
  } else if (selectedAlgorithm === 'A* Algorithm') {
    algoNameDB.textContent = 'A* Algorithm';
    algoDescrDB.textContent = 'This heuristic-based algorithm utilizes node weights to represent edge costs between cells, typically as actual distances or estimations, aiding in efficient pathfinding. Unlike DFS nor BFS, it employs a heuristic function (often the sum of actual cost from the start to the currentNode and estimated remaining cost to the goal) guiding the search towards the goal node, balancing cost and exploration. The algorithm evaluates nodes with the lowest combined actual and heuristic cost, gradually determining the shortest path from a source node to a target by leveraging a priority queues or similar data structures.';
    timeComplexity.textContent = 'O((V + E) log V), note that A* outperforms dijkstra\'s in most case when the hueristic is well informed, however in worst case scenarios it can expand nodes in a similar time scale as Dijkstra\'s';
    spaceComplexity.textContent = 'O(V), where V is the number of nodes/cells in the graph (rows x columns) in the worst-case scenario, relying on data structures such as priority queues.';

  }
  else if (selectedAlgorithm === 'BFS') {
    algoNameDB.textContent = 'Breadth First Search Algorithm';
    algoDescrDB.textContent = 'BFS systematically explores nodes in levels, starting from the source node and traversing adjacent nodes before progressing to deeper levels. Unlike A*, it does not utilize edge weights but instead focuses on breadth-first exploration to find the shortest path. The algorithm gradually explores neighboring nodes, marking visited nodes and recording their distance from the source, finally determining the shortest path from the source node to all other nodes in the graph.';
    timeComplexity.textContent = 'O(V + E), where V represents the number of nodes/cells in the graph (rows x columns), and E is the number of edges, similar to dfs. Differs in only how they traverse as bfs explores nodes level by level, in worst case yield similar results.';
    spaceComplexity.textContent = 'O(V), where V is the number of nodes/cells in the graph (rows x columns), employing data structures like queues for breadth-first exploration.';

  }
  else if (selectedAlgorithm === 'DFS') {
    algoNameDB.textContent = 'Depth First Search Algorithm';
    algoDescrDB.textContent = 'DFS explores as far as possible along each branch before backtracking, employing a stack-like structure or recursion. Similar to BFS, it doesn\'t consider edge weights. Unlike both A* and BFS, it focuses on depth-first exploration, potentially reaching nodes deeper in the graph. The algorithm iteratively explores adjacent unvisited nodes, gradually determining paths from a source node, usually prioritizing depth-first traversal over finding the shortest path.';
    timeComplexity.textContent = 'O(V + E), where V represents the number of nodes/cells in the graph (rows x columns), and E is the number of edges. It differs in only how they traverse as dfs explores as deeply as possible along each branch but in worst case yield similar results..';
    spaceComplexity.textContent = 'O(V), where V is the number of nodes/cells in the graph (rows x columns), relying on recursion or a stack-like structure for depth-first exploration.';

  }
}

document.addEventListener('DOMContentLoaded', function() {
  
  const grid1 = document.getElementById('grid');
  let controller = new Controller();


  //////////////////////////////////////////////////////////////////////////
  //add event listner for popUp
  const popupContainer = document.querySelector('.popup-container');
  const popupClose = document.querySelector('.popup-close');

  // Close the popup when the close button is clicked
  popupClose.addEventListener('click', function () {
    popupContainer.style.display = 'none';
  });

  showPopup("Welcome!!","This website is built to demostrate some of the most common algorithms for pathfinding. There is a navigation bar that offers a selection of common pathfinding algorithms, generates a grid to run the algorithms, a button to run them, and delay for speeding up/slowing down the time it takes for algorithm to run. All algorithms will be tested on a grid of 50(rows) and 80(columns) in cells. Neighbors will be considered as all adjacent cell/nodes including diagonals, hence for a single node there should be 8 neigbors unless a cell/node is a wall (which act as obstacles as is common in most pathfinding problems). To run the website as intended follow these steps:","1- Generate a fresh grid (with generate grid button)","2- Select which algorithm wanted to demonstrate (with the dropdown menu)","3- Select the rate the algorithm should run (with the delay slider)", "4- Click the run button to see the algorithm in action (Pop up will go way when run button clicked or by pressing x)")
  ////////////////////////////////////////////////////////////////////

  //add even listener for slider
  const delaySlider = document.getElementById('delaySlider');
  const delayValueDisplay = document.getElementById('delayValue');
  delaySlider.addEventListener('input', function() {
    const delayValue = this.value;
    delayValueDisplay.textContent = delayValue;
  });

  // Add event listener to run algo button
  document.getElementById('runAlgorithm').addEventListener('click', function() {
    const algorithm = document.getElementById('algorithm').value;
    controller.callAlgorithm(algorithm,grid1);
    // remove welcome popUp to algo run
    if(popupContainer.style.display != 'none'){
      popupContainer.style.display = 'none';
    }
  });

  //Add event listner to generate grid
  document.getElementById('generateGrid').addEventListener('click', function() {
    //hide img
    if(document.getElementById('gridImage')){
      document.getElementById('gridImage').remove();
    }
    //reveal information
    if(document.getElementById('DescriptionBar').style.display != 'flex'){
      document.getElementById('DescriptionBar').style.display= 'flex';
    }
    
    
    //remove all children first if any exist
    if(grid1.childNodes){
        grid1.innerHTML = '';
    }
    //clear old version if there was one
    if(controller.uniqueGrid != null){
        controller.uniqueGrid= null;
    }
    controller.createGrid(50,80);
    //let newGrid = controller.getGrid();
    //newGrid.updateHTMLGrid(grid1);
    let newGrid = controller.getGrid();
    for (let r = 0; r < newGrid.n; r++) {
        for (let c=0; c< newGrid.m; c++){

            const cell = document.createElement('div');
            let newNode = newGrid.getNode(r,c);
            cell.id= newNode.id;
            cell.classList.add('cell');
            
            cell.classList.add(newNode.nodeType);
            
            grid1.appendChild(cell); 
        }
        
    }
    grid1.style.gridTemplateColumns = `repeat(${newGrid.m}, 30px)`;
    grid1.style.gridTemplateRows = `repeat(${newGrid.n}, 30px)`;
   
    console.log("Generated new Grid")
    
  
    
  });


  //add event listener on algorithm change 
  document.getElementById('algorithm').addEventListener('change',function () {
    updateAlgoDescription();
  });
  document.getElementById('algorithm').addEventListener('change', updateAlgoDescription());


});



