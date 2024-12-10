import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onUpdateEvent, setEvents, setLoading, startActiveEvent } from "../store";
import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);


    const setActiveEvent = (event) => {
        dispatch(startActiveEvent(event));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {

            if (activeEvent.id) {

                await calendarApi.put(`/events/${activeEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            const { data } = await calendarApi.post('/events/create', calendarEvent);
            const newEvent = {
                id: data.newEvent.id,
                ...calendarEvent,
                user,
            };

            dispatch(onAddNewEvent(newEvent));

        } catch (error) {
            const msg = error.response?.data?.msg || 'There was an error saving the event';
            Swal.fire('Error', msg, 'error');
        }
    }

    const startDeletingEvent = async () => {

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
            return;
        } catch (error) {
            const msg = error.response?.data?.msg || 'There was an error saving the event';
            Swal.fire('Error', msg, 'error');
        }
    }

    const startLoadingEvents = async () => {

        dispatch(setLoading());

        try {
            const { data } = await calendarApi.get('/events');
            console.log('startLoadingEvents', data);

            const events = data.events.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
                user: {
                    id: event.user._id,
                    name: event.user.name
                }
            }));

            dispatch(setEvents(events));

        } catch (error) {
            console.log('startLoadingEvents error', error);
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}