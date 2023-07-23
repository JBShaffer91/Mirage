import React from 'react';
import Player from './Player';
import Map from './Map';
import Controls from './Controls';
import Dialog from './Dialog';
import BackpackMenu from './BackpackMenu';
import craftingRecipes from './craftingRecipes';
import weapons from './weapons';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerPosition: { x: 2, y: 2 },
      mapLayoutCity: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 2, 1], // Gate at position (8, 1)
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],
      mapLayoutWasteland: Array(20).fill().map(() => Array(20).fill(0)),
      environment: 'city',
      gatePass: false, // Whether the player has a pass to the gate
      secretDiscovered: false, // Whether the player has discovered the secret entrance
      showDialog: false, // Whether to show the dialog
      dialogContent: '', // The content of the dialog
      inventory: {
        'scrap metal': 0,
        'solar cell': 0,
        'battery': 0,
        // ...
      },
      craftingRecipes,
      weapons,
      currentWeapon: null,
    };

    this.handleMove = this.handleMove.bind(this);
    this.switchEnvironment = this.switchEnvironment.bind(this);
    this.interact = this.interact.bind(this);
    this.craftItem = this.craftItem.bind(this);
    this.selectWeapon = this.selectWeapon.bind(this);
  }

  handleMove(direction) {
    const dx = direction === 'right' ? 1 : direction === 'left' ? -1 : 0;
    const dy = direction === 'down' ? 1 : direction === 'up' ? -1 : 0;
    const x = this.state.playerPosition.x + dx;
    const y = this.state.playerPosition.y + dy;

    const mapLayout = this.state.environment === 'city' ? this.state.mapLayoutCity : this.state.mapLayoutWasteland;

    if (
      y >= 0 && y < mapLayout.length &&
      x >= 0 && x < mapLayout[0].length
    ) {
      const tile = mapLayout[y][x];

      if (tile === 0) {
        this.setState({ playerPosition: { x, y } });
      } else if (tile === 2 && this.state.gatePass) {
        this.switchEnvironment();
      } else if (tile === 3 && this.state.secretDiscovered) {
        this.switchEnvironment();
      } else if (tile === 4 || tile === 5) {
        this.interact(tile);
      }
    }
  }

  switchEnvironment() {
    this.setState(state => ({
      environment: state.environment === 'city' ? 'wasteland' : 'city',
      playerPosition: { x: 2, y: 2 }, // Reset player position when switching environments
    }));
  }

  interact(tile) {
    if (tile === 4) {
      // Interact with NPC
      this.setState({
        showDialog: true,
        dialogContent: 'You have interacted with an NPC!',
      });
    } else if (tile === 5) {
      // Interact with item
      this.setState(state => ({
        inventory: {
          ...state.inventory,
          'Item': (state.inventory['Item'] || 0) + 1,
        },
      }));
    }
  }

  closeDialog = () => {
    this.setState({ showDialog: false });
  }

  craftItem(item) {
    const recipe = this.state.craftingRecipes[item] || this.state.weapons[item];
    if (!recipe) return;
  
    const canCraft = Object.entries(recipe).every(([material, count]) => {
      return this.state.inventory[material] >= count;
    });
  
    if (canCraft) {
      const newInventory = { ...this.state.inventory };
      Object.entries(recipe).forEach(([material, count]) => {
        newInventory[material] -= count;
      });
  
      newInventory[item] = (newInventory[item] || 0) + 1;
  
      this.setState({ inventory: newInventory });
    }
  }  

  selectWeapon(weapon) {
    if (this.state.inventory[weapon] > 0) {
      this.setState({ currentWeapon: weapon });
    }
  }

  render() {
    const mapLayout = this.state.environment === 'city' ? this.state.mapLayoutCity : this.state.mapLayoutWasteland;

    return (
      <div>
        <Player position={this.state.playerPosition} />
        <Map layout={mapLayout} playerPosition={this.state.playerPosition} />
        <Controls onMove={this.handleMove} />
        {this.state.showDialog && (
          <Dialog onClose={this.closeDialog}>
            {this.state.dialogContent}
          </Dialog>
        )}
        <BackpackMenu
          inventory={this.state.inventory}
          onCraft={this.craftItem}
          onWeaponSelect={this.selectWeapon}
        />
      </div>
    );
  }
}

export default Game;
