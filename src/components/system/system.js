import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Circle, Polygon, G, Hoverable, Text } from './components';

function System(props) {
  const points = 6;
  const { system, xOffset, yOffset, ...newProps } = props;
  const radius = props.width / 2;
  const hexagon = [];

  for (let i = 0; i < points; i += 1) {
    const pointOnCircle = (i * Math.PI) / 3;
    const x = radius * Math.cos(pointOnCircle);
    const y = radius * Math.sin(pointOnCircle);
    hexagon.push(`${x + xOffset},${y + yOffset}`);
  }

  const isSystem = (func) => {
    if (props.highlighted) {
      return () => func(props.systemKey);
    }
    return () => {};
  };

  const onClick = () => {
    if (system) {
      props.router.push(`/sector/system/${props.systemKey}${props.location.search}`);
    }
  };

  let star = null;
  if (system) {
    star = <Circle cx={xOffset} cy={yOffset} r={props.width / 13} />;
  }

  let text = null;
  if (props.highlighted && props.width > 45) {
    text = (
      <Text
        x={xOffset}
        y={yOffset + ((props.height / 2) - 3)}
      >
        {props.systemKey}
      </Text>
    );
  }

  const Container = props.highlighted ? Hoverable : G;

  return (
    <Container
      hoverable={props.highlighted}
      clickable={!!system}
      onMouseEnter={isSystem(props.sectorHoverStart)}
      onMouseLeave={isSystem(props.sectorHoverEnd)}
      onClick={onClick}
    >
      <Polygon
        {...newProps}
        points={hexagon.join(' ')}
      />
      {star}
      {text}
    </Container>
  );
}

System.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  highlighted: PropTypes.bool.isRequired,
  sectorHoverStart: PropTypes.func.isRequired,
  sectorHoverEnd: PropTypes.func.isRequired,
  systemKey: PropTypes.string.isRequired,
  xOffset: PropTypes.number,
  yOffset: PropTypes.number,
  system: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

System.defaultProps = {
  xOffset: 0,
  yOffset: 0,
  system: null,
};

export default withRouter(System);
