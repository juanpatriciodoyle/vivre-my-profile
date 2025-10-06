import {adminUser, defaultUser} from '../constants/users';

interface UserDetails {
    displayName: string;
    avatarUrl: string;
    displayCustomerId: string | null;
    displayUserAddress: string | null;
}

export const useUserDetails = (
    userName: string,
    customerId: string,
    userAddress: string
): UserDetails => {
    const isDefaultUser = userName === defaultUser.displayName;

    if (isDefaultUser) {
        return {
            displayName: userName,
            avatarUrl: defaultUser.avatarUrl,
            displayCustomerId: customerId,
            displayUserAddress: userAddress,
        };
    }

    return {
        displayName: adminUser.displayName,
        avatarUrl: adminUser.avatarUrl,
        displayCustomerId: null,
        displayUserAddress: null,
    };
};