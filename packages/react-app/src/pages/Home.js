import React from 'react'
import Button from '@material-ui/core/Button';
import {MiniDrawer} from "../components/NavBar";


export function Home() {
  return (
    <>
    {/* <h2>Home Component</h2>
    <Button variant="contained" color="primary">
    Hello World
  </Button> */}
  <MiniDrawer/>
    </>
  )
}


// Create Header
// function Home({ setBadgeCount, bellPressed }) {
//   ReactGA.pageview('/home');

//   const { active, error, account, library, chainId } = useWeb3React();

//   const [epnsReadProvider, setEpnsReadProvider] = React.useState(null);
//   const [epnsWriteProvider, setEpnsWriteProvider] = React.useState(null);

//   const [controlAt, setControlAt] = React.useState(0);
//   const [adminStatusLoaded, setAdminStatusLoaded] = React.useState(false);
//   const [channelAdmin, setChannelAdmin] = React.useState(false);
//   const [channelJson, setChannelJson] = React.useState([]);

  

//   React.useEffect(() => {
//     const contractInstance = new ethers.Contract(addresses.epnscore, abis.epnscore, library);
//     setEpnsReadProvider(contractInstance);

//     if (!!(library && account)) {
//       let signer = library.getSigner(account);
//       const signerInstance = new ethers.Contract(addresses.epnscore, abis.epnscore, signer);
//       setEpnsWriteProvider(signerInstance);
//     }

//   }, [account]);

//   React.useEffect(() => {
//     // Reset when account refreshes
//     setChannelAdmin(false);
//     setAdminStatusLoaded(false);
//     userClickedAt(1);
//     setChannelJson([]);

//     // EPNS Read Provider Set
//     if (epnsReadProvider != null) {
//       // Instantiate Data Stores
//       UsersDataStore.instance.init(account, epnsReadProvider);
//       ChannelsDataStore.instance.init(account, epnsReadProvider);

//       checkUserForChannelRights();
//     }

//   }, [epnsReadProvider]);


//   // Revert to Feedbox on bell pressed
//   React.useEffect(() => {
//     setControlAt(0);
//   }, [bellPressed]);

//   // handle user action at control center
//   const userClickedAt = (controlIndex) => {
//     setControlAt(controlIndex);
//   }

//   //Start Listening...
//   const listenerForChannelRights = async () => {
//     ChannelsDataStore.instance.addCallbacks(
//       ChannelEvents.ADD_CHANNEL_SELF,
//       "FromCreateChannel",
//       () => {
//         checkUserForChannelRights();
//       }
//     );
//   }

//   // Check if a user is a channel or not
//   const checkUserForChannelRights = async () => {
//     // Check if account is admin or not and handle accordingly
//     EPNSCoreHelper.getChannelJsonFromUserAddress(account, epnsReadProvider)
//       .then(response => {
//         console.log(response);
//         setChannelJson(response);
//         setChannelAdmin(true);
//         setAdminStatusLoaded(true);
//       })
//       .catch(e => {
//         setChannelAdmin(false);
//         setAdminStatusLoaded(true);
//       });

//     // Start listening
//     listenerForChannelRights();
//   }

//   // Render
//   return (
//     <Container>
//       <Controls>
//         <ControlButton index={0} active={controlAt == 0 ? 1 : 0} border="#e20880"
//           onClick={() => {
//             userClickedAt(0)
//           }}
//         >
//           <ControlImage src="./svg/feedbox.svg" active={controlAt == 0 ? 1 : 0} />
//           <ControlText active={controlAt == 0 ? 1 : 0}>Feedbox</ControlText>
//         </ControlButton>
        
//         <ControlButton index={1} active={controlAt == 1 ? 1 : 0} border="#35c5f3"
//           onClick={() => {
//             userClickedAt(1)
//           }}
//         >
//           <ControlImage src="./svg/channel.svg" active={controlAt == 1 ? 1 : 0}/>
//           <ControlText active={controlAt == 1 ? 1 : 0}>Channels</ControlText>
//         </ControlButton>

//         <ControlButton index={2} active={controlAt == 2 ? 1 : 0} border="#674c9f"
//           disabled={!adminStatusLoaded}
//           onClick={() => {
//             if (adminStatusLoaded) {
//               userClickedAt(2)
//             }
//           }}
//         >
//           {!adminStatusLoaded &&
//             <Loader
//                type="Oval"
//                color="#674c9f"
//                height={32}
//                width={32}
//             />
//           }
//           {channelAdmin && adminStatusLoaded &&
//             <ControlChannelContainer>
//               <ControlChannelImage src={`${channelJson.icon}`} active={controlAt == 2 ? 1 : 0}/>
//               <ControlChannelText active={controlAt == 2 ? 1 : 0}>{channelJson.name}</ControlChannelText>
//             </ControlChannelContainer>
//           }
//           {!channelAdmin && adminStatusLoaded &&
//             <>
//               <ControlImage src="./svg/channeladmin.svg" active={controlAt == 2 ? 1 : 0}/>
//               <ControlText active={controlAt == 2 ? 1 : 0}>Create Your Channel</ControlText>
//             </>
//           }
//         </ControlButton>
//         <ControlButton index={3} active={controlAt == 3 ? 1 : 0} border="#e20880"
//           onClick={() => {
//             userClickedAt(3)
//           }}
//         >
//           <ControlImage src="./svg/feedbox.svg" active={controlAt == 3 ? 1 : 0} />
//           <ControlText active={controlAt == 3 ? 1 : 0}>Other Information</ControlText>
//         </ControlButton>
//       </Controls>
//       <Interface>
//         {controlAt == 0 &&
//           <Feedbox
//             epnsReadProvider={epnsReadProvider}
//           />
//         }
//         {controlAt == 1 &&
//           <ViewChannels
//             epnsReadProvider={epnsReadProvider}
//             epnsWriteProvide={epnsWriteProvider}
//           />
//         }
//         {controlAt == 2 && !channelAdmin && adminStatusLoaded &&
//           <ChannelCreationDashboard />
//         }
//         {controlAt == 2 && channelAdmin && adminStatusLoaded &&
//           <ChannelOwnerDashboard />
//         }
//         {controlAt == 3 &&
//           <Info
//             epnsReadProvider={epnsReadProvider}
//             epnsWriteProvide={epnsWriteProvider}
//           />
//         }
//       </Interface>
//     </Container>
//   );
// }