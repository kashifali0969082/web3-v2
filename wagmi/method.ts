import { readContract, writeContract } from "@wagmi/core";
import {
  Level10Contract,
  Level10ContractAbi,
  registrationContract,
  registrationContractAbi,
  UserContract,
  UserContractAbi,
} from "./export";
import { config } from "./config";
import { waitForTransactionReceipt } from "wagmi/actions";
import { parseEther } from "viem";
import { isAddress } from "viem";
type DATA = [
  string, // userAddress
  bigint, // teamId
  bigint, // totalIncome
  bigint, // totalVirtualIncome
  bigint, // transactionCount
  bigint, // totalDirect
  bigint, // lastUpdate
  bigint, // currentUserLevel
  bigint // firstActivationDate
];
type UserTeamDataArray = [
  string, // userAddress
  bigint, // teamId
  bigint, // totalIncome
  bigint, // totalVirtualIncome
  bigint, // transactionCount
  bigint, // totalDirect
  bigint, // lastUpdate
  bigint, // currentUserLevel
  bigint // firstActivationDate
];

interface User {
  countId: bigint;
  imgURL: string;
  joiningDate: bigint;
  name: string;
  uplineCountID: bigint;
  uplineId: string;
  userId: string;
}
interface Transaction2 {
  actionName: string;
  actionAmount: bigint;
  actionFrom: string;
  actionDate: number;
}
interface UserData {
  name: string;
  uplineId: string;
  userId: string;
  imgURL: string;
  joiningDate: number;
  countId: number;
  uplineCountID: number;
}

// ------------------------------ ReadMethods
export const TotalIncome2 = async (address: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "users",
    args: [address],
  });

  return result as [string, string, string, string, bigint, bigint, bigint];
};
export const DownlinerFunction = async (address: string) => {
  const result = await readContract(config, {
    abi: UserContractAbi,
    address: UserContract,
    functionName: "getDownlinersPerLevel",
    args: [address],
  });
  return result;
};

export const TotalIncome = async (address: string): Promise<DATA> => {
  const result = await readContract(config, {
    abi: UserContractAbi,
    address: UserContract,
    functionName: "users",
    args: [address],
  });

  return result as DATA;
};
export const TotalTeamSize = async (address: string) => {
  // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", address);

  const result = await readContract(config, {
    abi: UserContractAbi,
    address: UserContract,
    functionName: "getvirtualTeamSize",
    args: [address],
  });
  return result;
};
export const TotalTeamSizeLVL10 = async (address: string) => {
  // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", address);

  const result = await readContract(config, {
    abi: Level10ContractAbi,
    address: Level10Contract,
    functionName: "getvirtualTeamSize",
    args: [address],
  });
  return result;
};
export const getUSERLEVEL = async (address: string) => {
  if (!address) {
    console.log("Invalid address:", address);
    return;
  }

  const result = await readContract(config, {
    abi: UserContractAbi,
    address: UserContract,
    functionName: "userLevel",
    args: [address],
  });
  console.log("result as address is----------------------- :", result);

  return Number(result);

};
export const getUSERLEVEL10 = async (address: string) => {
  if (!address) {
    // console.error("Invalid address:", address);
    return;
  }

  const result = await readContract(config, {
    abi: Level10ContractAbi,
    address: Level10Contract,
    functionName: "userLevel",
    args: [address],
  });
  return Number(result);
};

export const lastUserId = async () => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "lastUserId",
  });
  return result;
};
export const IdtoAdress = async (id: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "usersById",
    args: [id],
  });
  return result;
};
export const countIdToAddress = async (id: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "countIdToAddress",
    args: [id],
  });
  // console.log("logan he logan naa");
  
  return result;
};
export const isUserExsists = async (adress: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "isRegistered",
    args: [adress],
  });
  return result;
};
export const DownlineCount = async (adress: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "directDownlinesCount",
    args: [adress],
  });
  return result as bigint;
};
// remove this one when user change hardcoded adres too manually
export const TEstDownlineCount = async (adress: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "directDownlinesCount",
    args: [adress],
  });
  return result as bigint;
};
export const DownlineCountadress = async (adress: string, id: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "directDownlines",
    args: [adress, id],
  });
  return result as string;
};

export const UplinerAdress = async (adress: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "users",
    args: [adress],
  });

  return (result as bigint[])[6];
};
export const Countlinerdata = async (adress: string) => {
  const result = await readContract(config, {
    abi: UserContractAbi,
    address: UserContract,
    functionName: "users",
    args: [adress],
  });

  return result as UserTeamDataArray;
};
export const GetTotalIncome = async () => {
  const result = await readContract(config, {
    abi: UserContractAbi,
    address: UserContract,
    functionName: "totalEarned",
  });

  return result as bigint;
};
export const AdressToID = async (adress: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "AddressToCountId",
    args: [adress],
  });

  return result as number;
};
export const GetUplinerAdress = async (adress: string) => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "userUpline",
    args: [adress],
  });

  return result as string;
};

export const getUser = async (adress: string): Promise<User> => {
  const result = await readContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "getUser",
    args: [adress],
  });
  return result as User;
};
export const getTransaction = async (
  address: string
): Promise<Transaction2[]> => {
  const result = await readContract(config, {
    abi: UserContractAbi,
    address: UserContract,
    functionName: "getStories",
    args: [address],
  });

  if (Array.isArray(result)) {
    return result.slice(-20) as Transaction2[];
  }

  console.error("Unexpected result format:", result);
  return [];
};

// ---------------------------- writeMethods
export const getTxn = async (hash: any) => {
  try {
    if (!hash) {
      return null;
    }
    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash,
    });

    return transactionReceipt.status === "success" ? true : false;
  } catch (error) {
    console.error("Error getTxn:", error);
    return null;
  }
};
// 1:
export const Register = async (adress: string, name: string) => {
  const result = await writeContract(config, {
    abi: registrationContractAbi,
    address: registrationContract,
    functionName: "register",
    args: [adress, name],
    // value: parseEther("0.0003"),
  });
  return result;
};

export const PurchaseLevel = async (amount: string, level: string) => {
  const result = await writeContract(config, {
    abi: UserContractAbi,
    address: UserContract,
    functionName: "purchase",
    args: [level],
    value: parseEther(amount),
  });
  return result;
};

export const Purchase10Level = async (amount: string, level: string) => {
  const result = await writeContract(config, {
    abi: Level10ContractAbi,
    address: Level10Contract,
    functionName: "purchase",
    args: [level],
    value: parseEther(amount),
  });

  return result;
};
