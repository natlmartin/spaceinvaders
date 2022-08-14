// define state and behaviour needed
const state = {
    numCells: (600/40) * (600/40), 
    cells: [],
    shipPosition: 217,
    alienPositions: [
    3, 4, 5, 6, 7, 8, 9, 10,11,
    18,19,20,21,22,23,24,25,26,
    33,34,35,36,37,38,39,40,41,
    48,49,50,51,52,53,54,55,56
      ],
    score: 0
}

const setupGame = (element) => {
    state.element = element
    // draw the grid
    drawGrid ()
    // draw the spaceship
    drawShip()
    // draw the aliens
    drawAliens()
    // add the instructions and the score
    drawScoreboard() 
}

const drawGrid = () => {
    // create the containing element
    const grid = document.createElement('div')
    grid.classList.add('grid')
    // create a lot of cells = 15x15 (225)
    for (let i=0; i<state.numCells; i++) {
        // create a cell
        const cell = document.createElement('div')
        // append the cell to the grid
        grid.append(cell)
        // store the cell in game state
        state.cells.push(cell)
    }
    // append the cells to the element and the containing element to the app 
    state.element.append(grid)
}


  const drawShip = () => {
    // find the current position 
    // find the bottom row, middle cell, add a bg image
    state.cells[state.shipPosition].classList.add('spaceship')
}

const controlShip = (event) => {
    if (state.gameover) return
  // if the key pressed is left
  if (event.code === 'ArrowLeft') {
    moveShip('left')
  //if right
  } else if (event.code === 'ArrowRight') {
    moveShip('right')
  // if space
  } else if (event.code === 'Space') {
      fire ()
  }
}

const moveShip = (direction) => {
    //remove image from current position
    state.cells[state.shipPosition].classList.remove('spaceship')
    if (direction === 'left' && state.shipPosition % 15 !== 0) {
      state.shipPosition--
    } else if (direction === 'right' && state.shipPosition % 15 !== 14) {
        state.shipPosition++
    }
    // figure out the delta
    //add image to new position
    state.cells[state.shipPosition].classList.add('spaceship')
}

const fire = () => {
    // use an interval: run some code repeatedly each time after a specified time
    let interval
    // laser starts at the ship position
    let laserPosition = state.shipPosition
    interval = setInterval() = {
    // remove the laser image
    state.cells[laserPosition].classList.remove('laser')
    // decrease (move up a row) the laser position
    laserPosition = 15
    // check we are still in bounds
    if (laserPosition < 0) {
        clearInterval(interval)
        return
    }
  }
}

    // if there is an alien BOOM!
    // clear the interval, remove alience image, remove alien from alien positions, add the boom image, set a timeout to remove the boom image
    if (state.alienPositions.includes(laserPosition)) {
        clearInterval(interval)
        state.alienPositions.splice(state.alienPositions.indexOf(laserPosition), 1)
        state.cells[laserPosition].classList.remove('alien')
        state.cells[laserPosition].classList.add('hit')
        state.score++
        state.scoreElement.innerText = state.score
        setTimeout(() => {
            state.cells[laserPosition].classList.remove('hit')
        }, 200)
        return
    }

    // add the laser image
    state.cells[laserPosition].classList.add('laser')
  }, 100
}

const drawAliens = () => {
    // adding the aliens to the grid -> need to store position of the aliens to the game state
    state.cells.forEach((cell, index) => {
        // remove any alien images
        if (cell.classList.contains('alien')) {
            cell.classList.remove('alien')
        }
        // add the image to the cell if the index is in an alien position
        if (state.alienPositions.includes(index)) {
            cell.classList.add('alien')
        } 
    })
}

const play = () => {
    // start the march of the aliens! 
    let interval 
    // starting direction
    let direction ='right'
interval = setInterval() => {
    let movement
    if (direction === 'right') {
         // if right and at edge, increase position by 15, decrease 1
        if (atEdge('right'))  {
            movement = 15 - 1
            direction = 'left'
        } else {
        // if right, increase position by 1
          movement = 1
        }
    } else if (direction === 'left') {
            // if left and at edge, increase position by 15, increase 1
        if (atEdge('left')) {
            movement = 15 + 1
            direction = 'right'
        } else {
            // if left, decrease position by 1
            movement = -1
        }
    }
    // update alien positions
    state.alienPositions = state.alienPositions.map(position => position + movement)
    // redraw aliens on the page
    drawAliens()
    // check game state (and stop aliens and ship)
    checkGameState(interval)
  } 300
        //set up ship controls
        window.addEventListener('keydown', controlShip)
  }

const atEdge = (side ) => {
    if (side === 'left') {
        // are any aliens in the left hand column?
        return state.alienPositions.some(position => position % 15 === 0)
    } else if (side === 'right') {
        // are any aliens in the right hand column? 
        return state.alienPositions.some(position => position % 15 === 14) 
    }
}

const checkGameState = (interval) => {
    // have the aliens reached the bottom?
    // are the aliens all dead? 
    if (state.alienPositions.length === 0) {
        // stop everything
        state.gameover = true
        // stop the interval
        clearInterval(interval)
        drawMessage("HUMAN WINS!")
    // if aliens reach bottom row 
    } else if (state.alienPositions.some(position => position >= state.shipPosition)) {
        clearInterval(interval)
        state.gameover = true
        // make ship explode
        // remove the ship image, add the explosion image
        state.cells[state.shipPosition].classList.remove('spaceship')
        state.cells[state.shipPosition].classList.add('hit')
        drawMessage("GAME OVER")
  }
}

const drawMessage = (message) => {
    // create a message
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    // create the heading text
    const h1 = document.createElement('h1')
    h1.innerText = message
    messageElement.append(h1)
    // append it to the app

    state.element.append(messageElement)
}

// draw Scoreboard
const drawScoreboard = () => {
    const heading = document.createElement("h1")
    heading.innerText = 'Space Invaders'
    const paragraph1 = document.createElement("p")
    paragraph1.innerText = 'Press SPACE to shoot.'
    const paragraph2 = document.createElement("p")
    paragraph2.innerText = 'Press ← and → to move'
    const scoreboard = document.createElement('div')
    scoreboard.classList.add('scoreboard')
    const scoreElement = document.createElement('span')
    scoreElement.innerText = state.score
    const heading3 = document.createElement('h3')
    heading3.innerText = 'Score: '
    heading3.append(scoreElement)
    scoreboard.append(heading, paragraph1, paragraph2, heading3)

    state.scoreElement = scoreElement
    state.element.append(scoreboard)
}

//query the page for the place to insert my game
const appElement = document.querySelector('.app')

//do all things needed to draw the game
setupGame(appElement)

// play the game - start being able to move the shop, move aliens
play()
