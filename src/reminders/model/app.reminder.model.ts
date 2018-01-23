export interface Reminder {
    todo:string,
    date:string,
    completed:boolean
}

export interface ReminderState {
    data:Reminder[],
    loading:boolean,
    loaded:boolean
}

export interface ReminderAppState {
    reminders:ReminderState
}

/*
    //Sample state tree state (looks like this)
    reminders:{
        data:[
            {todo:'Excersice', date:'01/17/2018' , completed:true},
            {todo:'Drink', date:'01/17/2018' , completed:false},
            {todo:'Read', date:'01/17/2018' , completed:true}
        ],
        loading:false,
        loaded:true
    }

*/