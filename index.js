function board(n){
  this.row = Array(n).fill(0);
  this.col = Array(n).fill(0);
  this.f = 0;
  this.b = 0;
  this.n = n;

  this.move = function(row, col, player){
    if (player === 0){
      var val = -1;
    }
    else {
      var val = 1;
    }
    this.row[row] += val;
    this.col[col] += val;

    if (row === col){
      this.f += val;
    }

    if (row+col === this.n-1){
      this.b += val;
    }

    var temp = this.n*val;

    if (temp === this.f || temp == this.b || temp === this.row[row] || temp === this.col[col]){
      return player
    }

    return -1
  }
}

document.getElementById('start').addEventListener('click', startGame);

function startGame(){

  var n = Math.floor(document.getElementById('size').value);

  var grid = '';
  for (var i = 0; i < n; i++){
    var block = "<div class = 'layer'>";
    for (var j = 0; j < n; j++){
      block += `<button class="btn btn-outline-primary tile" type="button" name="button" id = '${(i*n)+j}'></button>`;
    }
    block += '</div>';
    grid += block;
  }
  grid += "<h2></h2>"

  // console.log(grid);
  document.getElementById('board').innerHTML = grid;
  document.querySelector('a').innerHTML = 'Play Again';
  // document.querySelectorAll('.layer').style.padding = '3px';



  var game = new board(n);
  var tiles = document.querySelectorAll('.tile');
  var l = tiles.length;
  var count = 0;
  for (var i = 0; i < l; i++ ){
    tiles[i].addEventListener('click', function(event) {
      var player = count%2;
      var curName = 'Player1';
      var id = this.id;
      var id = Math.floor(id);
      console.log(`id is ${id} `);
      var status = 0;
      if ( player === 0){
        this.innerHTML = 'X';
        status = game.move(Math.floor(id/n), id%n, 0);
        curName = 'Player1';
        this.disabled = true;
      }
      else{
        this.innerHTML = 'O';
        status = game.move(Math.floor(id/n), id%n, 1);
        curName = 'Player2';
        this.disabled = true;
      }


      if (status !== -1){
          console.log(player);
          for (var j = 0; j < l; j++){
            tiles[j].disabled = true;
          }
          document.querySelector('center h2').innerHTML = `${curName} Won!🚩`;
      }
      count += 1
      if (count === n*n){
        document.querySelector('center h2').innerHTML = `Draw! 🚩`;
      }
      this.style.fontSize = '50px';
    })
  }

}
