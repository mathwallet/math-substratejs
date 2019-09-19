const { ApiPromise, WsProvider } = require('@polkadot/api');
import {
	isWeb3Injected,
	web3Accounts,
	web3Enable,
	web3FromAddress
} from "@polkadot/extension-dapp";
web3Enable('polkadot-js/apps');

import { IdentityTypes } from 'edgeware-node-types/dist/identity';
import { SignalingTypes } from 'edgeware-node-types/dist/signaling';
import { TreasuryRewardTypes } from 'edgeware-node-types/dist/treasuryReward';
import { VotingTypes } from 'edgeware-node-types/dist/voting';

// Samples
class PolkadotWeb3JSSample {
	/***
	 * login
	 * @return accounts [{"address":"5D2JMakX2CgtPPkiqUzdsK3Y41vD6HyNy8ZETUjhjRrZFTfG","meta":{"name":"cc1","source":"polkadot-js"}}]

	 */
	async login() {
		if (!isWeb3Injected) {
			throw new Error("Please install/unlock the MathWallet first");
		}
		// meta.source contains the name of the extension that provides this account
		const allAccounts = await web3Accounts();
		return allAccounts;
	}

	/***
	 * Transfer
	 * @param from from
	 * @param to to
	 * @param amount amount
	 * @return hash
	 */
	async transfer(from, to, amount) {

		//////////////////////////// alexander  ////////////////////////////
		// Initialise the provider to connect to the local node
		const provider = new WsProvider('wss://alex.unfrastructure.io/public/ws');
		// Create the API and wait until ready
		const api = await ApiPromise.create({ provider });

		//////////////////////////// alexander  ////////////////////////////

		//////////////////////////// edgeware  ////////////////////////////
		// const provider = new WsProvider('wss://mainnet1.edgewa.re');
		// const api = await ApiPromise.create({
		// 	provider,
		// 	types: {
		// 		...IdentityTypes,
		// 		...SignalingTypes,
		// 		...TreasuryRewardTypes,
		// 		...VotingTypes,
		// 	}
		// });
		//////////////////////////// edgeware end ////////////////////////////

		// finds an injector for an address
		const injector = await web3FromAddress(from);

		// sets the signer for the address on the @polkadot/api
		api.setSigner(injector.signer);

		// sign and send out transaction - notice here that the address of the account (as retrieved injected)
		// is passed through as the param to the `signAndSend`, the API then calls the extension to present
		// to the user and get it signed. Once completex, the api sends the tx + signature via the normal process
		const h = api.tx.balances
			.transfer(to, amount)
			.signAndSend(from);

		return h;
	}
}

window.PolkadotWeb3JSSample = new PolkadotWeb3JSSample();