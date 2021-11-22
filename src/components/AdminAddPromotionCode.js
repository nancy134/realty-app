import React from 'react';
import {
    Modal,
    Form,
    Button,
    Col
} from 'react-bootstrap';
import billingService from '../services/billing';

class AdminAddPromotionCode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            promotions: null,
            description: "",
            selectedPromotion: 0,
            multiUse: false,
            autoGenerate: true,
            code: "" 
        };
        this.handlePromotionSelect = this.handlePromotionSelect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAutoGenerateChange = this.handleAutoGenerateChange.bind(this);
        this.handleMultiUseChange = this.handleMultiUseChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
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

    handleCodeChange(e){
        this.setState({
            code: e.target.value
        });
    }

    handleSave(){
        var body = {
            PromotionId: this.state.selectedPromotion,
            description: this.state.description,
            multiUse: this.state.multiUse,
            autoGenerate: this.state.autoGenerate,
            code: this.state.code
        };
        this.props.onSave(body);
    }

    handleAutoGenerateChange(e){
        this.setState({
            autoGenerate: e.target.checked
        });
    }

    handleMultiUseChange(e){
        this.setState({
            multiUse: e.target.checked
        });
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
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Check
                                onChange={this.handleAutoGenerateChange}
                                type="checkbox"
                                label="Auto-generate code"
                                checked={this.state.autoGenerate}
                            />
                        </Form.Group>
                    </Form.Row>

                    { !this.state.autoGenerate ?
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label
                                className="font-weight-bold"
                            >Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={this.state.code}
                                onChange={this.handleCodeChange}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    : null }

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label
                                className="font-weight-bold"
                            >Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Promotion code for abc@gmail.com"
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label
                                className="font-weight-bold"
                            >Promotion</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={this.handlePromotionSelect}
                            >
                               {promotionList}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Check
                                onChange={this.handleMultiUseChange}
                                type="checkbox"
                                label="Allow code to be used by multiple users"
                                checked={this.state.multiUse}
                            />
                        </Form.Group>
                    </Form.Row>


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

