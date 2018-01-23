import { ReminderState, Reminder } from '../../model/app.reminder.model';
import * as fromReminderActions from '../actions/app.reminder.action';

//Intital state
const initialState:ReminderState = {
    data:[],
    loading:false,
    loaded:false
}

//Reducer

export function reducer(state:ReminderState = initialState, action:fromReminderActions.ReminderActions) {
    switch(action.type) {
        case fromReminderActions.LOAD_REMINDERS:{
            return {
                ...state,
                loading:true,
                loaded:false
            }
        }

        case fromReminderActions.LOAD_REMINDERS_SUCCESS:{
            return {
                ...state,
                loading:false,
                loaded:true
            }
        }

        case fromReminderActions.LOAD_REMINDERS_FAILURE:{
            return {
                ...state,
                loading:false,
                loaded:false
            }
        }
    }

    return state;
}