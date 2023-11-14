
import random
import numpy as np

from flask import Flask, render_template

app = Flask(__name__)


algorithmHeaders = ("Dijkstra's","A* Algorithm", "BFS", "DFS")
#algorithmInformation = ("Dj info", "A* information","BFS info","DFS info")

def print_grid(grid):
  for row in grid:
    print(row)

def generate_grid(n):
  grid = [[0 for i in range(n)] for j in range(n)]
  # randomly generate a start and end point
  start_row = random.randint(0, 3)
  start_col = random.randint(0, n-1)
  
  end_row = random.randint(n-3, n-1)
  end_col = random.randint(0, n - 1)
  print("startingPt", start_row, start_col)
  print("endPt", end_row,end_col)
  # mark the start and end points as blocked
  grid[start_row][start_col] = -1
  grid[end_row][end_col] = -2

  # randomly generate the rest of the blocked spaces
  for i in range(n):
    for j in range(n):
      if (i == start_row and j == start_col) or ( i == end_row and j == end_col):
        continue
      blocked = random.randint(0, 1)
      if blocked == 1:
        grid[i][j] = 1
  #print_grid(grid)
  return grid 


@app.route("/")
def root():
   #createMapHere
   
   
   return render_template("index.html", algorithmHeaders= algorithmHeaders)
    
if __name__ == "__main__":
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)