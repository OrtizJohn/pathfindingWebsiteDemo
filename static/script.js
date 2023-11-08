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
          this.updateGridFinalPath(finalPath,gridHtml);
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
      }
      
  }
}

document.addEventListener('DOMContentLoaded', function() {
  
  const grid1 = document.getElementById('grid');
  let controller = new Controller();

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
  });

  //Add event listner to generate grid
  document.getElementById('generateGrid').addEventListener('click', function() {
    //hide img
    if(document.getElementById('gridImage')){
      document.getElementById('gridImage').remove();
    }
    
    
    //remove all children first if any exist
    if(grid1.childNodes){
        grid1.innerHTML = '';
    }
    //clear old version if there was one
    if(controller.uniqueGrid != null){
        controller.uniqueGrid= null;
    }
    controller.createGrid(50,85);
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
    // Set up grid layout
    /* grid1.style.gridTemplateColumns = `repeat(${newGrid.m}, 30px)`;
    grid1.style.gridTemplateRows = `repeat(${newGrid.n}, 30px)`; */
    console.log("Generated new Grid")
  });

});



