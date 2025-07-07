import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('@/views/Home'));
const Choiceness = lazy(() => import('@/views/Choiceness'));
const Roam = lazy(() => import('@/views/Roam'));
const MyLoveMusic = lazy(() => import('@/views/MyLoveMusic'));
const RecentPlay = lazy(() => import('@/views/RecentPlay'));

const routers: any[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/choiceness',
    element: <Choiceness />
  },
  {
    path: '/roam',
    element: <Roam />
  },
  {
    path: '/loveMusic',
    element: <MyLoveMusic />
  },
  {
    path: '/recentPlay',
    element: <RecentPlay />
  }
];
export default routers;
