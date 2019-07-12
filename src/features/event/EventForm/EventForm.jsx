import React , { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';




class EventForm extends Component{

  state = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: '' 
  }


  //For populating the form with Event on the left side
  //when clicked view
  componentDidMount(){
    if(this.props.selectedEvent !== null){
      this.setState({
        ...this.props.selectedEvent
      })
    }
  }

  //using uncontrolled form
  submitForm = (evt) => {
    evt.preventDefault();
    if(this.state.id){
      this.props.updatedEvent(this.state);
    }
    //console.log(this.state);
    else{
      this.props.createEvent(this.state);
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
      const {cancelForm} = this.props;
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

                      <Button onClick={cancelForm} type="button">Cancel</Button>

                    </Form>

                  </Segment>
        )
    }
}

export default EventForm;