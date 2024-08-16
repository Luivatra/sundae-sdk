import { AssetAmount, IAssetAmountMetadata } from "@sundaeswap/asset";
import { Data } from "lucid-cardano";

import {
  EDatumType,
  EPoolCoin,
  IDepositArguments,
  ISwapArguments,
  IWithdrawArguments,
  TDatumResult,
  TOrderAddressesArgs,
  TSupportedNetworks,
  TSwap,
} from "../@types/index.js";
import { DatumBuilder } from "../Abstracts/DatumBuilder.abstract.class.js";
import { LucidHelper } from "../Utilities/LucidHelper.class.js";
import { V1_MAX_POOL_IDENT_LENGTH } from "../constants.js";
import {
  DepositOrder,
  OrderAddresses,
  SwapDirection,
  SwapOrder,
  TDepositOrder,
  TDestination,
  TOrderAddresses,
  TSwapDirection,
  TSwapOrder,
  TWithdrawOrder,
  WithdrawOrder,
} from "./Contracts/Contracts.Lucid.v1.js";

/**
 * The Lucid implementation for building valid Datums for
 * V1 contracts on the SundaeSwap protocol.
 */
export class DatumBuilderLucidV1 implements DatumBuilder {
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
   * into an inline format and computes its hash using {@link Lucid.LucidHelper}. The function returns an
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
      scooperFee,
      swapDirection: this.buildSwapDirection(swap, fundedAsset).schema,
    };

    const inline = Data.to(datum, SwapOrder);

    return {
      hash: LucidHelper.inlineDatumToHash(inline),
      inline,
      schema: datum,
    };
  }

  /**
   * Creates a deposit datum object from the given deposit arguments. The function initializes
   * a new datum with specific properties such as the pool ident, order addresses, scooper fee,
   * and deposit pair schema. It then converts this datum into an inline format and calculates
   * its hash using {@link Lucid.LucidHelper}. The function returns an object containing the hash of the inline
   * datum, the inline datum itself, and the original datum schema.
   *
   * @param {IDepositArguments} params - The deposit arguments required to construct the deposit datum.
   * @returns {TDatumResult<Data>} An object containing the hash of the inline datum, the inline datum itself,
   *                               and the schema of the original datum.
   */
  buildDepositDatum({
    ident,
    orderAddresses,
    deposit,
    scooperFee,
  }: IDepositArguments): TDatumResult<TDepositOrder> {
    const datum: TDepositOrder = {
      ident: this.buildPoolIdent(ident),
      orderAddresses: this.buildOrderAddresses(orderAddresses).schema,
      scooperFee,
      DepositPair: {
        Parent: {
          Child: {
            Value: {
              pair: {
                a: deposit.CoinAAmount.amount,
                b: deposit.CoinBAmount.amount,
              },
            },
          },
        },
      },
    };

    const inline = Data.to(datum, DepositOrder);

    return {
      hash: LucidHelper.inlineDatumToHash(inline),
      inline,
      schema: datum,
    };
  }

  /**
   * Generates a withdraw datum object from the specified withdraw arguments. This function constructs
   * a new datum with defined attributes such as the pool ident, order addresses, scooper fee, and
   * the schema for the supplied LP (Liquidity Provider) asset for withdrawal. After constructing the datum,
   * it is converted into an inline format, and its hash is calculated using {@link Lucid.LucidHelper}. The function returns
   * an object containing the hash of the inline datum, the inline datum itself, and the schema of the original
   * datum, which are crucial for executing the withdrawal operation within a transactional framework.
   *
   * @param {IWithdrawArguments} params - The arguments necessary to construct the withdraw datum.
   * @returns {TDatumResult<Data>} An object comprising the hash of the inline datum, the inline datum itself,
   *                               and the schema of the original datum, facilitating the withdrawal operation's integration into the transactional process.
   */
  buildWithdrawDatum({
    ident,
    orderAddresses,
    suppliedLPAsset,
    scooperFee,
  }: IWithdrawArguments): TDatumResult<TWithdrawOrder> {
    const datum: TWithdrawOrder = {
      ident: this.buildPoolIdent(ident),
      orderAddresses: this.buildOrderAddresses(orderAddresses).schema,
      scooperFee,
      WithdrawAsset: {
        LPToken: {
          value: suppliedLPAsset.amount,
        },
      },
    };

    const inline = Data.to(datum, WithdrawOrder);

    return {
      hash: LucidHelper.inlineDatumToHash(inline),
      inline,
      schema: datum,
    };
  }

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

    const inline = Data.to(datum, SwapDirection);

    return {
      hash: LucidHelper.inlineDatumToHash(inline),
      inline,
      schema: datum,
    };
  }

  buildOrderAddresses(
    addresses: TOrderAddressesArgs
  ): TDatumResult<TOrderAddresses> {
    LucidHelper.validateAddressAndDatumAreValid({
      ...addresses.DestinationAddress,
      network: this.network,
    });

    addresses?.AlternateAddress &&
      LucidHelper.validateAddressAndDatumAreValid({
        address: addresses.AlternateAddress,
        network: this.network,
        datum: {
          type: EDatumType.NONE,
        },
      });

    const { DestinationAddress, AlternateAddress } = addresses;
    const destinationHashes = LucidHelper.getAddressHashes(
      DestinationAddress.address
    );

    if (DestinationAddress.datum.type === EDatumType.INLINE) {
      throw new Error(
        "Inline datum types are not supported in V1 contracts! Convert this to a hash."
      );
    }

    const destinationAddressCredentialType = LucidHelper.isScriptAddress(
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
      AlternateAddress && LucidHelper.getAddressHashes(AlternateAddress);

    const datum: TOrderAddresses = {
      destination,
      alternate: alternateHashes
        ? alternateHashes.stakeCredentials ?? alternateHashes.paymentCredentials
        : null,
    };

    const inline = Data.to(datum, OrderAddresses);

    return {
      hash: LucidHelper.inlineDatumToHash(inline),
      inline,
      schema: datum,
    };
  }

  buildPoolIdent(ident: string): string {
    if (ident.length > V1_MAX_POOL_IDENT_LENGTH) {
      throw new Error(DatumBuilderLucidV1.INVALID_POOL_IDENT);
    }

    return ident;
  }
}
