**@sundaeswap/yield-farming** • [**Docs**](modules.md)

***

# Getting Started with Taste Tests

```bash
$ bun add @sundaeswap/yield-farming lucid-cardano
```

Next, configure the instance in your app:

```ts
import { SundaeSDK } from "@sundaeswap/core";
import { YieldFarmingLucid } from "@sundaeswap/yield-farming";

const sdk: SundaeSDK = new SundaeSDK({
  ...args,
});

const walletInstance = sdk.builder().wallet;

if (!walletInstance) {
  throw new Error();
}

const YF = new YieldFarmingLucid(walletInstance);
const txHash = await YF.lock({ ...args }).then(({ submit }) => submit());
```

For more instructions see [Overview](/).
