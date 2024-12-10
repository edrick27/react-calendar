import { createSlice } from '@reduxjs/toolkit';


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoading: false,
        events: [],
        activeEvent: null
    },
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = true;
        },
        setEvents: (state, { payload }) => {
            state.isLoading = false;
            state.events = payload;
        },
        startActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(
                event => event.id === payload.id ? payload : event
            );
        },
        onDeleteEvent: (state) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter(
                    event => event.id !== state.activeEvent.id
                );
                state.activeEvent = null;
            }
        },
        OnLogoutCalendar: (state) => {
            state.isLoading = false;
            state.events = [];
            state.activeEvent = null;
        }
    }
});


export const { 
    startActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    setEvents,
    setLoading,
    OnLogoutCalendar
 } = calendarSlice.actions;