import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import VotingListItem from "../components/VotingListItem";
import RoomInputForm from "../components/RoomInputForm";
var uuid = require('uuid');


var settings = require( '../settings');

export default class VotingList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {userInput:"", player: Math.floor(Math.random()*1000), lastMessageId:null, votes:[]};
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    reset(){ 
        this.setState({userInput : ""});
    }

    handleSubmit(userInput) {

        var that = this;
        //alert ("Submitting: "+this.state.userInput);
        // var uuid1 = uuid.v1();

        var uuid1 = Math.floor(Math.random()*10000);
        // //Call API
        axios.put((settings.serverurl+'/room-input/'+this.props.room +'/'+uuid1), ({Input: userInput}))
        .then(function (response) {     
            
        })
        .catch(function (error) {
            console.log(error);
            alert (JSON.stringify(error));
        });

    }

    totalVotes()
    {
        var sum = 0;
        this.state.votes.forEach(function(obj)
                {
                    sum=sum + obj.Votes;
                }
            );
            return sum;
    }

    remainingVotes()
    {
        return this.props.maxVotes - this.totalVotes();
    }
    handleVote(itemId, votes) {
        var that = this;
        //alert ("Voting: "+itemId + ":" + votes);
        var found = false;
        var item = {};
        item ["RoomInputId"] = itemId;
        item ["Votes"] = votes;

        var jsonObj = this.state.votes;

        let obj = jsonObj.find((o, i) => {
            if (o.RoomInputId === itemId) {
                jsonObj[i] = item;
                found= true; // stop searching
            }
        });

        if (!found)
        {
            jsonObj.push(item);
        }
        //alert (jsonObj);

        //alert(this.state.player);
        if (this.state.player !=  null)
        {
            axios.put((settings.serverurl+'/player-input/'+this.props.room +'/'+this.state.player), ({PlayerInput: jsonObj}))
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                    alert (error);
                });
        }
        this.setState({Votes:jsonObj});

        //alert ("Total Votes: "+ this.totalVotes() + " Remaining Votes: "+ this.remainingVotes());

    }

    //TODO: This should be 2 components
    render() {

        //alert(this.props.roomInputs);
        if (this.props.activityState==="V" && this.props.roomInputs !== null )        
        {
            const inputs = this.props.roomInputs.sort(function(a,b) {return (a.Datemodified > b.Datemodified) ? 1 : ((b.Datemodified > a.Datemodified) ? -1 : 0);} );

            return (
                <div>
                    <p className="App-title">             
                        (Vote)
                    </p> 
                    <div className="Cards">
                        {inputs.map(c => <VotingListItem roomInputId = {c.RoomInputId} text={c.Input} faceDown={this.state.faceDown}  
                        onChange={this.handleVote} remainingVotes={this.remainingVotes()}>  </VotingListItem>)}
                    </div>
                </div>
            )
        }
        else {
        return (
            <div>
                <p className="App-title">             
                    (Team Input)
                </p>   
                <br/>
                <div/>
                <RoomInputForm onSubmit={this.handleSubmit}/>
            </div>

        )};
    }
}