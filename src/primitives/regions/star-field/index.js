import React, { Component } from 'react';
import Measure from 'react-measure';

import AbsoluteContainer from 'primitives/container/absolute-container';
import { getPixelRatio } from 'utils/canvas-helpers';

import './style.css';

export default class StarField extends Component {
  constructor(props) {
    super(props);

    this.ratio = getPixelRatio();
    this.canvas = React.createRef();
  }

  state = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  componentDidMount() {
    this.drawStars();
  }

  shouldComponentUpdate(props, state) {
    return (
      this.state.width !== state.width || this.state.height !== state.height
    );
  }

  componentDidUpdate() {
    this.drawStars();
  }

  drawStars() {
    const context = this.canvas.current.getContext('2d');
    context.clearRect(
      0,
      0,
      this.state.width * this.ratio,
      this.state.height * this.ratio,
    );
    const getRandom = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const stars = (this.state.width * this.state.height) / 500;
    const colorRange = [0, 60, 240];
    for (let i = 0; i < stars; i += 1) {
      const x = Math.random() * this.state.width * this.ratio;
      const y = Math.random() * this.state.height * this.ratio;
      const radius = Math.random() * 1.2 * this.ratio;
      const hue = colorRange[getRandom(0, colorRange.length - 1)];
      const sat = getRandom(50, 100);
      context.beginPath();
      context.arc(x, y, radius, 0, 360);
      context.fillStyle = `hsl(${hue}, ${sat}%, 88%, 0.4)`;
      context.fill();
    }
  }

  render() {
    return (
      <Measure
        onResize={({ entry }) =>
          this.setState({ width: entry.width, height: entry.height })
        }
      >
        {({ measureRef }) => (
          <AbsoluteContainer ref={measureRef} className="StarField-Container">
            <canvas
              width={this.state.width * this.ratio}
              height={this.state.height * this.ratio}
              ref={this.canvas}
              style={{
                width: this.state.width,
                height: this.state.height,
              }}
            />
          </AbsoluteContainer>
        )}
      </Measure>
    );
  }
}
