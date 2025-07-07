import request from '@/utils/request';

export function getUserInfoAPI() {
  return request({
    method: 'GET',
    url: '/user/account'
  });
}

export function getUserFollowsAPI(userId: string) {
  return request({
    method: 'GET',
    url: '/user/follows',
    params: { userId }
  });
}
export function getUserFollowedsAPI(userId: string) {
  return request({
    method: 'GET',
    url: '/user/followeds',
    params: { userId }
  });
}
export function getUserEventAPI(userId: string) {
  return request({
    method: 'GET',
    url: '/user/followeds',
    params: { userId }
  });
}
