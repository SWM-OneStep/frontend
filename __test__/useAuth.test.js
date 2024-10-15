import { renderHook, act } from '@testing-library/react';
import * as Google from 'expo-auth-session/providers/google';
import { useAuth } from '@/hooks/auth/useAuth';
import { useApi } from '@/hooks/api/useApi';
import { useStorage } from '@/hooks/auth/useStorage';
import { useDeviceToken } from '@/hooks/auth/useDeviceToken';

// Mock dependencies
jest.mock('@/hooks/api/useApi');
jest.mock('@/hooks/auth/useStorage');
jest.mock('@/hooks/auth/useDeviceToken');
jest.mock('expo-auth-session/providers/google');
jest.mock('@sentry/react-native');

describe('useAuth', () => {
  let apiMock;
  let storageMock;
  let deviceTokenMock;

  beforeEach(() => {
    apiMock = {
      getAndroidClientId: jest.fn(),
      verifyToken: jest.fn(),
      googleLogin: jest.fn(),
      getUserInfo: jest.fn(),
    };
    storageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    deviceTokenMock = 'mockDeviceToken';

    useApi.mockReturnValue(apiMock);
    useStorage.mockReturnValue(storageMock);
    useDeviceToken.mockReturnValue({ deviceToken: deviceTokenMock });
    Google.useAuthRequest.mockReturnValue([{}, {}, jest.fn()]);
  });

  it('should get Android client ID', async () => {
    const { result } = renderHook(() => useAuth());
    apiMock.getAndroidClientId.mockResolvedValue('mockAndroidClientId');

    await act(async () => {
      await result.current.getAndroidClientId();
    });

    expect(apiMock.getAndroidClientId).toHaveBeenCalled();
    expect(result.current.androidClientId).toBe('mockAndroidClientId');
  });

  it('should handle local token', async () => {
    const { result } = renderHook(() => useAuth());
    storageMock.getItem.mockResolvedValueOnce('mockAccessToken');
    storageMock.getItem.mockResolvedValueOnce('mockUserId');
    apiMock.verifyToken.mockResolvedValue();

    const tokenData = await result.current.handleLocalToken();

    expect(storageMock.getItem).toHaveBeenCalledWith('accessToken');
    expect(storageMock.getItem).toHaveBeenCalledWith('userId');
    expect(apiMock.verifyToken).toHaveBeenCalledWith('mockAccessToken');
    expect(tokenData).toEqual({
      token: 'mockAccessToken',
      userId: 'mockUserId',
    });
  });

  it('should handle Google login', async () => {
    const { result } = renderHook(() => useAuth());
    const mockLoginResponse = {
      access: 'mockAccessToken',
      refresh: 'mockRefreshToken',
    };
    const mockUser = { id: 'mockUserId', username: 'mockUsername' };
    apiMock.googleLogin.mockResolvedValue(mockLoginResponse);
    apiMock.getUserInfo.mockResolvedValue(mockUser);

    const loginData = await result.current.handleGoogleLogin('mockGoogleToken');

    expect(apiMock.googleLogin).toHaveBeenCalledWith({
      token: 'mockGoogleToken',
      deviceToken: deviceTokenMock,
    });
    expect(storageMock.setItem).toHaveBeenCalledWith(
      'accessToken',
      'mockAccessToken',
    );
    expect(storageMock.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'mockRefreshToken',
    );
    expect(storageMock.setItem).toHaveBeenCalledWith('userId', 'mockUserId');
    expect(storageMock.setItem).toHaveBeenCalledWith(
      'userName',
      'mockUsername',
    );
    expect(loginData).toEqual({
      accessToken: 'mockAccessToken',
      userId: 'mockUserId',
    });
  });
});
