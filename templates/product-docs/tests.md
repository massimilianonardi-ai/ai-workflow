# Test design and evidence — L7

| TEST ID | Linked UC/REQ | Level and environment | Setup/input | Assertion / failure check | Result / evidence |
| --- | --- | --- | --- | --- | --- |
| TEST-01 | UC-01 / REQ-01 | unit / integration / E2E; <environment> | <fixture/command> | <exact expected output/effect> | planned / passed / failed / blocked; <run> |

Prefer a characteristic normal path, significant failure paths and one early vertical integration slice. Show what each test actually proves; mock success is not live system acceptance. Keep the set bounded by agreed use cases, not arbitrary coverage volume.
