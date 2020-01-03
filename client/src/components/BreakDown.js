import React, { Component } from 'react';
import '../styles/breakDown.css'

class BreakDown extends Component {
    constructor(){
        super()
        this.state={
            showModal : false,
            modalCategory : "",
            relevantTransactions : []
        }
    }

    showModal= (event) => {
        let category = event.target.id
        this.setState({
            modalCategory : category,
            showModal : true
        }, () => {
            this.releventTrnsactions()
        })
    }

    hideModal = (event) => {
        this.setState({
            modalCategory : null,
            showModal : false
        })
    }

    releventTrnsactions = () => {
        let category = this.state.modalCategory
        let transactions = this.props.transactions
        let relevantTransactions = transactions.filter( t => t.category.toLowerCase() === category)
        this.setState({relevantTransactions})
        console.log(relevantTransactions)
    }

    componentDidMount = () => {
        this.releventTrnsactions()
    }

    render() {
        let breakDown = this.props.breakDown
        let keys = Object.keys(breakDown)
        let category = this.state.modalCategory
        let relevantTransactions = this.state.relevantTransactions
        return (
            <div id="breakdown-container">
                <hr/>
                <div id="breakdown-label">Breakdown</div>
                <div id="breakdown-content">
                {keys.map( k => {
                    return(
                        <div 
                            className="break-down" 
                            id={k} 
                            onClick={this.showModal}
                        >
                            {k} : {breakDown[k]} 
                        </div>
                    )
                })}
                </div>

                {this.state.showModal ? 
                    <div id="modal" onClick={this.hideModal}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>{category} breakdown</h2>
                                <span className="close-button">&times;</span>
                            </div>
                            <div className="modal-body">
                                <p>{relevantTransactions.map(r => 
                                    <div>{r.vendor}: ${r.amount}</div>)}</p>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div> :
                    <></>
                }
            </div>

        );
    }
}

export default BreakDown;