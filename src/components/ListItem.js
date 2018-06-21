import React, { Component } from 'react';

export default class ListItem extends React.Component{
    render() {


        if (this.props.faceDown) {
            return (
                <div>
                   <div>{this.props.votes+":"+"x".repeat(5)}</div>
                </div>
            );
        }
        else {
            return (
                <div>
                <div>{this.props.votes +":"+ this.props.text}</div>                                 
                </div>
            );
        }
        
    }
}

