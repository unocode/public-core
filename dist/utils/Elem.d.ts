export interface Methods {
    exist: boolean;
    isNull: boolean;
    includesText(text: string): boolean;
}
declare const _default: (selector: string) => Methods;
export default _default;
