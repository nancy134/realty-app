import React, { useState, useCallback } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'
const style = {
}
export const Container = () => {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: '1',
      },
      {
        id: 2,
        text: '2',
      },
      {
        id: 3,
        text: '3',
      },
      {
        id: 4,
        text: '4',
      },
      {
        id: 5,
        text:
          '5',
      },
      {
        id: 6,
        text: '6',
      },
      {
        id: 7,
        text: '7',
      },
    ])
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
    const renderCard = (card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      )
    }
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
}

