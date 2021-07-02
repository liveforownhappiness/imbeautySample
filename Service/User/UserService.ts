import axios from 'axios';

const userApi = {
  /**
   * 로그인하기
   * @param {String} 필터들
   */
  getUser: async () => {
    try {
      const res = await axios.get('/users/me');

      if (res.status > 299) throw res;
      return res.data;
    } catch (err) {
      return err;
    }
  },
  refreshToken: async (token: string) => {
    try {
      const res = await axios.post('/users/api-jwt-auth/refresh/', { token: token });

      if (res.status > 299) throw res;

      return res;
    } catch (e) {
      return e;
    }
  },
  emailLogin: async (email: string, password: string) => {
    const res = await axios.post('/users/api-jwt-auth/', {
      email: email,
      password: password,
    });

    if (res.status > 299) throw res;

    return res.data.token;
  },
  kakaoLogin: async (params: any) => {
    const res = await axios.post('/users/api-jwt-auth/kakao', params);

    if (res.status > 299) throw res;

    return res;
  },
  appleLogin: async (params: any) => {
    const res = await axios.post('/users/api-jwt-auth/apple', params);

    if (res.status !== 200) return res;

    return res;
  },
  getUserDetail: async (user_id: number) => {
    try {
      const res = await axios.get(`/users/${user_id}/`);

      if (res.status > 299) throw res;
      return res.data;
    } catch (err) {
      return err;
    }
  },
  postUser: async (params: any) => {
    try {
      const res = await axios.post('/users/', params);

      if (res.status > 299) throw res;

      return res.data.token;
    } catch (err) {
      return err;
    }
  },
  postEmailVerification: async (email: string) => {
    const res = await axios.post('/users/email_verification/', {
      email,
    });

    if (res.status > 299) throw res;

    return res.data.id;
  },
  signupEmailVerification: async (email: string) => {
    try {
      const res = await axios.post('/users/signup_email_verification/', {
        email,
      });
      if (res.status > 299) throw res;
      return res;
    } catch (e) {
      return e;
    }
  },
  editUserProfile: async (params: any) => {
    const res = await axios.patch('/users/update/', params);

    if (res.status > 299) throw res;

    return res;
  },
  signOut: async (user_id: number, reasons: Array<string>) => {
    const res = await axios.delete(`/users/${user_id}/`, { data: { reasons: reasons } });

    if (res.status > 299) throw res;
  },
  postDeviceInfo: async (firebase_device_token: string, device_id: string, os_type: string) => {
    try {
      const res = await axios.post('/users/devices', {
        name: 'mobile_app',
        registration_id: firebase_device_token,
        device_id,
        active: true,
        type: os_type,
      });

      if (res.status > 299) throw res;
    } catch (e) {
      console.log('device upload fail\n', e);
    }
  },
  postIdentification: async (imp_uid: string, phone: string) => {
    try {
      const res = await axios.post('/users/identification', {
        imp_uid,
        phone,
      });

      if (res.status > 299) throw res;

      return res;
    } catch (e) {
      return e;
    }
  },
  findEmail: async (imp_uid: string, phone: string) => {
    try {
      const res = await axios.post('/users/find_email', {
        imp_uid,
        phone,
      });

      if (res.status > 299) throw res;

      return res.data;
    } catch (e) {
      return e;
    }
  },
  getNotifications: async (params: any) => {
    try {
      const res = await axios.get('/users/notifications', { params: params });
      if (res.status > 299) throw res;
      return res.data;
    } catch (err) {
      return err;
    }
  },
  postResetPasswordEmailVerification: async (params: any) => {
    try {
      const res = await axios.post('/users/reset_password_email_verification/', {
        email: params,
      });

      if (res.status > 299) throw res;

      return res;
    } catch (e) {
      return e;
    }
  },
  patchResetPassword: async (params: any) => {
    try {
      const res = await axios.patch('/users/password/reset', params);

      if (res.status > 299) throw res;

      return res;
    } catch (e) {
      return e;
    }
  },
  patchResetPhone: async (params: any) => {
    try {
      const res = await axios.patch('/users/phone', params);

      if (res.status > 299) throw res;

      return res;
    } catch (e) {
      return e;
    }
  },
};

export default userApi;
