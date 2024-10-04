#!/usr/bin/env ts-node

import * as jest from "jest-cli"
import { config } from "./convict"

process.env.BASE_URL = config.get("baseUrl")
process.env.CO_API_KEY = config.get("apiKey")
process.env.FEATURES_TO_TEST = config.get("featuresToTest").join(",")

console.log("Running tests with the following configuration:")
console.log(`BASE_URL: ${process.env.BASE_URL}`)
console.log(`CO_API_KEY: ${process.env.CO_API_KEY}`)
console.log(`FEATURES_TO_TEST: ${process.env.FEATURES_TO_TEST}`)

jest.run(["./src/test/cloud-tests"])