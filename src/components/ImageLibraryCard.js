import React, { useRef } from 'react'
import {
    Image
} from 'react-bootstrap';

const style = {
  marginRight: '.5rem',
  marginTop: '.5rem',
  display: 'inline-block',
  height: '80px'
}
export const ImageLibraryCard = ({ id, url, index, file, onMoveCard, onDeleteCard }) => {
  const ref = useRef(null)
  function onClick(){
      console.log("onDelete: "+id);
      onDeleteCard(id);
  }
  var src = "";
  if (file) src =  URL.createObjectURL(file);
  else src = url;
  return (
    <span className="border" ref={ref} style={{ ...style }}>
    <span className="img-wrap">
        <span onClick={onClick} className="close">&times;</span>
        <Image src={src} className="edit-image p-2"/>
    </span>

    </span>
  )
}

