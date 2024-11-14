export function isWechatBrowser(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}

export function getWechatAuthUrl(): string {
  const appId = process.env.NEXT_PUBLIC_WECHAT_APP_ID;
  const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/wechat/callback`);
  const scope = 'snsapi_base'; // 静默授权，仅获取openid
  const state = 'STATE'; // 可以使用随机字符串

  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
} 