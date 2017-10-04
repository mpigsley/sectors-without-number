import { Component } from 'react';
import Chance from 'chance';

import './style.css';

export default class SidebarInfo extends Component {
  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onEditText = this.onEditText.bind(this);
    this.onEditDropdown = this.onEditDropdown.bind(this);
    this.updateAttribute = this.updateAttribute.bind(this);
  }

  state = {
    isOpen: false,
    name: '',
  };

  onEdit() {
    this.setState({ isOpen: true });
  }

  onClose() {
    this.setState({ isOpen: false });
  }

  onEditDropdown(key, extraState) {
    return changed => {
      this.updateAttribute(key, changed, extraState);
    };
  }

  onEditText(extraState) {
    return e => {
      console.log(e.target.dataset.key, e.target.value);
      this.updateAttribute(e.target.dataset.key, e.target.value, extraState);
    };
  }

  onRandomizeName(namingFunc) {
    return () => {
      const chance = new Chance();
      this.setState({ name: namingFunc(chance) });
    };
  }

  updateAttribute(key, value, extraState = {}) {
    this.setState({
      ...extraState,
      [key]: value,
    });
  }

  render() {
    return null;
  }
}
