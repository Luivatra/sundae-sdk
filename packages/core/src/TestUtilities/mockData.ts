import { AssetAmount, IAssetAmountMetadata } from "@sundaeswap/asset";

import { EDatumType, TOrderAddressesArgs } from "../@types/datumbuilder.js";
import { IPoolData } from "../@types/queryprovider.js";
import { EContractVersion } from "../@types/txbuilders.js";
import { SundaeUtils } from "../Utilities/SundaeUtils.class.js";
import { ADA_METADATA } from "../constants.js";

export interface ILocalUtxo {
  txHash: string;
  outputIndex: number;
  assets: Record<string, bigint>;
  address: string;
  datumHash?: string | null;
  datum?: string | null;
  scriptRef?: { type: string; script: string } | null;
}

interface INetworkData {
  pools: {
    v1: IPoolData;
    v3: IPoolData;
  };
  addresses: {
    current: string;
    alternatives: string[];
  };
  assets: {
    tada: AssetAmount<IAssetAmountMetadata>;
    tindy: AssetAmount<IAssetAmountMetadata>;
    usdc: AssetAmount<IAssetAmountMetadata>;
    v1LpToken: AssetAmount<IAssetAmountMetadata>;
    v3LpToken: AssetAmount<IAssetAmountMetadata>;
  };
  orderAddresses: TOrderAddressesArgs;
  wallet: {
    assets: Record<string, bigint>;
    utxos: ILocalUtxo[];
    referenceUtxos: {
      previewYieldFarming: ILocalUtxo;
    };
    submittedOrderUtxos: {
      swapV1: ILocalUtxo;
      swapV3: ILocalUtxo;
    };
  };
}

