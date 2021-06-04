# iotax

CLI for Chrysalis and beyond

[![License badge](https://img.shields.io/github/license/jmcanterafonseca-iota/iotax.svg)](https://opensource.org/licenses/MIT)
[![Build badge](https://img.shields.io/travis/jmcanterafonseca-iota/iotax.svg)](https://travis-ci.org/jmcanterafonseca-iota/iotax/)
[![node badge](https://img.shields.io/node/v/%40jmcanterafonseca-iota%2Fiotax.svg)](https://www.npmjs.com/package/√)
[![npm badge](https://img.shields.io/npm/dm/%40jmcanterafonseca-iota%2Fiotax.svg)](https://www.npmjs.com/package/@jmcanterafonseca-iota/iotax)

## Installation

```
npm install -g @jmcanterafonseca-iota/iotax
```

## Run 

On the command line just run ```iotax```

## Commands

```
iotax [command]

Commands:
  iotax did  DID operations
  iotax vc   VC  Operations

Options:
  --version  Show version number                                       [boolean]
  --mainnet  IOTA Mainnet                                              [boolean]
  --testnet  IOTA testnet                                               [boolean]
  --comnet   IOTA Comnet                                               [boolean]
  --net, -n  IOTA Network                                               [string]
  --help     Show help                                                 [boolean]
```

## DID 

```
iotax did

DID Operations

Commands:
  iotax did create   DID Creation
  iotax did resolve  DID Resolution

Options:
  --version   Show version number                                      [boolean]
  --mainnet   IOTA Mainnet                                             [boolean]
  --testnet   IOTA testnet                                              [boolean]
  --comnet    IOTA Comnet                                              [boolean]
  --net, -n   IOTA Network                                              [string]
  --help      Show help                                                [boolean]
```

### DID Creation

```
iotax did create

DID Creation

Options:
  --version     Show version number                                      [boolean]
  --mainnet     IOTA Mainnet                                             [boolean]
  --testnet     IOTA testnet                                              [boolean]
  --comnet      IOTA Comnet                                              [boolean]
  --net, -n     IOTA Network                                              [string]
  --help        Show help                                                [boolean]
  --didService  List of DID services (JSON Array)                        [string]
```

### DID Resolution

```
iotax did resolve

DID Resolution

Options:
  --version   Show version number                                      [boolean]
  --mainnet   IOTA Mainnet                                             [boolean]
  --testnet   IOTA testnet                                              [boolean]
  --comnet    IOTA Comnet                                              [boolean]
  --net, -n   IOTA Network                                              [string]
  --help      Show help                                                [boolean]
  --did      DID to be resolved                              [string] [required]
```

## Verifiable Credentials (VC)

```
iotax vc

Verifiable Credential operations

Commands:
  iotax vc issue   VC issuance
  iotax vc verify  VC verification

Options:
  --version  Show version number                                       [boolean]
  --mainnet  IOTA Mainnet                                              [boolean]
  --testnet  IOTA testnet                                               [boolean]
  --comnet   IOTA Comnet                                               [boolean]
  --net, -n  IOTA Network                                               [string]
  --help     Show help                                                 [boolean]
  --method   Verification Method                             [string] [required]
```

### Issuing a VC

```
iotax vc issue

VC issuance

Options:
  --version  Show version number                                       [boolean]
  --mainnet  IOTA Mainnet                                              [boolean]
  --testnet   IOTA testnet                                               [boolean]
  --comnet   IOTA Comnet                                               [boolean]
  --net, -n  IOTA Network                                               [string]
  --help     Show help                                                 [boolean]
  --method   Verification Method                             [string] [required]
  --issuer   DID of the issuer of the VC                     [string] [required]
  --expDate  Expiration Date                                 [string] [optional]
  --secret   Secret key of the issuer                        [string] [required]
  --subject  (D)ID of the subject of the VC                  [string] [required]
  --claims   Credential claim data (As a JSON Object)        [string] [required]
  --type     Credential type                                 [string] [required]
  --id       Credential id                                              [string]
  --json     Output the credential in JSON format ready for cyp        [boolean]
```

### Verifying a VC or a VP

```
iotax vc verify

VC verification

Options:
  --version  Show version number                                       [boolean]
  --mainnet  IOTA Mainnet                                              [boolean]
  --testnet  IOTA testnet                                               [boolean]
  --comnet   IOTA Comnet                                               [boolean]
  --net, -n  IOTA Network                                               [string]
  --help     Show help                                                 [boolean]
  --vc       Verifiable Credential to be verified (As JSON)  [string] [required]
  --vp       Verifiable Presentation to be verified (As JSON)  [string] [required]
```

### Presenting a VC

```
iotax vc present

Options:
  --version  Show version number                                       [boolean]
  --testnet  IOTA Chrysalis Testnet                                    [boolean]
  --mainnet  IOTA Chrysalis Mainnet                                    [boolean]
  --comnet   IOTA Comnet                                               [boolean]
  --net, -n  IOTA Network                                               [string]
  --help     Show help                                                 [boolean]
  --vc       VC to be presented                              [string] [required]
  --holder   Holder who presents the credential. By default is the credential
             subject                                                    [string]
  --method   Verification Method                             [string] [required]
  --secret   Secret key of the holder                        [string] [required]
  --id       Presentation id                                            [string]
  --type     Presentation type                                          [string]
  --json     Output the credential presentation in JSON format ready for cyp
                                                                       [boolean]
```
