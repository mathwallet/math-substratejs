const { ApiPromise, WsProvider } = require('@polkadot/api');

let injector = null;
// Samples
class PolkadotWeb3JSSample {
	async login() {
		if (!window.injectedWeb3 || !window.injectedWeb3['polkadot-js']) {
			throw new Error("Please install the MathWallet first");
		}
		// Get Accounts and Injector
		injector = await window.injectedWeb3['polkadot-js'].enable('math sample');
		const accounts = await injector.accounts.get();

		return accounts;
	}

	/***
	 * Transfer
	 * @param fromAddress from
	 * @param toAddress to
	 * @param amount amount
	 */
	async transfer(fromAddress, toAddress, amount) {
		// Initialise the provider to connect to the local node
		const provider = new WsProvider('wss://poc3-rpc.polkadot.io');
		// Create the API and wait until ready
		const api = await ApiPromise.create(provider);
		api.setSigner(injector.signer)
		// Create a extrinsic
		const hash = api.tx.balances.transfer(toAddress, amount).signAndSend(fromAddress);
		// returns
		return hash;
	}
}

window.PolkadotWeb3JSSample = new PolkadotWeb3JSSample();