const {NAME} = (props) => {
  const {
    size = 24,
    color = 'currentColor',
    secondColor = '#BABDCC',
    strokeWidth = 2,
    sharp = false,
  } = props;

  if(sharp) {
    return (
      {SVG_SHARP}
    );
  } else {
    return (
      {SVG}
    );
  }
};

export default {NAME};
