import { Data } from "@blaze-cardano/sdk";
import { AssetAmount, IAssetAmountMetadata } from "@sundaeswap/asset";

import {
  EDatumType,
  EPoolCoin,
  // IDepositArguments,
  ISwapArguments,
  // IWithdrawArguments,
  // IZapArguments,
  TDatumResult,
  TOrderAddressesArgs,
  TSupportedNetworks,
  TSwap,
} from "../@types/index.js";
import { DatumBuilder } from "../Abstracts/DatumBuilder.abstract.class.js";
import { BlazeHelper } from "../Utilities/BlazeHelper.class.js";
import { V1_MAX_POOL_IDENT_LENGTH } from "../constants.js";
import {
  OrderAddresses,
  SwapDirection,
  SwapOrder,
  TDestination,
  TOrderAddresses,
  TSwapDirection,
  TSwapOrder,
} from "./contracts/contracts.v1.js";

/**
 * The Blaze implementation for building valid Datums for
 * V1 contracts on the SundaeSwap protocol.
 */
export class DatumBuilderBlazeV1 implements DatumBuilder {
  /** The current network id. */
  public network: TSupportedNetworks;
  /** The error to throw when the pool ident does not match V1 constraints. */
  static INVALID_POOL_IDENT =
    "You supplied a pool ident of an invalid length! The will prevent the scooper from processing this order.";

  constructor(network: TSupportedNetworks) {
    this.network = network;
  }

  /**
   * Constructs a swap datum object based on the provided swap arguments.
   * The function initializes a new datum with specific properties such as the pool ident,
   * order addresses, scooper fee, and swap direction schema. It then converts this datum
   * into an inline format and computes its hash using {@link Lucid.BlazeHelper}. The function returns an
   * object containing the hash of the inline datum, the inline datum itself, and the original
   * datum schema.
   *
   * @param {ISwapArguments} params - The swap arguments required to build the swap datum.
   * @returns {TDatumResult<Data>} An object containing the hash of the inline datum, the inline datum itself,
   *                               and the schema of the original datum.
   */
  buildSwapDatum({
    ident,
    orderAddresses,
    fundedAsset,
    swap,
    scooperFee,
  }: ISwapArguments): TDatumResult<TSwapOrder> {
    const datum: TSwapOrder = {
      ident: this.buildPoolIdent(ident),
      orderAddresses: this.buildOrderAddresses(orderAddresses).schema,
      scooperFee: scooperFee,
      swapDirection: this.buildSwapDirection(swap, fundedAsset).schema,
    };
    // const datum = new Constr(0, [
    //   this.buildPoolIdent(ident),
    //   this.buildOrderAddresses(orderAddresses).schema,
    //   scooperFee,
    //   this.buildSwapDirection(swap, fundedAsset).schema,
    // ]);

    const data = Data.to(datum, SwapOrder);

    return {
      hash: data.hash(),
      inline: data.toCbor(),
      schema: datum,
    };
  }

  /**
   * Creates a deposit datum object from the given deposit arguments. The function initializes
   * a new datum with specific properties such as the pool ident, order addresses, scooper fee,
   * and deposit pair schema. It then converts this datum into an inline format and calculates
   * its hash using {@link Lucid.BlazeHelper}. The function returns an object containing the hash of the inline
   * datum, the inline datum itself, and the original datum schema.
   *
   * @param {IDepositArguments} params - The deposit arguments required to construct the deposit datum.
   * @returns {TDatumResult<Data>} An object containing the hash of the inline datum, the inline datum itself,
   *                               and the schema of the original datum.
   */
  // buildDepositDatum({
  //   ident,
  //   orderAddresses,
  //   deposit,
  //   scooperFee,
  // }: IDepositArguments): TDatumResult<Data> {
  //   const datum = new Constr(0, [
  //     this.buildPoolIdent(ident),
  //     this.buildOrderAddresses(orderAddresses).schema,
  //     scooperFee,
  //     this.buildDepositPair(deposit).schema,
  //   ]);

