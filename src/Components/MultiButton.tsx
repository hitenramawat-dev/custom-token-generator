// import { useWallet, type Wallet } from "@solana/wallet-adapter-react";
// import { useWalletModal } from "@solana/wallet-adapter-react-ui";
// import { PublicKey } from "@solana/web3.js";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import type { Config } from "tailwind-merge";
// import { Button } from "./ui/button";
// import CustomWallet from "./ui/CustomWallet";

// type ButtonState = {
//     buttonState: 'connecting' | 'connected' | 'disconnecting' | 'has-wallet' | 'no-wallet';
//     onConnect?: () => void;
//     onDisconnect?: () => void;
//     onSelectWallet?: () => void;
//     publicKey?: PublicKey;
//     walletIcon?: Wallet['adapter']['icon'];
//     walletName?: Wallet['adapter']['name'];
// };


// export function useWalletMultiButton({ onSelectWallet }: Config): ButtonState {
//     const { connect, connected, connecting, disconnect, disconnecting, publicKey, select, wallet, wallets } = useWallet();

//     let buttonState: ButtonState['buttonState'];

//     if (connecting) {
//         buttonState = 'connecting';
//     } else if (connected) {
//         buttonState = 'connected';
//     } else if (disconnecting) {
//         buttonState = 'disconnecting';
//     } else if (wallet) {
//         buttonState = 'has-wallet';
//     } else {
//         buttonState = 'no-wallet';
//     }
//     const handleConnect = useCallback(() => {
//         connect().catch(() => {
//             // Silently catch because any errors are caught by the context `onError` handler
//         });
//     }, [connect]);

//     const handleDisconnect = useCallback(() => {
//         disconnect().catch(() => {
//             // Silently catch because any errors are caught by the context `onError` handler
//         });
//     }, [disconnect]);

//     const handleSelectWallet = useCallback(() => {
//         onSelectWallet({ onSelectWallet: select, wallets });
//     }, [onSelectWallet, select, wallets]);

//     return {
//         buttonState,
//         onConnect: buttonState === 'has-wallet' ? handleConnect : undefined,
//         onDisconnect: buttonState !== 'disconnecting' && buttonState !== 'no-wallet' ? handleDisconnect : undefined,
//         onSelectWallet: handleSelectWallet,
//         publicKey: publicKey ?? undefined,
//         walletIcon: wallet?.adapter.icon,
//         walletName: wallet?.adapter.name,
//     };

// }

// export function BaseWalletConnectionButton({ walletIcon, walletName, ...props }: Props) {

//     return (
//         <div>

//             <Button
//                 {...props}

//                 className="wallet-adapter-button-trigger"

//                 startIcon={
//                     walletIcon && walletName ? (
//                         <CustomWallet />
//                     ) : undefined
//                 }
//             />

//         </div>

//     );
// }



// export function BaseWalletMultiButton({ children, labels, ...props }) {
//     const { setVisible: setModalVisible } = useWalletModal();
//     const { buttonState, onConnect, onDisconnect, publicKey, walletIcon, walletName } = useWalletMultiButton({ onSelectWallet() { setModalVisible(true); }, });

//     const { wallet } = useWallet();
//     const [copied, setCopied] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const ref = useRef<HTMLUListElement>(null);

//     const pub = wallet?.adapter.publicKey!;

//     useEffect(() => {
//         const listener = (event: MouseEvent | TouchEvent) => {
//             const node = ref.current;

//             // Do nothing if clicking dropdown or its descendants
//             if (!node || node.contains(event.target as Node)) return;

//             setMenuOpen(false);
//         };

//         document.addEventListener('mousedown', listener);
//         document.addEventListener('touchstart', listener);

//         return () => {
//             document.removeEventListener('mousedown', listener);
//             document.removeEventListener('touchstart', listener);
//         };
//     }, []);
//     const content = useMemo(() => {
//         if (children) {
//             return children;
//         } else if (publicKey) {
//             const base58 = publicKey.toBase58();
//             return base58.slice(0, 4) + '..' + base58.slice(-4);
//         } else if (buttonState === 'connecting' || buttonState === 'has-wallet') {
//             return labels[buttonState];
//         } else {
//             return labels['no-wallet'];
//         }
//     }, [buttonState, children, labels, publicKey]);

//     return (
//         <div className="wallet-adapter-dropdown">

//             <BaseWalletConnectionButton
//                 {...props}
//                 aria-expanded={menuOpen}

//                 style={{ pointerEvents: menuOpen ? 'none' : 'auto', ...props.style }}

//                 onClick={() => {
//                     switch (buttonState) {
//                         case 'no-wallet':
//                             setModalVisible(true);
//                             break;
//                         case 'has-wallet':
//                             if (onConnect) {
//                                 //onConnect();
//                                 setMenuOpen(true);
//                             }
//                             break;
//                         case 'connected':
//                             setMenuOpen(false);
//                             // return 
//                             break;
//                     }
//                 }}

