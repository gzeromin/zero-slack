import React, { CSSProperties, FC, useCallback } from 'react';
import { CloseModalButton, CreateMenu } from './styles';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  style: CSSProperties;
  closeButton?: boolean;
}

//  { children, style, show, onCloseModal, closeButton }
const Menu: FC = ({ children }) => {
  
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // if(!show) return null;

  return (
    <CreateMenu>
      <div>menu</div>
      { children }
    </CreateMenu>
    // <CreateMenu onClick={onCloseModal}>
    //   <div style={style} onClick={stopPropagation}>
    //     {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
    //     {children}
    //   </div>
    // </CreateMenu>
  )
}

Menu.defaultProps = {
  closeButton: true
}

export default Menu;