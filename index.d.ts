type TagName = string;
export type AttributeList = Record<string,any>;
export type ElementFactoryArgument = AttributeList | Element | string;
export type ElementFactory = Record<TagName,(...args:ElementFactoryArgument) => Element>;
export type FactoriesNames = "html" | "svg";

export interface FunTagsInterface {
    html:ElementFactory;
    svg:ElementFactory;
}

export const ft:FunTagsInterface;