  //   const inline = Data.to(datum);

  //   return {
  //     hash: BlazeHelper.inlineDatumToHash(inline),
  //     inline,
  //     schema: datum,
  //   };
  // }

  /**
   * Constructs a zap datum object from provided zap arguments. This function creates a new datum with
   * specific attributes such as the pool ident, order addresses, scooper fee, and deposit zap schema.
   * The datum is then converted to an inline format, and its hash is computed using {@link Lucid.BlazeHelper}. The function
   * returns an object that includes the hash of the inline datum, the inline datum itself, and the original
   * datum schema, facilitating the integration of the zap operation within a larger transaction framework.
   *
   * @param {IZapArguments} params - The arguments necessary for constructing the zap datum.
   * @returns {TDatumResult<Data>} An object containing the hash of the inline datum, the inline datum itself,
   *                               and the schema of the original datum, which are essential for the zap transaction's execution.
   */
  // experimental_buildZapDatum({
  //   ident,
  //   orderAddresses,
  //   zap,
  //   scooperFee,
  // }: IZapArguments): TDatumResult<Data> {
  //   const datum = new Constr(0, [
  //     this.buildPoolIdent(ident),
  //     this.buildOrderAddresses(orderAddresses).schema,
  //     scooperFee,
  //     this.experimental_buildDepositZap(zap).schema,
  //   ]);

  //   const inline = Data.to(datum);

  //   return {
  //     hash: BlazeHelper.inlineDatumToHash(inline),
  //     inline,
  //     schema: datum,
  //   };
  // }

  /**
   * Generates a withdraw datum object from the specified withdraw arguments. This function constructs
   * a new datum with defined attributes such as the pool ident, order addresses, scooper fee, and
   * the schema for the supplied LP (Liquidity Provider) asset for withdrawal. After constructing the datum,
   * it is converted into an inline format, and its hash is calculated using {@link Lucid.BlazeHelper}. The function returns
   * an object containing the hash of the inline datum, the inline datum itself, and the schema of the original
   * datum, which are crucial for executing the withdrawal operation within a transactional framework.
   *
   * @param {IWithdrawArguments} params - The arguments necessary to construct the withdraw datum.
   * @returns {TDatumResult<Data>} An object comprising the hash of the inline datum, the inline datum itself,
   *                               and the schema of the original datum, facilitating the withdrawal operation's integration into the transactional process.
   */
  // buildWithdrawDatum({
  //   ident,
  //   orderAddresses,
  //   suppliedLPAsset,
  //   scooperFee,
  // }: IWithdrawArguments): TDatumResult<Data> {
  //   const datum = new Constr(0, [
  //     this.buildPoolIdent(ident),
  //     this.buildOrderAddresses(orderAddresses).schema,
  //     scooperFee,
  //     this.buildWithdrawAsset(suppliedLPAsset).schema,
  //   ]);

  //   const inline = Data.to(datum);

  //   return {
  //     hash: BlazeHelper.inlineDatumToHash(inline),
  //     inline,
  //     schema: datum,
  //   };
  // }

  // buildDepositPair(deposit: TDepositMixed): TDatumResult<Data> {
  //   const datum = new Constr(2, [
  //     new Constr(1, [
  //       new Constr(0, [deposit.CoinAAmount.amount, deposit.CoinBAmount.amount]),
  //     ]),
  //   ]);

  //   const inline = Data.to(datum);

  //   return {
  //     hash: BlazeHelper.inlineDatumToHash(inline),
  //     inline,
  //     schema: datum,
  //   };
  // }

  // experimental_buildDepositZap(zap: TDepositSingle): TDatumResult<Data> {
  //   const datum = new Constr(2, [
  //     new Constr(zap.ZapDirection, [zap.CoinAmount.amount]),
  //   ]);

  //   const inline = Data.to(datum);

