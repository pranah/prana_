import React from "react";
import { useSelector, useDispatch } from 'react-redux'
// import * as React from 'react'
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Image, Link } from "./components";
import logo from "./ethereumLogo.png";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { ethers } from "ethers";
import { Web3Provider } from 'ethers/providers'

import { useEagerConnect, useInactiveListener } from './hooks'

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

import {
  injected,
  network
  
} from './connectors'

import {Home} from './pages/Home';

import {setPranaContract, setUserAccount} from './redux/actions/web3Actions'


enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
  Ledger = 'Ledger',
  Trezor = 'Trezor',
  Lattice = 'Lattice',
  Frame = 'Frame',
  Authereum = 'Authereum',
  Fortmatic = 'Fortmatic',
  Magic = 'Magic',
  Portis = 'Portis',
  Torus = 'Torus'
}

const connectorsByName: { [name: string]: AbstractConnector } = {
  Injected: injected,
  Network: network
}

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function getLibrary(provider: any) {

  return new ethers.providers.Web3Provider(provider);
}

export default function() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  )
}

function ChainId() {
  const { chainId } = useWeb3React()

  return (
    <>
      <span>Chain Id</span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span>{chainId ?? ''}</span>
    </>
  )
}

function BlockNumber() {
  const { chainId, library } = useWeb3React()

  const [blockNumber, setBlockNumber] = React.useState<number>()
  React.useEffect((): any => {
    if (!!library) {
      let stale = false

      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null)
          }
        })

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber)
      }
      library.on('block', updateBlockNumber)

      return () => {
        stale = true
        library.removeListener('block', updateBlockNumber)
        setBlockNumber(undefined)
      }
    }
  }, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Block Number</span>
      <span role="img" aria-label="numbers">
        🔢
      </span>
      <span>{blockNumber === null ? 'Error' : blockNumber ?? ''}</span>
    </>
  )
}

function Account() {
  const { account } = useWeb3React()

  return (
    <>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account === null
          ? '-'
          : account
          ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
          : ''}
      </span>
    </>
  )
}

function Balance() {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = React.useState()
  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>{balance === null ? 'Error' : balance ? `Ξ${balance}` : ''}</span>
    </>
  )
}

function Header() {
  const { active, error } = useWeb3React()

  return (
    <>
      <h1 style={{ margin: '1rem', textAlign: 'right' }}>{active ? '🟢' : error ? '🔴' : '🟠'}</h1>
      <h3
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: '1fr min-content 1fr',
          maxWidth: '20rem',
          lineHeight: '2rem',
          margin: 'auto'
        }}
      >
        <ChainId />
        <BlockNumber />
        <Account />
        <Balance />
      </h3>
    </>
  )
}

function App() {
  const dispatch = useDispatch()

  const context = useWeb3React<Web3Provider>()
  const { connector, activate, deactivate} = context
  // const { connector, library, chainId, account, activate, deactivate, active, error } = context

  const { active, error, account, library, chainId } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  const [pranaReadInstance, setPranaReadInstance] = React.useState(null)
  const [pranaWriteInstance, setPranaWriteInstance] = React.useState(null)

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  React.useEffect(() => {
    if(!!(account && library)){
    // let signer = library.getSigner(account);
    // console.log("🚀 ~ file: App.tsx ~ line 261 ~ React.useEffect ~ library", library)
    // console.log("🚀 ~ file: App.tsx ~ line 264 ~ React.useEffect ~ addresses.prana", addresses.prana)
    // console.log("🚀 ~ file: App.tsx ~ line 265 ~ React.useEffect ~ abis.prana", abis.prana)

    
    const contractInstance = new ethers.Contract(addresses.prana, abis.prana, library);
    // console.log("🚀 ~ file: App.tsx ~ line 249 ~ React.useEffect ~ contractInstance", contractInstance)
    setPranaReadInstance(contractInstance)
    // console.log("🚀 ~ file: App.tsx ~ line 262 ~ App ~ pranaReadInstance", pranaReadInstance)

      dispatch(setUserAccount(account));
      dispatch(setPranaContract(contractInstance));
    }
    
  }, [account, library])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <>
    {account && 
    
    <Home />

    }
    {(!account) &&
    <button>Log In</button>
    }
      
    </>
  )
}

// function App() {
//   const { loading, error, data } = useQuery(GET_TRANSFERS);
//   const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

//   React.useEffect(() => {
//     if (!loading && !error && data && data.transfers) {
//       console.log({ transfers: data.transfers });
//     }
//   }, [loading, error, data]);

//   return (
//     <div>
//       <Header>
//         <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
//       </Header>
//       <Body>
//         <Image src={logo} alt="react-logo" />
//         <p>
//           Edit <code>packages/react-app/src/App.js</code> and save to reload.
//         </p>
//         {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
//         <Button hidden onClick={() => readOnChainData()}>
//           Read On-Chain Balance
//         </Button>
//         <Link href="https://ethereum.org/developers/#getting-started" style={{ marginTop: "8px" }}>
//           Learn Ethereum
//         </Link>
//         <Link href="https://reactjs.org">Learn React</Link>
//         <Link href="https://thegraph.com/docs/quick-start">Learn The Graph</Link>
//       </Body>
//     </div>
//   );
// }

// export default App;
