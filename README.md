### A Vue component to render a [John Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
Demo

#### Install
```
npm install vue-game-of-life --save
```
#### Example

Import and register the plugin as usual

```javascript
import GameOfLife from 'vue-game-of-life'

Vue.use(GameOfLife);
```

Then use it as you would with any component

```html
<game-of-life></game-of-life>
```

### Configuration

The following props can be sent to the component:

| Name          | Type          | Default           | Desctiption                       |
|---------      |-----------    |---------------    |--------------------------------   |
| cols          | Number        | 100               | Number of columns                 |
| rows          | Number        | 100               | Number of rows      |
| cellWidth     | Number        | 5                 | Width of each cell              |
| tickInterval  | Number        | 100               | Time between each 'tick' in milliseconds                      |
| color         | String        | #ddd              | Color to display the alive cells          |
| alivePercent  | Number        | 10                | Initial percent of alive cells                     |
