import { AssetAmount } from "@sundaeswap/asset";

import { ITxBuilderReferralFee } from "../../../@types";
import { Config } from "../Config.abstract.class";

const mockAddress =
  "addr_test1qzrf9g3ea6hzgpnlkm4dr48kx6hy073t2j2gssnpm4mgcnqdxw2hcpavmh0vexyzg476ytc9urgcnalujkcewtnd2yzsfd9r32";

class TestClass extends Config {
  referralFee?: ITxBuilderReferralFee | undefined;

  constructor() {
    super();
  }

  setFromObject(): void {}
  buildArgs() {
    this.validate();
    return {};
  }
  validate(): void {
    super.validate();
  }
}

describe("Config", () => {
  it("should set the referral fee correctly", () => {
    const configWithAmount = new TestClass();
    const amountConfig: ITxBuilderReferralFee = {
      destination: mockAddress,

      payment: new AssetAmount(10n, { assetId: "", decimals: 6 }),
    };

    configWithAmount.setReferralFee(amountConfig);
    expect(configWithAmount.referralFee).toMatchObject(amountConfig);

    const configWithPercent = new TestClass();
    const percentConfig: ITxBuilderReferralFee = {
      destination: mockAddress,
      payment: new AssetAmount(10n, { assetId: "", decimals: 6 }),
    };

    configWithPercent.setReferralFee(percentConfig);
    expect(configWithPercent.referralFee).toMatchObject(percentConfig);

    const configWithLabel = new TestClass();
    const labelConfig: ITxBuilderReferralFee = {
      destination: mockAddress,
      payment: new AssetAmount(10n, { assetId: "", decimals: 6 }),
      feeLabel: "Test Fee",
    };

    configWithLabel.setReferralFee(labelConfig);
    expect(configWithLabel.referralFee).toMatchObject(labelConfig);
  });

  it("should validate the referral fee correctly", () => {
    const configWithAmount = new TestClass();
    const amountConfig: ITxBuilderReferralFee = {
      destination: mockAddress,
      // @ts-ignore
      payment: 6,
    };

    configWithAmount.setReferralFee(amountConfig);
    expect(() => configWithAmount.buildArgs()).toThrowError(
      new Error(Config.INVALID_FEE_AMOUNT)
    );
  });
});
