import { Address } from "viem";
import addresses from "config/contracts";
import { DEFAULT_CHAIN } from "config/chains";

export const getAddress = (addressMap, chainId?: number): `0x${string}` => {
  return addressMap[chainId]
    ? addressMap[chainId]
    : addressMap[DEFAULT_CHAIN.id];
};

export const getTokenFactoryAddress = (chainId?: number) => {
  return getAddress(addresses.token_factory, chainId);
};

export const getTokenFactoryAddressMap = (): { [chainId: number]: Address } => {
  // @ts-ignore
  return addresses.token_factory;
};

export const getMulticallAddress = (chainId?: number) => {
  return getAddress(addresses.multiCall, chainId);
};

export const getMigrationAddress = (chainId?: number) => {
  return getAddress(addresses.migration, chainId);
};

export const getMigrationAddressMap = (): { [chainId: number]: Address } => {
  // @ts-ignore
  return addresses.migration;
};
