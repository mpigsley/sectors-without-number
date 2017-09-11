import { Component } from 'react';
import Chance from 'chance';

export default class SidebarInfo extends Component {
  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onEditName = this.onEditName.bind(this);
    this.onRandomizeName = this.onRandomizeName.bind(this);
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

  onEditName(e) {
    this.setState({ name: e.target.value });
  }

  onRandomizeName(namingFunc) {
    return () => {
      const chance = new Chance();
      this.setState({ name: namingFunc(chance) });
    };
  }

  render() {
    return null;
  }
}
