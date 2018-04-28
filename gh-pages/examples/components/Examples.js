import React from 'react'
import './Examples.scss'
import PopoverSelector from '../../../src/popover-selector/popover-selector'

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      months: [],
      selectedMonts: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        months: months,
        selectedMonts: months.slice(0, 5)
      });
    }, 1000);
  }

  onGetTextItem(itemsToRender) {
    return itemsToRender.number + ' - ' + itemsToRender.name;
  }

  onGetTooltipText(itemsToRender) {
    return itemsToRender.number + ' - ' + itemsToRender.name + ' Tooltip text here...';
  }

  onChangedItems(selectedItems, itemsToSelect) {
    console.log(selectedItems);
  }

  onItemAdded(selectedItems, itemsToSelect) {
    console.log(selectedItems);
  }

  onItemRemoved(selectedItems, itemsToSelect) {
    console.log(selectedItems);
  }

  onBeforeHide() {
    console.log('before Hide');
  }

  render() {
    const self = this;

    return (
      <div className="examples-container">

        <h1>deni-react-popover-selector - Demo</h1>
        <br />

        <PopoverSelector
          items={ this.state.months }
          selectedItems={ this.state.selectedMonts }
          onChangedItems={ this.onChangedItems.bind(this) }
          onGetTextItem={ this.onGetTextItem.bind(this) }
          onGetTooltipText={ this.onGetTooltipText.bind(this) }
          onItemAdded={ this.onItemAdded.bind(this) }
          onItemRemoved={ this.onItemRemoved.bind(this) }
          onBeforeHide={ this.onBeforeHide.bind(this) }
        >
        </PopoverSelector>

      </div>
    )

  }

}

export default Examples

const months = [
  {
    "id": 1,
    "name": "January",
    "short": "Jan",
    "number": 1,
    "days": 31
  },
  {
    "id": 2,
    "name": "February",
    "short": "Feb",
    "number": 2,
    "days": 28
  },
  {
    "id": 3,
    "name": "March",
    "short": "Mar",
    "number": 3,
    "days": 31
  },
  {
    "id": 4,
    "name": "April",
    "short": "Apr",
    "number": 4,
    "days": 30
  },
  {
    "id": 5,
    "name": "May",
    "short": "May",
    "number": 5,
    "days": 31
  },
  {
    "id": 6,
    "name": "June",
    "short": "Jun",
    "number": 6,
    "days": 30
  },
  {
    "id": 7,
    "name": "July",
    "short": "Jul",
    "number": 7,
    "days": 31
  },
  {
    "id": 8,
    "name": "August",
    "short": "Aug",
    "number": 8,
    "days": 31
  },
  {
    "id": 9,
    "name": "September",
    "short": "Sep",
    "number": 9,
    "days": 30
  },
  {
    "id": 10,
    "name": "October",
    "short": "Oct",
    "number": 10,
    "days": 31
  },
  {
    "id": 11,
    "name": "November",
    "short": "Nov",
    "number": 11,
    "days": 30
  },
  {
    "id": 12,
    "name": "December",
    "short": "Dec",
    "number": 12,
    "days": 31
  }
];
