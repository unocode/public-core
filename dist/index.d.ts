import './core/unocode';
declare global  {
    interface Window {
        UnoCode: Object;
    }
}
export * from './structure/Action';
export * from './structure/Guard';
export * from './structure/Command';
export declare class Core {
    static start(actions: Array<any>): void;
}
