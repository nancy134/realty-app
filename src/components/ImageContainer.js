import React, { useState, useCallback } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'
const style = {
}
export const ImageContainer = (props) => {
    console.log(props);
    const [cards, setCards] = useState(props.listing.images);
    const onDropFunction = props.onDrop;
    const moveCard = useCallback(
      (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [cards],
    )
    const moveComplete = () => {
        onDropFunction(cards);
    }
    const renderCard = (card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          url={card.url}
          moveCard={moveCard}
          moveComplete={moveComplete}
        />
      )
    }
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
}

export default ImageContainer;