//                 walletIcon={walletIcon}
//                 walletName={walletName}
//             >
//                 {content}
//             </BaseWalletConnectionButton>

//             <ul
//                 aria-label="dropdown-list"
//                 className={`wallet-adapter-dropdown-list ${menuOpen && 'wallet-adapter-dropdown-list-active'}`}
//                 ref={ref}
//                 role="menu"
//             >

//                 {publicKey ? (
//                     <li
//                         className="wallet-adapter-dropdown-list-item"
//                         onClick={async () => {
//                             await navigator.clipboard.writeText(publicKey.toBase58());
//                             setCopied(true);
//                             setTimeout(() => setCopied(false), 400);
//                         }}
//                         role="menuitem"
//                     >
//                         {copied ? labels['copied'] : labels['copy-address']}
//                     </li>
//                 ) : null}



//                 <li
//                     className="wallet-adapter-dropdown-list-item"
//                     onClick={() => {
//                         setModalVisible(true);
//                         setMenuOpen(false);
//                     }}
//                     role="menuitem"
//                 >
//                     {labels['change-wallet']}
//                 </li>


//                 {onDisconnect ? (
//                     <li
//                         className="wallet-adapter-dropdown-list-item"
//                         onClick={() => {
//                             onDisconnect();
//                             setMenuOpen(false);
//                         }}
//                         role="menuitem"
//                     >
//                         {labels['disconnect']}
//                     </li>
//                 ) : null}

//             </ul>

//         </div>
//     );
// }


// export function BaseWalletMultiButton({ children, labels, ...props }: Props) {
//     const { setVisible: setModalVisible } = useWalletModal();
//     const { buttonState, onConnect, onDisconnect, publicKey, walletIcon, walletName } = useWalletMultiButton({
//         onSelectWallet() {
//             setModalVisible(true);
//         },
//     });
//     const [copied, setCopied] = useState(false);
//     const [menuOpen, setMenuOpen] = useState(false);
//     const ref = useRef<HTMLUListElement>(null);
//     useEffect(() => {
//         const listener = (event: MouseEvent | TouchEvent) => {
//             const node = ref.current;

//             // Do nothing if clicking dropdown or its descendants
//             if (!node || node.contains(event.target as Node)) return;

//             setMenuOpen(false);
//         };

//         document.addEventListener('mousedown', listener);
//         document.addEventListener('touchstart', listener);

//         return () => {
//             document.removeEventListener('mousedown', listener);
//             document.removeEventListener('touchstart', listener);
//         };
//     }, []);
//     const content = useMemo(() => {
//         if (children) {
//             return children;
//         } else if (publicKey) {
//             const base58 = publicKey.toBase58();
//             return base58.slice(0, 4) + '..' + base58.slice(-4);
//         } else if (buttonState === 'connecting' || buttonState === 'has-wallet') {
//             return labels[buttonState];
//         } else {
//             return labels['no-wallet'];
//         }
//     }, [buttonState, children, labels, publicKey]);
//     return (
//         <div className="wallet-adapter-dropdown">
//             <BaseWalletConnectionButton
//                 {...props}
//                 aria-expanded={menuOpen}
//                 style={{ pointerEvents: menuOpen ? 'none' : 'auto', ...props.style }}
//                 onClick={() => {
//                     switch (buttonState) {
//                         case 'no-wallet':
//                             setModalVisible(true);
//                             break;
//                         case 'has-wallet':
//                             if (onConnect) {
//                                 onConnect();
//                             }
//                             break;
//                         case 'connected':
//                             setMenuOpen(true);
//                             break;
//                     }
//                 }}
//                 walletIcon={walletIcon}
//                 walletName={walletName}
//             >
//                 {content}
//             </BaseWalletConnectionButton>
//             <ul
//                 aria-label="dropdown-list"
//                 className={`wallet-adapter-dropdown-list ${menuOpen && 'wallet-adapter-dropdown-list-active'}`}
//                 ref={ref}
//                 role="menu"
//             >
//                 {publicKey ? (
//                     <li
//                         className="wallet-adapter-dropdown-list-item"
//                         onClick={async () => {
//                             await navigator.clipboard.writeText(publicKey.toBase58());
//                             setCopied(true);
//                             setTimeout(() => setCopied(false), 400);
//                         }}
//                         role="menuitem"
//                     >
//                         {copied ? labels['copied'] : labels['copy-address']}
//                     </li>
//                 ) : null}
//                 <li
//                     className="wallet-adapter-dropdown-list-item"
//                     onClick={() => {
//                         setModalVisible(true);
//                         setMenuOpen(false);
//                     }}
//                     role="menuitem"
//                 >
//                     {labels['change-wallet']}
//                 </li>
//                 {onDisconnect ? (
//                     <li
//                         className="wallet-adapter-dropdown-list-item"
//                         onClick={() => {
//                             onDisconnect();
//                             setMenuOpen(false);
//                         }}
//                         role="menuitem"
//                     >
//                         {labels['disconnect']}
//                     </li>
//                 ) : null}
//             </ul>
//         </div>
//     );
// }


