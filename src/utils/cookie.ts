import { NewsLettersRefreshToken, NewslettersToken } from '@/constant';
import { getCookie, setCookie } from 'cookies-next';

export const cookieUtils = {
  setToken: (token: string) => {
    setCookie(NewslettersToken, token);
  },
  getToken: () => {
    const token = getCookie(NewslettersToken);

    return token ?? "";
  }
}