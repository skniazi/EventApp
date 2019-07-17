import React , { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from './../eventActions';
import cuid from 'cuid';


//connecting this component to our redux store
//MapStateToProps i-e it helps to fetch the state from the store
const mapState = (state,ownProps) => {
  const eventId = ownProps.match.params.id;

  let event ={
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: '' 
  }

  if(eventId && state.events.length>0){
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return{
    event
  }
}

//MapDispatchToProps
const actions ={
  createEvent,
  updateEvent
}


class EventForm extends Component{

  state = {
    ...this.props.event
  };



  //using uncontrolled form
  submitForm = (evt) => {
    evt.preventDefault();
    if(this.state.id){
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`);
    }
    //console.log(this.state);
    else{
      //create object for storing additional items
      const newEvent = {
        ...this.state,
        id:cuid(),
        hostPhotoURL:'/assets/user.png'
      }
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  } 

  //using controlled form
  handleTitleChange = ({target: {name,value}}) => {
    this.setState({
      //title: evt.target.value

      //using generic notation i-e Object Bracket Notation
      [name] : value
    })
  }
  
    render(){
    
      const {title,date,city,venue,hostedBy} = this.state;

        return(
                  <Segment>

                    <Form onSubmit={this.submitForm} autoComplete= 'off'>

                      <Form.Field>
                        <label>Event Title</label>
                        <input 
                          name='title'
                          value={title} 
                          onChange={this.handleTitleChange} 
                          placeholder="Event Title" />
                      </Form.Field>

                      <Form.Field>
                        <label>Event Date</label>
                        <input 
                          name='date' 
                          value={date} 
                          onChange={this.handleTitleChange}  
                          type="date" 
                          placeholder="Event Date" />
                      </Form.Field>

                      <Form.Field>
                        <label>City</label>
                        <input 
                          name='city' 
                          value={city} 
                          onChange={this.handleTitleChange}  
                          placeholder="City event is taking place" />
                      </Form.Field>

                      <Form.Field>
                        <label>Venue</label>
                        <input 
                          name='venue' 
                          value={venue} 
                          onChange={this.handleTitleChange}  
                          placeholder="Enter the Venue of the event" />
                      </Form.Field>

                      <Form.Field>
                        <label>Hosted By</label>
                        <input 
                          name='hostedBy' 
                          value={hostedBy} 
                          onChange={this.handleTitleChange}  
                          placeholder="Enter the name of person hosting" />
                      </Form.Field> 

                      <Button positive type="submit">
                        Submit
                      </Button>

                      <Button onClick={this.props.history.goBack} type="button">Cancel</Button>

                    </Form>

                  </Segment>
        )
    }
}

export default connect(mapState,actions) (EventForm);