  //   return {
  //     hash: BlazeHelper.inlineDatumToHash(inline),
  //     inline,
  //     schema: datum,
  //   };
  // }

  // buildWithdrawAsset(
  //   fundedLPAsset: AssetAmount<IAssetAmountMetadata>
  // ): TDatumResult<Data> {
  //   const datum = new Constr(1, [fundedLPAsset.amount]);

  //   const inline = Data.to(datum);

  //   return {
  //     hash: BlazeHelper.inlineDatumToHash(inline),
  //     inline,
  //     schema: datum,
  //   };
  // }

  buildSwapDirection(
    swap: TSwap,
    amount: AssetAmount<IAssetAmountMetadata>
  ): TDatumResult<TSwapDirection> {
    const datum: TSwapDirection = {
      amount: amount.amount,
      minReceivable: swap.MinimumReceivable
        ? swap.MinimumReceivable.amount
        : null,
      suppliedAssetIndex: swap.SuppliedCoin === EPoolCoin.A ? "A" : "B",
    };

    const data = Data.to(datum, SwapDirection);

    return {
      hash: data.hash(),
      inline: data.toCbor(),
      schema: datum,
    };
  }

  buildOrderAddresses(
    addresses: TOrderAddressesArgs
  ): TDatumResult<TOrderAddresses> {
    BlazeHelper.validateAddressAndDatumAreValid({
      ...addresses.DestinationAddress,
      network: this.network,
    });

    addresses?.AlternateAddress &&
      BlazeHelper.validateAddressAndDatumAreValid({
        address: addresses.AlternateAddress,
        network: this.network,
        datum: {
          type: EDatumType.NONE,
        },
      });

    const { DestinationAddress, AlternateAddress } = addresses;
    const destinationHashes = BlazeHelper.getAddressHashes(
      DestinationAddress.address
    );

    if (DestinationAddress.datum.type === EDatumType.INLINE) {
      throw new Error(
        "Inline datum types are not supported in V1 contracts! Convert this to a hash."
      );
    }

    const destinationAddressCredentialType = BlazeHelper.isScriptAddress(
      DestinationAddress.address
    )
      ? ("ScriptHash" as keyof TDestination["credentials"]["paymentKey"])
      : "KeyHash";

    const destination: TDestination = {
      credentials: {
        paymentKey: {
          [destinationAddressCredentialType]: {
            value: destinationHashes.paymentCredentials,
          },
        },
        stakingKey: destinationHashes.stakeCredentials
          ? {
              value: {
                [destinationAddressCredentialType]: {
                  value: destinationHashes.stakeCredentials,
                },
              },
            }
          : null,
      },
      datum:
        DestinationAddress.datum.type !== EDatumType.NONE
          ? DestinationAddress.datum.value
          : null,
    };

    const alternateHashes =
      AlternateAddress && BlazeHelper.getAddressHashes(AlternateAddress);
    const alternateAddressCredentialType =
      AlternateAddress && BlazeHelper.isScriptAddress(AlternateAddress)
        ? ("ScriptHash" as keyof TDestination["credentials"]["paymentKey"])
        : "KeyHash";

    const datum: TOrderAddresses = {
      destination,
      alternate: alternateHashes
        ? {
            paymentKey: {
              [alternateAddressCredentialType]: {
                value:
                  alternateHashes.stakeCredentials ??
                  alternateHashes.paymentCredentials,
              },
            },
            stakingKey: null,
          }
        : null,
    };

    const data = Data.to<TOrderAddresses>(datum, OrderAddresses);

    return {
      hash: data.hash(),
      inline: data.toCbor(),
      schema: datum,
    };
  }

  buildPoolIdent(ident: string): string {
    if (ident.length > V1_MAX_POOL_IDENT_LENGTH) {
      throw new Error(DatumBuilderBlazeV1.INVALID_POOL_IDENT);
    }

    return ident;
  }
}
