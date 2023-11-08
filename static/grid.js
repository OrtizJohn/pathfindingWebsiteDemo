import node from "/static/Node.js";

export default class grid {
    constructor(n, m){
        this.n = n;
        this.m = m;
        this.startNode = null;
        this.targetNode = null;
        this.nodes = [];

        //this.openList = [];
        //this.closedList =[];
        

        

        

        for (let r = 0; r < n; r++) {
            let row = [];
            for (let c = 0; c < m; c++) {
              let newNode = new node(`${r}-${c}`, "empty");
              row.push(newNode);
            }
            this.nodes.push(row);
        }



        const start_row = Math.floor(Math.random() * 4); // Random integer between 0 and 3 (inclusive)
        const start_col = Math.floor(Math.random() * m); // Random integer between 0 and n-1 (inclusive)

        const end_row = Math.floor(Math.random() * 3) + n - 3; // Random integer between n-3 and n-1 (inclusive)
        const end_col = Math.floor(Math.random() * m); // Random integer between 0 and n-1 (inclusive)
        
        console.log(start_row,start_col,end_row,end_col)
        
        this.startNode = this.nodes[start_row][start_col];
        this.targetNode = this.nodes[end_row][end_col];

        this.nodes[start_row][start_col].nodeType = "start";
        this.nodes[end_row][end_col].nodeType = "target";

        for (let r =0 ; r<n ; r++){
            for (let c=0; c<m; c++){
                if ((r === start_row && c === start_col) || (r === end_row && c === end_col)) {
                    continue;
                }
                
                const blocked = Math.floor(Math.random() * 4); // Random integer 0 or 1
                if (blocked === 1) {
                    // This point is blocked
                    this.nodes[r][c].nodeType = "obstacle"
                    //console.log(this.nodes[r][c].id,"-",this.nodes[r][c].nodeType)

                }
                
            }
        }
    }
    getStartNode(){
        return getNode()
    }
    getNode(r, c) {
        return this.nodes[r][c];
    }
    updatePortionGrid(updateNodes){
        updateNodes.forEach(updateNode => {
            const cell = document.getElementById(updateNode.id);
            cell.className = 'cell ' +updateNode.nodeType;
        });
    }
    updateHTMLGrid(){
        for (let r = 0; r < this.n; r++) {
            for (let c=0; c< this.m; c++){
                const cell = document.getElementById(this.nodes[r][c].id);
                cell.className = 'cell ' + this.nodes[r][c].nodeType;
                
            }  
        }

        /* if(gridHTML.childNodes){
            gridHTML.innerHTML = '';
        }
        for (let r = 0; r < this.n; r++) {
            for (let c=0; c< this.m; c++){
    
                const cell = document.createElement('div');
                let newNode = this.getNode(r,c);
                cell.id= newNode.id;
                cell.classList.add('cell');
                
                cell.classList.add(newNode.nodeType);
                
                gridHTML.appendChild(cell); 
            }
            
        }
        gridHTML.style.gridTemplateColumns = `repeat(${this.m}, 30px)`;
        gridHTML.style.gridTemplateRows = `repeat(${this.n}, 30px)`; */
        
    }
    
}