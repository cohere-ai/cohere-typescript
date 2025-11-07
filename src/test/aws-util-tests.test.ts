import { describe, expect, test } from "vitest";
import { parseAWSEvent } from "../aws-utils";

describe("test aws utils", () => {
    test.each([
        `'�K*��z:event-typechunk'`,
        `':content-typeapplication/json'`,
        `':message-typeevent{"bytes":"eyJldmVudF90eXBlIjoidGV4dC1nZW5lcmF0aW9uIiwiaXNfZmluaXNoZWQiOmZhbHNlLCJ0ZXh0IjoiSGVsbG8ifQ=="}�B@Q�K�;~t:event-typechunk'`,
        `':message-typeevent{"bytes":"eyJldmVudF90eXBlIjoidGV4dC1nZW5lcmF0aW9uIiwiaXNfZmluaXNoZWQiOmZhbHNlLCJ0ZXh0IjoiISJ9"}V�6��K�ش:event-typechunk'`,
    ])("parseAWSEvent ", (event) => {
        expect(parseAWSEvent(event)).toMatchSnapshot();
    })
});
