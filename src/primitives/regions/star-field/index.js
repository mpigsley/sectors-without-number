import React, { Component } from 'react';
import Measure from 'react-measure';

import AbsoluteContainer from 'primitives/container/absolute-container';
import { getPixelRatio } from 'utils/canvas-helpers';

import './style.scss';

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
    const { width, height } = this.state;
    return width !== state.width || height !== state.height;
  }

  componentDidUpdate() {
    this.drawStars();
  }

  drawStars() {
    const context = this.canvas.current.getContext('2d');
    const { width, height } = this.state;
    context.clearRect(0, 0, width * this.ratio, height * this.ratio);
    const getRandom = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const stars = (width * height) / 500;
    const colorRange = [0, 60, 240];
    for (let i = 0; i < stars; i += 1) {
      const x = Math.random() * width * this.ratio;
      const y = Math.random() * height * this.ratio;
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
    const { width, height } = this.state;
    return (
      <Measure
        onResize={({ entry }) => {
          if (!entry) {
            return;
          }
          this.setState({ width: entry.width, height: entry.height });
        }}
      >
        {({ measureRef }) => (
          <AbsoluteContainer ref={measureRef} className="StarField-Container">
            <canvas
              width={width * this.ratio}
              height={height * this.ratio}
              ref={this.canvas}
              style={{ width, height }}
            />
          </AbsoluteContainer>
        )}
      </Measure>
    );
  }
}
