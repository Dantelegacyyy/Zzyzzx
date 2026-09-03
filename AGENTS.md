# Persistent System Instructions

## Project AEGIS Blueprint

The following phase constraints dictate the deployment and operational boundaries for Project AEGIS. Do not violate these phase boundaries.

```text
PHASE 1
PROJECT AEGIS
    NOT_CREATED
        │
        ▼
PHASE 2
PROJECT AEGIS
    DORMANT_SEED
    ISOLATED
    NON_RUNTIME
    NON_AUTOMATED
    READ-ONLY EVIDENCE OBSERVER
        │
        ▼
PHASE 2 HUMAN REVIEW
        │
        ▼
PHASE 2.5
PROJECT AEGIS
    SEPARATE ENVIRONMENT
    SEPARATE REPOSITORY
    SEPARATE VERIFIER
    OWNER_LOCKED
    NO CEREBRO CONTROL PATH
    NO AUTOMATED RESPONSE
        │
        ▼
FUTURE OWNER AUTHORIZATION
        │
        ▼
AEGIS ACTIVATION / "UNLEASH"
        │
        ├── live event intake
        ├── continuous patrol
        ├── policy enforcement
        └── authorized response
```
