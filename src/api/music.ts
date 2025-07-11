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
export function getTopListMusicAPI() {
  return request({
    method: 'GET',
    url: '/toplist'
  });
}
export function getMusicListDetailAPI(id: string) {
  return request({
    method: 'GET',
    url: '/playlist/detail',
    params: { id }
  });
}

export function getRecommendSongsAPI() {
  return request({
    method: 'GET',
    url: '/recommend/songs'
  });
}
