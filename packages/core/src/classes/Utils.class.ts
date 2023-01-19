import {
  IAsset,
  IPoolData,
  IPoolDataAsset,
  IProtocolParams,
  TSupportedNetworks,
} from "../@types";
import { AssetAmount } from "./AssetAmount.class";

export class Utils {
  static getParams(network: TSupportedNetworks): IProtocolParams {
    const params: Record<TSupportedNetworks, IProtocolParams> = {
      mainnet: {
        ESCROW_ADDRESS: "",
        SCOOPER_FEE: 2500000n,
        RIDER_FEE: 2000000n,
      },
      preview: {
        ESCROW_ADDRESS:
          "addr_test1wpesulg5dtt5y73r4zzay9qmy3wnlrxdg944xg4rzuvewls7nrsf0",
        SCOOPER_FEE: 2500000n,
        RIDER_FEE: 2000000n,
      },
    };

    return params[network];
  }

  static sortSwapAssets(assets: [IPoolDataAsset, IPoolDataAsset]) {
    return assets.sort((a, b) => a.assetId.localeCompare(b.assetId));
  }

  static getAssetSwapDirection(
    { assetID }: IAsset,
    assets: [IPoolDataAsset, IPoolDataAsset]
  ): 0 | 1 {
    const sorted = Utils.sortSwapAssets(assets);
    if (Object.values(sorted[1]).includes(assetID)) {
      return 1;
    }

    return 0;
  }

  static getMinReceivableFromSlippage(
    pool: IPoolData,
    suppliedAsset: IAsset,
    slippage: number
  ): AssetAmount {
    const base =
      Number(suppliedAsset.amount.getAmount()) * (1 - Number(pool.fee));
    let ratio: number;
    let decimals: number;

    if (suppliedAsset.assetID === pool.assetA.assetId) {
      decimals = pool.assetB.decimals;
      ratio = Number(pool.quantityB) / Number(pool.quantityA);
    } else if (suppliedAsset.assetID === pool.assetB.assetId) {
      decimals = pool.assetA.decimals;
      ratio = Number(pool.quantityA) / Number(pool.quantityB);
    } else {
      throw new Error(
        `The supplied asset ID does not match either assets within the supplied pool data. ${JSON.stringify(
          {
            suppliedAssetID: suppliedAsset.assetID,
            poolAssetIDs: [pool.assetA.assetId, pool.assetB.assetId],
          }
        )}`
      );
    }

    const amount = BigInt(Math.floor(base * ratio * (1 - slippage)));
    return new AssetAmount(amount, decimals);
  }
}
