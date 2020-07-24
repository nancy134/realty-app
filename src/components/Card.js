import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import {
    Image
} from 'react-bootstrap';

const style = {
//  border: '1px dashed gray',

//  padding: '0.5rem 1rem',
  marginRight: '.5rem',
//  marginBottom: '.5rem',

//  backgroundColor: 'white',

  cursor: 'move',

  display: 'inline-block',
  height: '80px'
}
export const Card = ({ id, url, index, file, onMoveCard, onDeleteCard, isDraft }) => {
  const ref = useRef(null)
  function onClick(){
      onDeleteCard(index);
  }
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      onMoveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  var src = "";
  if (file) src =  URL.createObjectURL(file);
  else src = url;

  console.log("isDraft: "+isDraft);
  return (
    <span className="border" ref={ref} style={{ ...style, opacity }}>
    <span className="img-wrap">
        {isDraft ?  
        <span onClick={onClick} className="close">&times;</span>
        : null}
        <Image src={src} className="edit-image p-2"/>
    </span>

    </span>
  )
}

