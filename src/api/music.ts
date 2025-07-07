import request from '@/utils/request';

export function searchMusicAPI(keywords: string) {
  return request({
    method: 'GET',
    url: '/search',
    params: { keywords }
  });
}
export function getRecommendMusicAPI() {
  return request({
    method: 'GET',
    url: '/recommend/resource'
  });
}
