import React from 'react'
import './popover-selector-item.scss'

class DeniReactSelectorPopoverItem extends React.Component {

  selectorItemClick() {
    if (!this.props.showCloseButton) {
      this.props.onAddItem(this.props.item);
    }
  }

  closeButtonClick() {
    this.props.selectorPopover.closeButtonClicked = true;
    this.props.onRemoveItem(this.props.item);
  }

  render() {
    let itemId = this.props.item.id || undefined;
    return (
      <div itemid={ itemId } className="deni-react-popover-selector-item-container" onClick={ this.selectorItemClick.bind(this) } title={ this.props.onGetTooltipText(this.props.item) } >
        <div className={ 'deni-react-popover-selector-item' + (this.props.showCloseButton ? '' : ' no-close-button') }>
          {
            this.props.showCloseButton ? (
              <button className="deni-react-popover-selector-item-close-button" onClick={ this.closeButtonClick.bind(this) }>×</button>
            ) : null
          }
          <span className="deni-react-popover-selector-item-text">
            {
               this.props.onGetText(this.props.item)
            }
          </span>
        </div>
      </div>
    )
  }

}

export default DeniReactSelectorPopoverItem;
