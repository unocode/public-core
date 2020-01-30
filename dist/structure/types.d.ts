export interface Action {
    id?: string;
    enabled?: any;
    guard?: Guard;
    commands: Array<Command>;
    nextActions?: Array<Action>;
}
export interface Guard {
    conditions: Array<Condition>;
}
export interface Condition {
    code?: Function;
    path?: string;
}
export declare enum CommandType {
    JSImporter = "JSImporter",
    HTMLImporter = "HTMLImporter",
    CSSImporter = "CSSImporter",
    ActionRunner = "ActionRunner",
    ElementRemoval = "ElementRemoval",
}
export interface Command {
    type: CommandType;
    run(): void;
}
