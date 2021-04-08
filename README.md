# iotax

CLI for IOTA 1, Chrysalis and beyond

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
  iotax mam  MAM Channel Operations
  iotax did  DID operations

Options:
  --version  Show version number                                       [boolean]
  --mainnet  IOTA Mainnet                                              [boolean]
  --devnet   IOTA Devnet                                               [boolean]
  --comnet   IOTA Comnet                                               [boolean]
  --net, -n  IOTA Network                                               [string]
  --help     Show help                                                 [boolean]
```

## MAM Commands

```
iotax mam

MAM Channel Operations

Commands:
  iotax mam fetch    MAM Channel Fetch
  iotax mam publish  MAM Channel Publish

Options:
  --version   Show version number                                      [boolean]
  --mainnet   IOTA Mainnet                                       [boolean]
  --devnet    IOTA Devnet                                              [boolean]
  --comnet    IOTA Comnet                                              [boolean]
  --net, -n   IOTA Network                                              [string]
  --help      Show help                                                [boolean]
  --mode, -m  MAM Channel mode
                [string] [required] [choices: "public", "private", "restricted"]
```

### MAM Fetch

```
iotax mam fetch

MAM Channel Fetch

Options:
  --version     Show version number                                    [boolean]
  --mainnet     IOTA Mainnet                                       [boolean]
  --devnet      IOTA Devnet                                            [boolean]
  --comnet      IOTA Comnet                                            [boolean]
  --net, -n     IOTA Network                                            [string]
  --help        Show help                                              [boolean]
  --mode, -m    MAM Channel mode
                [string] [required] [choices: "public", "private", "restricted"]
  --root, -r    MAM Channel's root                                      [string]
  --limit, -l   Maximum number of messages to be fetched                [number]
  --from, -f    Start Index for retrieval                               [number]
  --seed, -s    MAM Channel's seed                                      [string]
  --chunksize   Chunk size for retrieval                                [number]
  --partitions  Number of partitions to use when fetching  [number] [default: 1]
  --combined    MAM Fetch Combined                    [boolean] [default: false]
  --watch, -w   Watch the MAM Channel                                  [boolean]
```

### MAM Publish

```
iotax mam publish

MAM Channel Publish

Options:
  --version         Show version number                                [boolean]
  --mainnet         IOTA Mainnet                                       [boolean]
  --devnet          IOTA Devnet                                        [boolean]
  --comnet          IOTA Comnet                                        [boolean]
  --net, -n         IOTA Network                                        [string]
  --help            Show help                                          [boolean]
  --mode, -m        MAM Channel mode
                [string] [required] [choices: "public", "private", "restricted"]
  --seed, -s        MAM Channel's seed                       [string] [required]
  --sidekey         Sidekey for restricted channels     [string] [default: null]
  --message, --msg  JSON message to be published             [string] [required]
  --index, -i       Start index used to publish            [number] [default: 0]
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
  --devnet    IOTA Devnet                                              [boolean]
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
  --devnet      IOTA Devnet                                              [boolean]
  --comnet      IOTA Comnet                                              [boolean]
  --net, -n     IOTA Network                                              [string]
  --help        Show help                                                [boolean]
  --didService  List of DID services (JSON Array)                       [string]
```

### DID Resolution

```
iotax did resolve

DID Resolution

Options:
  --version   Show version number                                      [boolean]
  --mainnet   IOTA Mainnet                                             [boolean]
  --devnet    IOTA Devnet                                              [boolean]
  --comnet    IOTA Comnet                                              [boolean]
  --net, -n   IOTA Network                                              [string]
  --help      Show help                                                [boolean]
  --did      DID to be resolved                              [string] [required]
```
