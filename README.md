# soft3.js 
## Cyber client API library

[![version](https://img.shields.io/npm/v/@cybercongress/cyber-js)](https://www.npmjs.com/package/@cybercongress/cyber-js)

### Modules support:

| Module       	| Messages                                                                                                                          	| Signing                                                                                                	| Queries                                                                                                                                                                                                                                                                                                                    	|
|--------------	|-----------------------------------------------------------------------------------------------------------------------------------	|--------------------------------------------------------------------------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| Graph        	| - MsgCyberlink                                                                                                                    	| - cyberlink<br>- motif<br>- linkchain                                                                  	| - graphStats                                                                                                                                                                                                                                                                                                               	|
| Rank         	|                                                                                                                                   	|                                                                                                        	| - search<br>- backlinks<br>- rank<br>- karma<br>- isLinkExist<br>- isAnyLinkExist<br>- negentropy                                                                                                                                                                                                                                          	|
| Bandwidth    	|                                                                                                                                   	|                                                                                                        	| - load<br>- price<br>- accountBandwidth                                                                                                                                                                                                                                                                                    	|
| Resources    	| - MsgInvestmint                                                                                                                   	| - investmint                                                                                           	| - resourcesParams                                                                                                                                                                                                                                                                                                          	|
| Grid         	| - MsgCreateRoute<br>- MsgEditRoute<br>- MsgEditRouteName<br>- MsgDeleteRoute                                                      	| - createEnergyRoute<br>- editEnergyRoute<br>- deleteEnergyRoute<br>- editEnergyRouteName               	| - energyParams<br>- sourceRoutes<br>- destinationRoutes<br>- destinationRoutedEnergy<br>- sourceRoutedEnergy<br>- route<br>- routes                                                                                                                                                                                        	|
| Wasm         	| - MsgClearAdmin<br>- MsgExecuteContract<br>- MsgMigrateContract<br>- MsgStoreCode<br>- MsgInstantiateContract<br>- MsgUpdateAdmin 	| - upload<br>- instantiate<br>- updateAdmin<br>- clearAdmin<br>- migrate<br>- execute<br>- executeArray 	| - getCodes<br>- getCodeDetails<br>- getContracts<br>- getContract<br>- getContractCodeHistory<br>- queryContractRaw<br>- queryContractSmart                                                                                                                                                                                	|
| Bank         	| - MsgSend                                                                                                                         	| - sendTokens                                                                                           	| - getBalance<br>- getAllBalances<br>- totalSupply                                                                                                                                                                                                                                                                          	|
| Auth         	|                                                                                                                                   	|                                                                                                        	| - getAccount                                                                                                                                                                                                                                                                                                               	|
| Liquidity    	| - MsgSwapWithinBatch<br>- MsgDepositWithinBatch<br>- MsgWithdrawWithinBatch<br>- MsgCreatePool                                    	| - swapWithinBatch<br>- depositWithinBatch<br>- withdwawWithinBatch<br>- createPool                     	| - liquidityParams<br>- pool<br>- pools                                                                                                                                                                                                                                                                                     	|
| Governance   	| - MsgDeposit<br>- MsgVote<br>- MsgSubmitProposal                                                                                  	| - voteProposal<br>- submitProposal<br>- depositProposal                                                	| - govParams<br>- proposals<br>- proposal<br>- deposits<br>- deposit<br>- tally<br>- votes<br>- vote                                                                                                                                                                                                                        	|
| Distribution 	| - MsgWithdrawDelegatorReward                                                                                                      	| - withdrawRewards<br>- withdrawAllRewards                                                              	| - distributionParams<br>- communityPool<br>- delegationRewards<br>- delegationTotalRewards<br>- delegatorValidatorsDistribution<br>- delegatorWithdrawAddress<br>- validatorCommission<br>- validatorOutstandingRewards<br>- validatorSlashes                                                                              	|
| Staking      	| - MsgDelegate<br>- MsgBeginRedelegate<br>- MsgUndelegate                                                                          	| - delegateTokens<br>- redelegateTokens<br>- undelegateTokens                                           	| - stakingParams<br>- delegation<br>- delegatorDelegations<br>- delegatorUnbondingDelegations<br>- delegatorValidator<br>- delegatorValidators<br>- historicalInfo<br>- stakingPool<br>- redelegations<br>- unbondingDelegation<br>- validator<br>- validatorDelegations<br>- validators<br>- validatorUnbondingDelegations 	|
| Gov          	| - MsgVote<br>- MsgSubmitProposal<br>- MsgDeposit                                                                                  	| - voteProposal<br>- submitProposal<br>- depositProposal                                                	|                                                                                                                                                                                                                                                                                                                            	|
| IBC          	| - MsgTransfer                                                                                                                     	| - sendIbcTokens                                                                                        	| - allDenomTraces<br>- denomTrace                                                                                                                                                                                                                                                                                                                            	|
| Authz        	|                                                                                                                                   	|                                                                                                        	|                                                                                                                                                                                                                                                                                                                            	|
| Relayer      	|                                                                                                                                   	|                                                                                                        	|                                                                                                                                                                                                                                                                                                                            	|


### Usage:
```
yarn

yarn get-proto

yarn define-proto

yarn postdefine-proto

yarn build

yarn lint-fix
```


## Neuron convergence compatibility

This package remains the Cosmos/CosmWasm SDK for existing accounts and chain
schemas. Its neuron fields are the original bech32 addresses; they are not
runtime prog/task IDs. The Rust neuron convergence does not change signing
bytes, protobuf tags, contract addresses, keys or dependency versions here.

After installing the pinned lockfile, run `npm run build` and
`npm run test:compat`. Offline vectors independently verify the frozen mudra
ADR-036 signatures through CosmJS, known Cosmos HD key/address derivation,
MsgCyberlink amino/protobuf bytes and CosmWasm MsgExecuteContract fields.
The domain fixture comes from mudra 348c46195388ac009667144987511a0e33bdc859;
its capture source hashes are retained in the soft3 convergence audit. This is
compatibility evidence, not a claim of native NSIG1 transport or neuron runtime
execution in the JavaScript SDK.