const PREVIEW_DATA: INetworkData = {
  addresses: {
    current:
      "addr_test1qrp8nglm8d8x9w783c5g0qa4spzaft5z5xyx0kp495p8wksjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngqtjfk6s",
    alternatives: [
      "addr_test1qp6crwxyfwah6hy7v9yu5w6z2w4zcu53qxakk8ynld8fgcpxjae5d7xztgf0vyq7pgrrsk466xxk25cdggpq82zkpdcsdkpc68",
      "addr_test1qzrf9g3ea6hzgpnlkm4dr48kx6hy073t2j2gssnpm4mgcnqdxw2hcpavmh0vexyzg476ytc9urgcnalujkcewtnd2yzsfd9r32",
      "addr_test1qrlnzzc89s5p5nhsustx5q8emft3cjvce4tmhytkfhaae7qdxw2hcpavmh0vexyzg476ytc9urgcnalujkcewtnd2yzs2pf294",
    ],
  },
  pools: {
    v1: {
      ident: "06",
      currentFee: 0.01,
      assetA: ADA_METADATA,
      assetB: {
        assetId:
          "fa3eff2047fdf9293c5feef4dc85ce58097ea1c6da4845a351535183.74494e4459",
        decimals: 0,
      },
      assetLP: {
        assetId:
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c9.6c702006",
        decimals: 0,
      },
      liquidity: {
        aReserve: 500000000n,
        bReserve: 250000000n,
        lpTotal: 353553390n,
      },
      version: EContractVersion.V1,
    },
    v3: {
      assetA: ADA_METADATA,
      assetB: {
        assetId:
          "fa3eff2047fdf9293c5feef4dc85ce58097ea1c6da4845a351535183.74494e4459",
        decimals: 0,
      },
      assetLP: {
        assetId:
          "633a136877ed6ad0ab33e69a22611319673474c8bd0a79a4c76d9289.0014df10a933477ea168013e2b5af4a9e029e36d26738eb6dfe382e1f3eab3e2",
        decimals: 0,
      },
      currentFee: 0.05,
      liquidity: {
        aReserve: 1018800000n,
        bReserve: 992067448n,
        lpTotal: 1005344874n,
      },
      ident: "a933477ea168013e2b5af4a9e029e36d26738eb6dfe382e1f3eab3e2",
      version: EContractVersion.V3,
    },
  },
  assets: {
    tada: new AssetAmount(20_000_000n, {
      assetId: "ada.lovelace",
      decimals: 6,
    }),
    tindy: new AssetAmount(20_000_000n, {
      assetId:
        "fa3eff2047fdf9293c5feef4dc85ce58097ea1c6da4845a351535183.74494e4459",
      decimals: 0,
    }),
    usdc: new AssetAmount(20_000_000n, {
      assetId:
        "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15.55534443",
      decimals: 6,
    }),
    v1LpToken: new AssetAmount(100_000_000n, {
      assetId:
        "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c9.6c702006",
      decimals: 0,
    }),
    v3LpToken: new AssetAmount(100_000_000n, {
      assetId:
        "633a136877ed6ad0ab33e69a22611319673474c8bd0a79a4c76d9289.0014df10a933477ea168013e2b5af4a9e029e36d26738eb6dfe382e1f3eab3e2",
      decimals: 0,
    }),
  },
  orderAddresses: {
    DestinationAddress: {
      address:
        "addr_test1qrlnzzc89s5p5nhsustx5q8emft3cjvce4tmhytkfhaae7qdxw2hcpavmh0vexyzg476ytc9urgcnalujkcewtnd2yzs2pf294",
      datum: {
        type: EDatumType.NONE,
      },
    },
    AlternateAddress:
      "addr_test1qqpxt8wyqmsa28pxjk7z893txpy8608tn9d7kyaknpgfcmcjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngqllv3yr",
  },
  wallet: {
    assets: {
      lovelace: 4654654072950n,
      "2fe3c3364b443194b10954771c95819b8d6ed464033c21f03f8facb569425443": 102n,
      "2fe3c3364b443194b10954771c95819b8d6ed464033c21f03f8facb569555344":
        19004109273n,
      "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702001":
        268969553n,
      "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702003":
        372501888n,
      "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c70200d":
        607106n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1543484f43":
        25607393n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1555534443":
        120000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15524245525259":
        951377261129n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15534245525259":
        98383775401921n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15544553545f4e4654":
        1n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657431":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657432":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657433":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657434":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657435":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657436":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657437":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657438":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657439":
        10000000n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e155465737441737365743130":
        9995049n,
      "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1553616c7361536f6c617269732330313431":
        1n,
      ba0062b8f68bb8f80d4509e53d97a554381030b5e84832115376cb0a544553545f4e4654:
        1n,
      caaaa4dd8b3b5c9dae65573cdb0bc2e989c43c3963d06b93d37687f1537461626c6520446966667573696f6e:
        2570890n,
      cadd6bf1f7535eed785b01169b03fc800360b396ab5617b560fccd4e544553545f4e4654:
        1n,
      cadd6bf1f7535eed785b01169b03fc800360b396ab5617b560fccd4e4e45574d5f566f74655f50726576696577:
        49999000020002n,
      cadd6bf1f7535eed785b01169b03fc800360b396ab5617b560fccd4e53616c7361536f6c61726973446973636f696e:
        38000n,
      cadd6bf1f7535eed785b01169b03fc800360b396ab5617b560fccd4e4e45574d5f50726f706f73616c5f50726576696577:
        2n,
      d35c752af635d9e9cb79aea44537a57a5ecd91e23133cd7f210f00706d544f5349: 34n,
      d441227553a0f1a965fee7d60a0f724b368dd1bddbc208730fccebcf524245525259:
        20752788n,
      fa3eff2047fdf9293c5feef4dc85ce58097ea1c6da4845a35153518374494e4459:
        352874949n,
    },
    utxos: [
      {
        txHash:
          "500213dcb7119f3299583bc567223cc1b1b22413e39feb129b9f87445175fb75",
        outputIndex: 1,
        assets: {
          lovelace: 4072950n,
          "2fe3c3364b443194b10954771c95819b8d6ed464033c21f03f8facb569425443":
            102n,
          "2fe3c3364b443194b10954771c95819b8d6ed464033c21f03f8facb569555344":
            19004109273n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702000":
            1200000004n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702001":
            268969553n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702003":
            372501888n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c70200d":
            607106n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1543484f43":
            25607393n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1555534443":
            120000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15524245525259":
            951377261129n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15534245525259":
            98383775401921n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15544553545f4e4654":
            1n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657431":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657432":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657433":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657434":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657435":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657436":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657437":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657438":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1554657374417373657439":
            10000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e155465737441737365743130":
            9995049n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e1553616c7361536f6c617269732330313431":
            1n,
          ba0062b8f68bb8f80d4509e53d97a554381030b5e84832115376cb0a544553545f4e4654:
            1n,
          caaaa4dd8b3b5c9dae65573cdb0bc2e989c43c3963d06b93d37687f1537461626c6520446966667573696f6e:
            2570890n,
          cadd6bf1f7535eed785b01169b03fc800360b396ab5617b560fccd4e544553545f4e4654:
            1n,
          cadd6bf1f7535eed785b01169b03fc800360b396ab5617b560fccd4e4e45574d5f566f74655f50726576696577:
            49999000020002n,
          cadd6bf1f7535eed785b01169b03fc800360b396ab5617b560fccd4e53616c7361536f6c61726973446973636f696e:
            38000n,
          cadd6bf1f7535eed785b01169b03fc800360b396ab5617b560fccd4e4e45574d5f50726f706f73616c5f50726576696577:
            2n,
          d35c752af635d9e9cb79aea44537a57a5ecd91e23133cd7f210f00706d544f5349:
            34n,
          d441227553a0f1a965fee7d60a0f724b368dd1bddbc208730fccebcf524245525259:
            20752788n,
          fa3eff2047fdf9293c5feef4dc85ce58097ea1c6da4845a35153518374494e4459:
            352874949n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702006":
            100_000_000n,
          "633a136877ed6ad0ab33e69a22611319673474c8bd0a79a4c76d92890014df10a933477ea168013e2b5af4a9e029e36d26738eb6dfe382e1f3eab3e2":
            100_000_000n,
        },
        address:
          "addr_test1qrp8nglm8d8x9w783c5g0qa4spzaft5z5xyx0kp495p8wksjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngqtjfk6s",
      },
      {
        txHash:
          "007aebf3382630f6ffb2e9490ee908a96dcddf2c84886e0ad386a0434fe071e8",
        outputIndex: 2,
        assets: {
          lovelace: 2000000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15534245525259":
            264989687n,
        },
        address:
          "addr_test1qrp8nglm8d8x9w783c5g0qa4spzaft5z5xyx0kp495p8wksjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngqtjfk6s",
      },
      {
        txHash:
          "007aebf3382630f6ffb2e9490ee908a96dcddf2c84886e0ad386a0434fe071e8",
        outputIndex: 3,
        assets: {
          lovelace: 2000000n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702006":
            200_000_000n,
        },
        address:
          "addr_test1qrp8nglm8d8x9w783c5g0qa4spzaft5z5xyx0kp495p8wksjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngqtjfk6s",
      },
      {
        txHash:
          "1d7dbd6f3f07088bb5b55bb31daaf7b93c92e97da7942c8629e79d4cbf81e291",
        outputIndex: 1,
        assets: {
          lovelace: 1155080n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702001":
            249850000n,
        },
        address:
          "addr_test1qrp8nglm8d8x9w783c5g0qa4spzaft5z5xyx0kp495p8wksjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngqtjfk6s",
      },
      {
        txHash:
          "fda5c685eaff5fbb2a7ecb250389fd24a7216128929a9da0ad95b72b586fab70",
        outputIndex: 0,
        assets: {
          lovelace: 1400750n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c702001":
            150000n,
          "4086577ed57c514f8e29b78f42ef4f379363355a3b65b9a032ee30c96c70200d":
            100000n,
          "99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15524245525259":
            50000000000n,
        },
        address:
          "addr_test1qrp8nglm8d8x9w783c5g0qa4spzaft5z5xyx0kp495p8wksjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngqtjfk6s",
      },
      {
        txHash:
          "fda5c685eaff5fbb2a7ecb250389fd24a7216128929a9da0ad95b72b586fab70",
        outputIndex: 1,
        assets: { lovelace: 16_084_562_225n },
        address:
          "addr_test1qrp8nglm8d8x9w783c5g0qa4spzaft5z5xyx0kp495p8wksjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngqtjfk6s",
      },
    ],
    referenceUtxos: {
      previewYieldFarming: {
        address:
          "addr_test1qzj89zakqu939ljqrpsu5r0eq8eysxsncs0jyylrcjxvn2eam2na4f9wm8yxqa9andqfvu80uykztpnkfj9ey6vxf95qz4nnaf",
        assets: { lovelace: 20_000_000n },
        outputIndex: 0,
        txHash:
          "aaaf193b8418253f4169ab869b77dedd4ee3df4f2837c226cee3c2f7fa955189",
        scriptRef: {
          script:
            "5905df0100003232323232323232323232222325333009333323232323232323232300100122223253330163370e900000089919198070028009bae301c0013014004153330163370e90010008991919806000919998040040008030029bac301c0013014004153330163370e90020008991919804000919998040040008030029bac301c0013014004153330163370e900300089919191919b8900333300c00148000894ccc070cccc02c02c0080240204cdc0000a400420026eb0c078004c078008dd6980e000980a0020a99980b19b87480200044c8c8c8c94ccc068cdc3a400400226464a66603866e1d2002301e3754660306034660306034010900124004266e240040144cdc40008029bad3020001301800214a0603000266028602c66028602c0089001240006eb4c070004c0500104c8c8c8c94ccc068cdc3a400400226464a66603866e1d2002301e3754660306034660306034010900024004266e240140044cdc40028009bad3020001301800214a0603000266028602c66028602c0089000240006eb4c070004c050010c05000cc0040048894ccc05800852809919299980a18018010a51133300500500100330190033017002300100122225333015003100213232333300600600133003002004003301800430160033001001222533301200214a226464a6660206006004266600a00a0020062940c05400cc04c008c0040048894ccc04000852809919299980719b8f00200314a2266600a00a00200660260066eb8c044008cc014c01c005200037586600a600e6600a600e0049000240206600a600e6600a600e00490002401c2930b19002199191919119299980719b87480000044c8c8c8c94ccc058c0600084c926300700315330134901334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e2065787065637465640016301600130160023014001300c002153300f4912b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300c00130010012232533300d3370e9000000899192999809980a8010a4c2a66020921334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e2065787065637465640016375c602600260160042a66601a66e1d20020011323253330133015002132498cc0180048c9263300600600115330104901334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602600260160042a66601a66e1d20040011323253330133015002132498cc0180048c9263300600600115330104901334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602600260160042a66601a66e1d200600113232323253330153017002132498cc0200048c9263300800800115330124901334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e20657870656374656400163758602a002602a0046eb4c04c004c02c00854ccc034cdc3a401000226464a666026602a0042930a99808249334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e2065787065637465640016375a602600260160042a66601a66e1d200a0011323253330133015002149854cc0412401334c6973742f5475706c652f436f6e73747220636f6e7461696e73206d6f7265206974656d73207468616e2065787065637465640016375a602600260160042a6601c9212b436f6e73747220696e64657820646964206e6f74206d6174636820616e7920747970652076617269616e740016300b0013001001222533300f00214984c8ccc010010c04800c008c004c04000800ccc0040052000222233330073370e0020060184666600a00a66e000112002300e001002002230063754002460086ea80055cd2b9c5573aaae7955cfaba157441",
          type: "PlutusV2",
        },
      },
    },
    submittedOrderUtxos: {
      swapV1: {
        txHash:
          "0264732a4c82c3f90af79f32b70cf0d108500be9160b3ae036ff21d3cf180798",
        outputIndex: 0,
        address:
          "addr_test1wpesulg5dtt5y73r4zzay9qmy3wnlrxdg944xg4rzuvewls7nrsf0",
        assets: {
          lovelace: 14_500_000n,
        },
        datum:
          "d8799f4103d8799fd8799fd8799fd8799f581cc279a3fb3b4e62bbc78e288783b58045d4ae82a18867d8352d02775affd8799fd8799fd8799f581c121fd22e0b57ac206fefc763f8bfa0771919f5218b40691eea4514d0ffffffffd87a80ffd87a80ff1a002625a0d8799fd879801a00989680d8799f1a00989680ffffff",
        datumHash:
          "48e3160a9a3761f40d71fef4fc45e5381f35f28f7af73c11756ffaeeae6e32c8",
      },
      swapV3: {
        txHash:
          "252c1df48b6e92272320a1ca9ddc6d7e56c46ed7504ae3a4b069375ac3767577",
        outputIndex: 0,
        address:
          "addr_test1zr866xg5kkvarzll69xjh0tfvqvu9zvuhht2qve9ehmgp0qjrlfzuz6h4ssxlm78v0utlgrhryvl2gvtgp53a6j9zngq4qar8t",
        assets: {
          lovelace: 12_500_000n,
        },
        datum:
          "d8799fd8799f581c2baab4c73a1cd60176f903a29a9c92ed4237c88622da51e9179121a3ffd8799f581c121fd22e0b57ac206fefc763f8bfa0771919f5218b40691eea4514d0ff1a0007a120d8799fd8799fd8799f581cc279a3fb3b4e62bbc78e288783b58045d4ae82a18867d8352d02775affd8799fd8799fd8799f581c121fd22e0b57ac206fefc763f8bfa0771919f5218b40691eea4514d0ffffffffd87980ffd87a9f9f40401a00989680ff9f581c99b071ce8580d6a3a11b4902145adb8bfd0d2a03935af8cf66403e15465342455252591a0091baa9ffff43d87980ff",
        datumHash:
          "f78ce6442c94d138119a1347ff747d976f40ca78bb2b8f8962ad6072008586ec",
      },
    },
  },
};

export { PREVIEW_DATA };

SundaeUtils.getCurrentFeeFromDecayingFee({
  endFee: [5n, 100n],
  endSlot: "1712941979",
  network: "preview",
  startFee: [5n, 1000n],
  startSlot: "1702941926",
});
