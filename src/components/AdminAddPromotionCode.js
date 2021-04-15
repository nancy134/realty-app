import React from 'react';
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap';
import billingService from '../services/billing';

class AdminAddPromotionCode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            promotions: null,
            description: "",
            selectedPromotion: 0
        };
        this.handlePromotionSelect = this.handlePromotionSelect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }
    componentDidMount(){
        var that = this;
        billingService.getPromotions().then(function(result){
            if (result.promotions.rows.length > 0){
                that.setState({
                    promotions: result.promotions.rows,
                    selectedPromotion: result.promotions.rows[0].id
                });
            }
        }).catch(function(err){
            console.log(err);
        });
    }

    handlePromotionSelect(e){
        console.log(e.target.value);
        this.setState({
            selectedPromotion: e.target.value
        });    
    }
    handleDescriptionChange(e){
        this.setState({
            description: e.target.value
        });
    }

    handleSave(){
        var body = {
            PromotionId: this.state.selectedPromotion,
            description: this.state.description
        };
        this.props.onSave(body);
    }
    render(){
        var promotionList = null;
        if (this.state.promotions){
            promotionList = this.state.promotions.map((item, key) =>
                <option value={item.id} key={key}>{item.description}</option>
            );
        }
        return(
        <Modal
            show={this.props.show}
        >
            <Modal.Header>
                <Modal.Title>Add Promotion Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Promotion code for abc@gmail.com"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                    >
                    </Form.Control>
                    <Form.Label>Promotion</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={this.handlePromotionSelect}
                    >
                        {promotionList}
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >Cancel</Button>
                <Button
                    onClick={this.handleSave}
                >Create Code</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AdminAddPromotionCode;

