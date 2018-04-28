import React from 'react'
import './popover-selector.scss'
import DeniReactPopover from 'deni-react-popover'
import DeniReactPopoverSelectorHelper from './popover-selector.helper'
import DeniReactPopoverSelectorProps from './popover-selector.props'
import DeniReactPopoverSelectorApi from './popover-selector.api'
import { HORIZONTAL_POSITION } from './popover-selector.enum'
import DeniReactSelectorPopoverItem from './popover-selector-item'
import loadingGif from './images/loading.gif'

class DeniReactSelectorPopover extends React.Component {

  constructor(props) {
    super(props);
    this.elementId = this._generateElementId();
    this.state = this._receiveProps(props);
    this.anyItemAdded = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._receiveProps(nextProps));
  }

  _receiveProps(props) {
    return {
      selectedItems: props.selectedItems || [],
      itemsToSelect: this._getItemsToSelect(props.items, props.selectedItems)
    }
  }

  init() {
    setTimeout(() => {
      if (this._getInputElement()) {
        this._getInputElement().value = '';
        this._getInputElement().focus();
      }
      if (!this.closeButtonClicked) {
        this.popoverRef.show();
      }
      this.closeButtonClicked = false;
    }, 150)
  }

  _getElement() {
    return document.getElementById(this.elementId);
  }

  _getInputElement() {
    if (this._getElement()) {
      return this._getElement().querySelector('.deni-react-popover-selector-input');
    }
    return null;
  }

  popoverSelectorMouseDown() {
    setTimeout(() => {
      this.init();
    }, 100);
  }

  onAddItem(itemToAdd) {
    let selectedItems = this.state.selectedItems.concat([itemToAdd]);

    this.anyItemAdded = true;
    setTimeout(() => {
      this.setState({
        selectedItems: selectedItems,
        itemsToSelect: this._getItemsToSelect(this.props.items, selectedItems)
      });

      this.init();
      if (this.props.onItemAdded) {
        this.props.onItemAdded(itemToAdd);
      }
    });
  }

  onRemoveItem(itemToRemove) {
    let indexToRemove = this.state.selectedItems.indexOf(itemToRemove);

    let selectedItems = this.state.selectedItems.slice(0);
    selectedItems.splice(indexToRemove, 1);

    setTimeout(() => {
      this.setState({
        selectedItems: selectedItems,
        itemsToSelect: this._getItemsToSelect(this.props.items, selectedItems)
      });

      //this.init();
      if (this.props.onItemRemoved) {
        this.props.onItemRemoved(itemToRemove);
      }
    });
  }

  onGetTooltipText(itemToRender) {
    if (this.props.onGetTooltipText) {
      return this.props.onGetTooltipText.call(this, itemToRender)
    }
    return null
  }

  onRenderItems(itemsToRender, showCloseButton) {
    return (
      itemsToRender.map(itemToRender => {
        return (
          <DeniReactSelectorPopoverItem
            key={ itemToRender.id }
            item={ itemToRender }
            showCloseButton={ showCloseButton }
            onGetText={ this.props.onGetTextItem.bind(this) }
            onGetTooltipText={ this.onGetTooltipText.bind(this) }
            onAddItem={ this.onAddItem.bind(this) }
            onRemoveItem={ this.onRemoveItem.bind(this) }
            selectorPopover={ this }
          >
        </DeniReactSelectorPopoverItem>
        )
      })
    )
  }

  selectorInputKeyUp(e) {
    if (this.popoverRef.isShowing()) {
      if (e.keyCode === 13) { //RETURN
        if (this.state.itemsToSelect.length === 1) {
          this.onAddItem(this.state.itemsToSelect[0]);
        }
      } else if (e.keyCode === 27) { //ESCAPE
        this.popoverRef.hide();
      }
    } else {
      this.popoverRef.show();
    }

    this.setState({
      itemsToSelect: this._getItemsToSelect(this.props.items, this.state.selectedItems)
    });
  }

  onBeforeShow(element, targetElement) {
    element.style.left = targetElement.offsetLeft + 'px';
    element.style.width = targetElement.offsetWidth + 'px';
  }

  onBeforeHide(popoverElem) {
    if (this.anyItemAdded) {
      this.anyItemAdded = false;

      if (this.props.onSaveBeforeHide) {
        this.props.onSaveBeforeHide();
      }
    }
  }

  render() {
    return (
      <div id={ this.elementId } className="deni-react-popover-selector-container">
        <div id={ this.elementId + '-panel' } onMouseDown={ this.popoverSelectorMouseDown.bind(this) } className="deni-react-popover-selector">
          {
            this.props.loading === true ? (<img className="deni-react-popover-selector-loading" src={ loadingGif } />) : null
          }
          {
            this.onRenderItems(this.state.selectedItems, true)
          }
          {
            <input
              className="deni-react-popover-selector-input"
              onKeyUp={ this.selectorInputKeyUp.bind(this) }
              placeholder='digite para filtrar'
            />
          }
        </div>
        <DeniReactPopover
          ref={popoverRef => {
            this.popoverRef = popoverRef
          }}
          target={ this.elementId + '-panel' }
          horizontalPosition="left"
          onRenderItems={ this.onRenderItems.bind(this) }
          onBeforeShow={ this.onBeforeShow.bind(this) }
          onBeforeHide={ this.onBeforeHide.bind(this) }
        >
          {
            this.onRenderItems(this.state.itemsToSelect, false)
          }
        </DeniReactPopover>
      </div>
    )
  }

  _getItemsToSelect(allItems, selectedItems) {
    let itemsToSelect;
    if (selectedItems) {
      let found;
      itemsToSelect = allItems.filter(item => {
        try {
          found = selectedItems.indexOf(item) !== -1;
        } catch (error)   {
          console.log(error);
        }

        if (!found && this._getInputElement()) {
          let filterText = this._getInputElement().value.trim().toLowerCase();
          if (filterText !== '') {
            let itemText = this.props.onGetTextItem(item).toLowerCase();
            return itemText.indexOf(filterText) !== -1;
          }
        }
        return !found;
      });
      return itemsToSelect;
    }
    return allItems;
  }

  _generateElementId() {
    let date = new Date();
    return 'DeniReactSelectorPopover-' + date.getTime();
  }


}

export default DeniReactSelectorPopover;
