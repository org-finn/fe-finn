import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';

export default function MyPage() {
  const { data: userInfo } = useGetUserInfo();

  return <div>안녕하세요 {userInfo?.content.nickname}님</div>;
}
