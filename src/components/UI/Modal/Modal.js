import React, {Component} from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.show !== this.props.show) {
            return true;
        }
        return false;
    }


    componentWillUpdate() {
        console.log('Modal will update')
    }
    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-200vh)',
                            opacity: this.props.show ? '1' : '0'
                        }}
                    >
                {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;