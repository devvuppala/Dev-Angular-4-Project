export interface TechnologyModel {
    id:number,
    techName:String,
    techDuration: number,
    techCost:number,
    techOnlineTraining:boolean,
    techstartDate:Date

}

export interface TechnologyCartModel {
    id:number,
    techName:String,
    techCost:number,
    techstartDate:Date
}