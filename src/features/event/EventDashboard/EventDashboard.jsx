import React, {Component}  from 'react';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux'
import EventList from '../EventList/EventList';
import {deleteEvent} from '../eventActions'




    //Adding Static Data for demsontration of props
    //const eventsFromDashboard 
    
    const mapState = (state) => ({
      events: state.events
    }) 

    const actions = {
      deleteEvent
    }

    class EventDashboard extends Component{

    //for deleting an Event
    handleDeleteEvent = (id) => {
      console.log(id);
      this.props.deleteEvent(id);
  }

  //rendering
    render(){

      const {events} = this.props;


        return(
            <Grid>

                <Grid.Column width={10}>
                    <EventList events={events} deleteEvent={this.handleDeleteEvent}/>
                </Grid.Column>

                <Grid.Column width={6}>
                    <h2>Activity Feed </h2>
                </Grid.Column>

            </Grid>
            
        )
    }
}

export default connect(mapState,actions) (EventDashboard) ;