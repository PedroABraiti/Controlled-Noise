let cols = 400; // Número de colunas
let rows = 200; // Número de linhas
let cellSize = 4; // Tamanho de cada célula
let grid = []; // Armazena as células

let whiteNeighboursCount = 3; // Quantos vizinhos de cor 255 a celula deve ter para se trabsformar em 255
let blackNeighboursCount = 4; // Quantos vizinhos de cor 0 a celula deve ter para se trabsformar em 0
let chanceWhite = 35; // Porcentagem de chance de um pixel ser branco (0 a 100)

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);
  initializeGrid();
  noLoop(); // Desenha apenas uma vez
}

function initializeGrid() {
  // Inicializa a grid com valores aleatórios
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      // Se estiver na borda, a célula é preta, caso contrário, valor aleatório
      if (i === 0 || i === cols - 1 || j === 0 || j === rows - 1) {
        grid[i][j] = 0; // Preto
      } else {
        // Define o valor aleatoriamente com base na porcentagem fornecida
        grid[i][j] = random(100) < chanceWhite ? 255 : 0; // Branco (255) ou preto (0)
      }
    }
  }
}

function applyRules() {
  // Ajusta as células internas de acordo com os vizinhos
  let newGrid = JSON.parse(JSON.stringify(grid)); // Cria uma cópia da grid

  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let whiteCount = 0;
      let blackCount = 0;

      // Checa todos os 8 vizinhos ao redor
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x !== 0 || y !== 0) {
            // Conta a quantidade de vizinhos brancos e pretos
            if (grid[i + x][j + y] === 255) {
              whiteCount++;
            } else {
              blackCount++;
            }
          }
        }
      }

      // Ajusta a célula com base nas regras
      if (whiteCount > whiteNeighboursCount) {
        newGrid[i][j] = 255; // Torna-se branca
      } else if (blackCount > blackNeighboursCount) {
        newGrid[i][j] = 0; // Torna-se preta
      }
    }
  }

  grid = newGrid; // Atualiza a grid com os novos valores
}

function draw() {
  // Desenha a grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(grid[i][j]);
      noStroke();
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

function mousePressed() {
  applyRules(); // Aplica as regras ao clicar
  redraw(); // Redesenha a grid com a nova configuração
}
