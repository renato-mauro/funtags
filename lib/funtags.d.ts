type TagName = string;
type AttributeList = Record<string,any>;
type ElementFactoryArgument = AttributeList | Element | string;
type ElementFactory = Record<TagName,(...args:ElementFactoryArgument) => Element>;
type FactoriesNames = "html" | "svg";

interface FunTagsInterface {
    html:ElementFactory;
    svg:ElementFactory;
}

export const ft: FunTagsInterface;
