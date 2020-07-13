import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import classnames from 'classnames';

class ClientDetails extends Component {
    state={
        showBalanceUpdate:false,
        balanceUpdateAmount:''
    }
    render() {
        const { details }=this.props;
        if(details){
            return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"/>Back To Dashboard
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-group float-right">
                            <Link to={`/client/edit/${details.id}`} className="btn btn-dark">
                                Edit
                            </Link>
                            <button className="btn btn-danger">
                                Delete
                            </button>

                        </div>
                        </div>
                </div> 
                <hr/>
                <div className="card">
                    <h3 className="card-header">
                        {details.firstName} {details.lastName}
                    </h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8 col-sm-6">
                                <h4>Client ID:{''} <span className="text-secondary">{details.id}</span></h4>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <h3 className="fa-pull-right">Balance:<span className={classnames({
                                    'text-danger':details.Balance>0,
                                    'text-green':details.Balance===0
                                })}>
                                    <i class="fas fa-rupee-sign"/>
                                {parseFloat(details.Balance).toFixed(2)}</span>
                                <small>
                                    <a href="#" onClick={() => this.setState({
                                        showBalanceUpdate: !this.state.showBalanceUpdate})}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                    </small></h3>
                                
                            </div>
                        </div>
                        <hr/>
                        <ul className="list-group">
                            <li className="list-group-item">Contact Email: {details.email}</li>
                            <li className="list-group-item">Contact Phone: {details.phone}</li>
                        </ul>

                    </div>
                </div>
                </div>
            );
        }else{
            return <Spinner/>
        }
      
    }
}

ClientDetails.propTypes={
    firestore: PropTypes.object.isRequired}
export default  compose(
    firestoreConnect(props => [{
        collection:'client', storeAs:'details', doc:props.match.params.id}
    ]),
    connect(({firestore:{ordered}} ,props) => ({
        details: ordered.details && ordered.details[0]
    }))
)(ClientDetails);

