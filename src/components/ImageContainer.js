import React, { Component } from 'react';
import { Card } from './Card';

class ImageContainer extends Component {
    constructor(props) {
        super(props);

        this.handleMoveCard = this.handleMoveCard.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
    }

    handleMoveCard(dragIndex, hoverIndex){
        this.props.onMoveCard(dragIndex, hoverIndex);
    }

    handleDeleteCard(index){
        this.props.onDeleteCard(index);
    }

    renderCard(card, index){
     
        return(
        <Card
          key={card.id}
          index={index}
          id={card.id}
          url={card.url}
          file={card.file}
          onMoveCard={this.handleMoveCard}
          onDeleteCard={this.handleDeleteCard}
        />
        );
    }

    render(){
        return(
            <span>
                {this.props.cards.map((card, i) => this.renderCard(card, i))}
            </span>
        )
    }
}

export default ImageContainer;
