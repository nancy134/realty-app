import React, { Component } from 'react';
import { ImageSelect } from './ImageSelect';

class ImageSelectContainer extends Component {
    constructor(props){
        super(props);

        this.handleSelectCard = this.handleSelectCard.bind(this);
    }

    handleSelectCard(id, url){
        this.props.onSelectCard(id, url);
    }
    renderCard(card, index){
     
        return(
        <ImageSelect
          key={card.id}
          index={index}
          id={card.id}
          url={card.url}
          file={card.file}
          onMoveCard={this.handleMoveCard}
          onSelectCard={this.handleSelectCard}
          selectedCard={this.props.selectedCard}
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

export default ImageSelectContainer;
