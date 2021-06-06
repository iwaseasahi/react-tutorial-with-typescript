import React from 'react';

type Props = {
  value: string | null,
  onClick: () => void
}

function Square(props: Props): JSX.Element {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
