import { configureAuth } from '@hilla/react-auth';
import { UserInfoService } from 'Frontend/generated/endpoints';
import UserInfo from './generated/com/example/application/configuration/UserInfo';

// Configure auth to use `UserInfoService.getUserInfo`
const auth = configureAuth(UserInfoService.getUserInfo, {
    getRoles: (userInfo: UserInfo) => userInfo.authorities,
});

// Export auth provider and useAuth hook, which are automatically
// typed to the result of `UserInfoService.getUserInfo`
export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;