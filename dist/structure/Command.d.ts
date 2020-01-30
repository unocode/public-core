import { CommandType } from './types';
export declare const Command: {
    JSImporter: (code: Function) => {
        type: CommandType;
        code: Function;
    };
    HTMLImporter: (path: String, html: "string", appendChild: boolean) => {
        type: CommandType;
        path: String;
        html: "string";
        appendChild: boolean;
    };
    CSSImporter: (css: string) => {
        type: CommandType;
        css: string;
    };
    ActionRunner: (id: string) => {
        type: CommandType;
        id: string;
    };
    ElementRemoval: (path: string) => {
        type: CommandType;
        path: string;
    };
};
