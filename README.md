# deni-react-popover-selector
A modern popover selector for React

[DEMOS](https://denimar.github.io/deni-react-popover-selector/)


# Usage

```javascript

import PopoverSelector from 'deni-react-popover-selector'
...

  onChangedItems(selectedItems, itemsToSelect) {
    console.log(selectedItems)
  }

  onGetTextItem(itemsToRender) {
    return itemsToRender.id + ' - ' + itemsToRender.text;
  }

  <PopoverSelector
    items={ items }
    selectedItems={ this.state.selectedItems }
    onChangedItems={ this.onChangedItems.bind(this) }
    onGetTextItem={ this.onGetTextItem.bind(this) }
  >
  </PopoverSelector>
  
  const items = [
    {
      id: 1,
      text: 'Item 01'
    },
    {
      id: 2,
      text: 'Item 02'
    },
    ...
  ]

...
  
## Author

[Denimar de Moraes](http://github.com/denimar) (denimar@gmail.com) is a full-stack developper at the Wplex, Florianópolis, Santa Catarina, Brazil.
