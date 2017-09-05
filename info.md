# Connect to rinkby 
https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc
https://www.rinkeby.io/

# Connect to testnet
To mine add `--mine`
To set an identity  --identity somename

```
geth --testnet console
```

# Create a private ethereum network
https://github.com/ethereum/go-ethereum/wiki/Private-network

### Create a Genesis File in somegenesis.json
https://ethereum.stackexchange.com/questions/15682/the-meaning-specification-of-config-in-genesis-json
```
{
    "config": {
        "chainId": 15,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "16384",
    "gasLimit": "2100000",
    "alloc": {
        "7df9a875a174b3bc565e6424a0050ebc1b2d1d82": { "balance": "16384" },
        "f41c74c9ae680c1aa78f42e5647a62f353b7bdde": { "balance": "400000" }
    }
}
```

### Initialize the test network data in a directory
`geth --datadir /Users/justinthomas/.testchain init somegenesis.json`

### Create a new wallet for this node 
https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts

`geth --datadir ./.testchain --networkid 15 account new`

### Connecting to geth from another client:

`--rpc --rpccorsdomain "*" --rpcapi="db,eth,net,web3,personal,web3"`

### Export a wallet 
TBD

### Import in another chain
TBD

### Run JS console to interact and mine.  
`geth --datadir ./.testchain/ --networkid 15 --mine console`

## JS Console

### Vars you should know and are imported

* eth
* personal
* eth.accounts
* web3
* eth.coinbase


### New Account
```
personal.newAccount('password')
```

### Unlock your account
```
personal.unlockAccount(eth.accounts[0],'password')
```

### Mining
```
miner.start(2) // two miner threads
miner.stop()
```

### Turn off debug messages
```
debug.verbosity(1);
```

### Get your balance
```
eth.getBalance(eth.accounts[0]);
web3.fromWei(eth.getBalance(eth.coinbase),'ether');
```

### Sign a message
```
personal.sign(web3.sha3('hi2u'),eth.accounts[0]);
```

OR

```
eth.sign(eth.accounts[0],web3.sha3('yesyesyall'))
```

### Verify a Signature
TBD

### Send ether

```
eth.sendTransaction({from:eth.coinbase, value:web3.toWei(1,'ether'),to:'0x6983d0A164Ff86381c5B999603771D5343eea48F'});
```


