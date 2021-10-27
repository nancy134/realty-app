import React, { useRef } from 'react'
import {
    Image,
    Form
} from 'react-bootstrap';

const style = {
  marginRight: '.5rem',
  marginTop: '.5rem',
  cursor: 'move',
  display: 'inline-block',
  height: '80px'
}
export const ImageSelect = ({ id, url, index, file, selectedCard, onSelectCard }) => {
  const ref = useRef(null)
  var src = "";
  if (file) src =  URL.createObjectURL(file);
  else src = url;
  return (
    <span className="border" ref={ref} style={{ ...style }}>
    <span className="img-wrap">
        <Form.Check
        >
            <Form.Check.Input
                type="radio"
                checked={selectedCard === id}
                onChange={() => onSelectCard(id, url)}
                onClick={() => onSelectCard(id, url)}
            />
        </Form.Check> 
        <Image src={src} className="edit-image p-2"/>
    </span>

    </span>
  )
}

