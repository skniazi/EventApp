import React , { Component } from 'react';
import { Segment, Form, Button, Header, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from './../eventActions';
import cuid from 'cuid';
//For redux-forms
import {reduxForm,Field} from 'redux-form';

import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from './../../../app/common/form/SelectInput';
//For Validation
import {composeValidators,combineValidators,isRequired,hasLengthGreaterThan} from 'revalidate';
import DateInput from '../../../app/common/form/DateInput';


//connecting this component to our redux store
//MapStateToProps i-e it helps to fetch the state from the store
const mapState = (state,ownProps) => {
  const eventId = ownProps.match.params.id;

  let event ={}

  if(eventId && state.events.length>0){
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return{
    initialValues:event
  }
}

//MapDispatchToProps
const actions ={
  createEvent,
  updateEvent
}

//validation using revalidate
const validate = combineValidators({
  title:isRequired({message: 'The event title is required'}),
  category:isRequired({message: 'The category is required'}),
  description:composeValidators(
    isRequired({message:'Please enter a description'}),
    hasLengthGreaterThan(4)({message:'Description needs to be atleast 5 characters'})
  )(),
  city:isRequired('City'),
  venue:isRequired('Venue'),
  date:isRequired('Date')
})



//For populating categories
const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];


class EventForm extends Component{

  state = {
    ...this.props.event
  };



  //using uncontrolled form
  onFormSubmit = (values) => {
   
    
    if(this.props.initialValues.id){
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
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
  
    render(){

      const {history, initialValues, invalid, submitting, pristine} = this.props;
  
        return(

          <Grid>
            <Grid.Column width={10}>

            <Segment>

            <Header sub color='teal' content='Event Details' />
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete= 'off'>

                  
                  <Field name='title' component={TextInput} placeholder='Give your event a name' />
                  <Field name='category' component={SelectInput} options={category} multiple={false} placeholder='What is your event about?' />
                  <Field name='description' component={TextArea} rows={3} placeholder='Tell us about your event' />

                  <Header sub color='teal' content='Event Location Details' />

                  <Field name='city' component={TextInput} placeholder='Event City' />
                  <Field name='venue' component={TextInput} placeholder='Event Venue' />
                  <Field name='date' component={DateInput} dateFormat='d MMM yyyy h:mm a' showTimeSelect timeFormat='HH:mm' placeholder='Event Date' />

                  <Button disabled={invalid || submitting || pristine} positive type="submit">
                    Submit
                  </Button>

                  <Button onClick={initialValues.id ? () => history.push(`/events/${initialValues.id}`): () => history.push('/events')} type="button">Cancel</Button>

                </Form>

            </Segment>

            </Grid.Column>
          </Grid>
                 
        )
    }
}

export default connect(mapState,actions) (reduxForm({form: 'eventForm', validate})(EventForm));