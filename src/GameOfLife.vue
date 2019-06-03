<template>
    <div>
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
        <slot :ticks="ticks" :cells-alive="cellsAlive" :cells-dead="rows * cols - cellsAlive">
        </slot>
    </div>
</template>

<script>

    export default {
        name: 'GameOfLife',

        props: {
            cols: {
                type: Number,
                required: false,
                default: 100
            },
            rows: {
                type: Number,
                required: false,
                default: 100,
            },
            cellWidth: {
                type: Number,
                required: false,
                default: 5,
            },
            tickInterval: {
                type: Number,
                required: false,
                default: 100,
            },
            color: {
                type: String,
                required: false,
                default: '#ddd',
            },
            alivePercent: {
                type: Number,
                required: false,
                default: 10,
            }
        },

        data() {
            return {
                ticks: 0,
                cellsAlive: 0,
                cells: [],
                temp: [],
                ctx: null,
            }
        },

        mounted() {
            this.ctx = this.$refs.canvas.getContext('2d');
            this.ctx.fillStyle = this.color;

            this.createCells();
            setInterval(this.tick, this.tickInterval);
        },

        computed: {
            canvasWidth() {
                return this.rows * this.cellWidth;
            },

            canvasHeight() {
                return this.cols * this.cellWidth;
            }
        },

        methods: {
            tick() {
                this.ctx.clearRect(0, 0, this.rows * this.cellWidth, this.cols * this.cellWidth);
                let cellsAlive = this.cellsAlive = 0;

                for (let row = 0; row < this.rows; row++) {
                    for (let col = 0; col < this.cols; col++) {
                        let alive = this.temp[row][col] = this.isAlive(row, col, this.cells[row][col]);

                        if (alive) {
                            cellsAlive++;
                            this.drawSquare(row, col);
                        }
                    }
                }

                this.ticks++;
                this.cellsAlive = cellsAlive;
                this.cells = JSON.parse(JSON.stringify(this.temp));
            },

            drawSquare(row, col) {
                this.ctx.fillRect(row * this.cellWidth,col * this.cellWidth,this.cellWidth,this.cellWidth);
            },

            isAlive(row, col, isCurrentlyAlive) {
                let aliveNeighbors = isCurrentlyAlive ? -1 : 0;

                loop1:
                for (let rowIndex = row - 1; rowIndex <= row +1; rowIndex++) {
                    let rowToCheck = rowIndex == -1 ? this.rows -1 : rowIndex == this.rows ? 0 : rowIndex;

                    for (let colIndex = col - 1; colIndex <= col +1; colIndex++) {
                        let colToCheck = colIndex == -1 ? this.cols -1 : colIndex == this.cols ? 0 : colIndex;

                        if (this.cells[rowToCheck][colToCheck]) {
                            aliveNeighbors++
                        }

                        if (aliveNeighbors === 4) {
                            break loop1;
                        }
                    }
                }

                return ! isCurrentlyAlive && aliveNeighbors === 3 || (isCurrentlyAlive && aliveNeighbors === 2 || aliveNeighbors === 3)
            },

            createCells() {
                for (let row = 0; row < this.rows; row++) {
                    for (let col = 0; col < this.cols; col++) {
                        if (!this.cells[row]) {
                            this.temp[row] = this.cells[row] = [];
                        }
                        this.cells[row][col] = this.randomBool();
                    }
                }
            },

            randomBool() {
                return  Math.random() * 10 < this.alivePercent / 10;
            }
        }
    }

</script>
