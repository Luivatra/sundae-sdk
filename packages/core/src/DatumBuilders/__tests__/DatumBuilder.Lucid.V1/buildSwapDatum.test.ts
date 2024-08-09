import { jest } from "@jest/globals";
import { AssetAmount } from "@sundaeswap/asset";

import { EDatumType, EPoolCoin } from "../../../@types/datumbuilder.js";
import { ADA_METADATA } from "../../../constants.js";
import { PREVIEW_DATA } from "../../../exports/testing.js";
import { DatumBuilderLucidV1 } from "../../DatumBuilder.Lucid.V1.class.js";

let builderInstance: DatumBuilderLucidV1;

beforeEach(() => {
  builderInstance = new DatumBuilderLucidV1("preview");
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("buildSwapDatum()", () => {
  it("should correctly build the datum, variation 1", () => {
    const result = builderInstance.buildSwapDatum({
      orderAddresses: {
        DestinationAddress: {
          address: PREVIEW_DATA.addresses.current,
          datum: {
            type: EDatumType.NONE,
          },
        },
      },
      ident: PREVIEW_DATA.pools.v1.ident,
      fundedAsset: new AssetAmount(
        10_000_000n,
        PREVIEW_DATA.assets.tada.metadata
      ),
      swap: {
        SuppliedCoin: EPoolCoin.A,
        MinimumReceivable: new AssetAmount(100n, {
          ...ADA_METADATA,
          assetId: PREVIEW_DATA.assets.tindy.metadata.assetId,
        }),
      },
      scooperFee: 1_000_000n,
    });

    expect(result.inline).toEqual(
      "d8799f4106d8799fd8799fd8799fd8799f581cc279a3fb3b4e62bbc78e288783b58045d4ae82a18867d8352d02775affd8799fd8799fd8799f581c121fd22e0b57ac206fefc763f8bfa0771919f5218b40691eea4514d0ffffffffd87a80ffd87a80ff1a000f4240d8799fd879801a00989680d8799f1864ffffff"
    );
    expect(result.hash).toEqual(
      "a05ea9ede761983134b23116cc28ab676dbd417077f0b2e1ce47ff01a9d32933"
    );
  });

  it("should correctly build the datum, variation 2", () => {
    const result = builderInstance.buildSwapDatum({
      orderAddresses: {
        DestinationAddress: {
          address: PREVIEW_DATA.addresses.current,
          datum: {
            type: EDatumType.HASH,
            value:
              "801781d78d0a71944986666b6edd375c7ac039002a0ecbf55258c69bd6dcd7da",
          },
        },
      },
      ident: PREVIEW_DATA.pools.v1.ident,
      fundedAsset: new AssetAmount(100n, PREVIEW_DATA.assets.tindy.metadata),
      swap: {
        SuppliedCoin: EPoolCoin.B,
        MinimumReceivable: new AssetAmount(
          10_000_000n,
          PREVIEW_DATA.assets.tada.metadata
        ),
      },
      scooperFee: 1_000_000n,
    });

    expect(result.inline).toEqual(
      "d8799f4106d8799fd8799fd8799fd8799f581cc279a3fb3b4e62bbc78e288783b58045d4ae82a18867d8352d02775affd8799fd8799fd8799f581c121fd22e0b57ac206fefc763f8bfa0771919f5218b40691eea4514d0ffffffffd8799f5820801781d78d0a71944986666b6edd375c7ac039002a0ecbf55258c69bd6dcd7daffffd87a80ff1a000f4240d8799fd87a801864d8799f1a00989680ffffff"
    );
    expect(result.hash).toEqual(
      "ffd5dd8d7952afc1f6e890b7a5d648d3d74df05abc1997da1acaf94dc01f8a73"
    );
  });
});
