import { Action, Guard, Command } from './types';
export interface ActionParams {
    guard?: Guard;
    commands: Array<Command>;
}
export declare function Action({guard, commands}: ActionParams): Action;
