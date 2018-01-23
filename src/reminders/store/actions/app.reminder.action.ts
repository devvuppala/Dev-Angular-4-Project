import {Action} from '@ngrx/store';
import {Reminder , ReminderState} from '../../model/app.reminder.model'

export const LOAD_REMINDERS:string = "[Reminders] Load Reminders";
export const LOAD_REMINDERS_SUCCESS:string = "[Reminders] Load Reminders Success";
export const LOAD_REMINDERS_FAILURE:string = "[Reminders] Load Reminders Failed";

export class LoadReminders implements Action{
    readonly type:string = LOAD_REMINDERS;
}

export class LoadRemindersSuccess implements Action{
    readonly type:string = LOAD_REMINDERS_SUCCESS;
    constructor(public payload:Reminder[]) {

    }
}

export class LoadRemindersFailure implements Action{
    readonly type:string = LOAD_REMINDERS_FAILURE;
    constructor(public payload:Reminder[]) {

    }
}

//We can refer all the 3 actions using this
export type ReminderActions = LoadReminders | LoadRemindersFailure |LoadRemindersFailure;
