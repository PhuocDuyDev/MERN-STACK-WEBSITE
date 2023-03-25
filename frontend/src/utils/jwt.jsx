import jwtDecode from 'jwt-decode';
import { currentUserVar } from '../client/client';

const JWTManager = () => {
    const LOGOUT_EVENT_NAME = 'jwt-logout';

    let inMemoryToken = null;
    let refreshTokenTimeoutId = null;
    let userId = null;

    const getToken = () => inMemoryToken;

    const getUserId = () => userId;

    const setToken = (accessToken) => {
        inMemoryToken = accessToken;

        // Decode and set countdown to refresh
        const decoded = jwtDecode(accessToken);
        userId = decoded.userId;
        setRefreshTokenTimeout(decoded.exp - decoded.iat);
        return true;
    };

    const abortRefreshToken = () => {
        if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
    };

    const deleteToken = () => {
        inMemoryToken = null;
        abortRefreshToken();
        window.localStorage.setItem(LOGOUT_EVENT_NAME, Date.now().toString());

        return true;
    };

    // To logout all tabs (nullify inMemoryToken)
    window.addEventListener('storage', (event) => {
        if (event.key === LOGOUT_EVENT_NAME) inMemoryToken = null;
    });

    const getRefreshToken = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}`,
                {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${getToken()}`,
                    },
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({
                        query: `mutation RefreshToken {
                        refreshToken {
                            accessToken
                            user {
                                id
                                name
                                email
                                role
                                wishlist {
                                    items {
                                        productId
                                    }
                                }
                                cart {
                                    itemsInfo {
                                        id
                                        name
                                        images
                                        price
                                        discount
                                        quantity
                                        sizeProductUser
                                        size {
                                            items {
                                                size
                                                quantity
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        
                    }`,
                    }),
                }
            );
            const { data } = await response.json();
            setToken(data.refreshToken.accessToken);
            currentUserVar(data.refreshToken.user);
            return true;
        } catch (error) {
            deleteToken();
            return false;
        }
    };

    const setRefreshTokenTimeout = (delay) => {
        // 5s before token expires
        refreshTokenTimeoutId = window.setTimeout(
            getRefreshToken,
            delay * 1000 - 5000
        );
    };

    return { getToken, setToken, getRefreshToken, deleteToken, getUserId };
};

export default JWTManager();
