/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Cohere from "../index";

export interface ToolV2 {
    type?: "function";
    /** The function to be executed. */
    function?: Cohere.ToolV2Function;
}
