import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from "../components/NavBar"
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useEffect, useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useAuthStore, useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';



export const CalendarPage = () => {

  const { user } = useAuthStore();
  const {events: myEventsList, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { toogleDateModal } = useUiStore();
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );


  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = event.user.id === user.uid || event.user.uid === user.uid;

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#B1B1B1FF',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    
    toogleDateModal(true);
    // openDateModal();
  }

  const onSelect = (event) => {
    console.log({ click: event });
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    // setLastView(event)
  }

  return (
    <>
      <Navbar />
      <div>
        <Calendar
          culture='es'
          localizer={localizer}
          events={ myEventsList }
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px )' }}
          messages={getMessagesEs()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged }
        />
        <CalendarModal />

        <FabAddNew />
        <FabDelete />
      </div>
    </>
  )
}
