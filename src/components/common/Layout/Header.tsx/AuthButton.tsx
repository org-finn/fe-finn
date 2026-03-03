import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineLogout } from 'react-icons/md';
import { TiHome } from 'react-icons/ti';
import { useRef, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import LoginModal from '@/components/common/Modal/LoginModal';
import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';
import FallbackImage from '@/components/common/Item/FallbackImage';
import useClickOutside from '@/hooks/useClickOutside';

export default function AuthButton() {
  const { isAuthenticated, handleLogout } = useAuth();
  const { data } = useGetUserInfo(isAuthenticated);
  const imageUrl = data?.content?.imageUrl;
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickProfile = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMyPage = () => {
    navigate('/my');
    setIsDropdownOpen(false);
  };

  useClickOutside([dropdownRef], () => {
    setIsDropdownOpen(false);
  });

  return (
    <UserProfile ref={dropdownRef}>
      {isAuthenticated ? (
        <Profile onClick={handleClickProfile}>
          <FallbackImage src={imageUrl} alt="profile" />
        </Profile>
      ) : (
        <LoginModal currentPath={location.pathname}>
          {(openModal) => <LoginButton onClick={openModal}>로그인</LoginButton>}
        </LoginModal>
      )}
      {isDropdownOpen && isAuthenticated && (
        <UserDropdown>
          {location.pathname !== '/my' && (
            <DropdownItem onClick={handleMyPage}>
              <TiHome size={16} />
              마이페이지
            </DropdownItem>
          )}
          <DropdownItem onClick={handleLogout}>
            <MdOutlineLogout size={16} />
            로그아웃
          </DropdownItem>
        </UserDropdown>
      )}
    </UserProfile>
  );
}

const UserProfile = styled.div`
  position: relative;
`;

const Profile = styled.div`
  width: 30px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0px;
  z-index: 100;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 110px;
  margin-top: 4px;
  color: #333333;
`;

const DropdownItem = styled.div`
  padding: 12px 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #eff3fa;
  }
`;

const LoginButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  background-color: #e7f0fe;
  color: #2757aa;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #dae5f8;
  }

  @media screen and (max-width: 768px) {
    padding: 6px 14px;
  }
`;
