import React from 'react';

class BackpackMenu extends React.Component {
  handleCraft = (item) => {
    this.props.onCraft(item);
  }

  handleWeaponSelect = (weapon) => {
    this.props.onWeaponSelect(weapon);
  }

  render() {
    const { inventory } = this.props;

    return (
      <div>
        <h2>Inventory</h2>
        <ul>
          {Object.entries(inventory).map(([item, count]) => (
            <li key={item}>
              {item}: {count}
              <button onClick={() => this.handleCraft(item)}>Craft</button>
              <button onClick={() => this.handleWeaponSelect(item)}>Select Weapon</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BackpackMenu;
