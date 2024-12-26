import React from 'react'
import UseAnimations from 'react-useanimations';
import menu2 from 'react-useanimations/lib/menu2';
import Button from '../Button';

type Props = {
    isChecked: boolean;
    setChecked: (oldState: boolean) => void;
}

export default function NavButton({isChecked, setChecked}: Props) {
  return <UseAnimations animation={menu2}
  onClick={() => setChecked(!isChecked)}
  reverse={isChecked}
  speed={3.0}
  render={(eventProps, animationProps) => <div {...eventProps}>
    <div {...animationProps}></div>
  </div>
  }
  />
}