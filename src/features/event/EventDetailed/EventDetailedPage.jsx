import React from 'react'
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSideBar from './EventDetailedSideBar';
import { connect } from 'react-redux';


//connecting this component to our redux store
//MapStateToProps i-e it helps to fetch the state from the store
const mapState = (state,ownProps) => {
  const eventId = ownProps.match.params.id;
  
  let event = {};

  if(eventId && state.events.length > 0){
     //since we have to return one particular array
     event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  }
  
}


const EventDetailedPage = ({event}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event}/>
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>

            <Grid.Column width={6}>
                <EventDetailedSideBar attendees={event.attendees} />
            </Grid.Column>
        </Grid>
    )
}

export default connect (mapState) (EventDetailedPage)
