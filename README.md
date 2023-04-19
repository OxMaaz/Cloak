# Cloak
TronCloak offers confidential, private transactions with a virtual secure address using an intuitive and user-friendly interface.


Cloak allows users to transfer funds using a unique and secure address called a ‘stealth or secret address.’ This address is anonymous and can only be linked to the intended recipient of the transaction, making it virtually impossible for anyone else to know the identity of the recipient or track their transactions. Cloak uses a one-time public key to generate a new address for each transaction, keeping your financial information private and secure. To use Cloak, you need to generate a unique cloak address, share it with the sender, and retrieve your private key to access the funds. Cloak is a valuable tool for anyone who values privacy and security in their financial transactions.

Lets take an example of Charlotte (receiver) and william (sender):

.Charlotte generates a 'DontRevealMe" key and a unique “cloak address” using cryptographic algorithms. The cloak address is used as a public key here.

.William looks up the cloak address and generates a one-time-use eph key. The sender combines his key with the cloak address to create a unique and anonymous stealth address, which is used to send assets to the charlotte.

.William then publishes his eph public key on the Tron network, allowing Charlotte to scan it for new keys. Charlotte periodically scans the registry for new keys and uses her DontRevealMe key to generate stealth addresses associated with her.

.If Charlotte matches assets associated with a stealth address generated using a eph public key from the registry, she can compute the spending key or private key for that address and claim the assets. The one-time-use keys used to generate the stealth addresses are discarded to ensure privacy and security.

In summary, Cloak uses cryptographic algorithms and one-time-use keys to create anonymous and secure public addresses for transactions on the blockchain. These addresses can also be associated with domain names through Name Services and can be generated and claimed using ephemeral keys and public key registries.
