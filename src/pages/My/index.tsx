import { styled } from 'styled-components';
import { useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';
import { Text } from '@/components/common/typography/Text';
import { usePutNickname } from '@/api/hooks/usePutNickname';
import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';
import { useGetNicknameValidation } from '@/api/hooks/useGetNicknameValidation';
import FavoriteTickerSection from '@/components/My/FavoriteTickerSection';
import FavoriteArticleSection from '@/components/My/FavoriteArticleSection';

export default function MyPage() {
  const { data: userInfo } = useGetUserInfo();
  const userInfoData = userInfo?.content;
  const [nickname, setNickname] = useState(userInfoData?.nickname || '');
  const [isVisible, setIsVisible] = useState(true);
  const [validationNickname, setValidationNickname] = useState('');
  const { mutate: putNickname } = usePutNickname();
  const queryClient = useQueryClient();

  const { data: validationData, isLoading: isValidating } =
    useGetNicknameValidation(validationNickname);
  const isEnable = validationData?.content?.isEnable;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setValidationNickname('');
  };

  const handleValidate = () => {
    if (nickname.includes(' ')) {
      alert('닉네임에 공백이 들어갈 수 없습니다!');
      return;
    }
    if (nickname.length < 1 || nickname.length > 12) {
      alert('닉네임 길이를 확인해주세요!');
      return;
    }
    setValidationNickname(nickname);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validationNickname) {
      handleValidate();
      return;
    }

    if (!isEnable) return;

    putNickname(
      { nickname: validationNickname },
      {
        onSuccess: () => {
          localStorage.setItem('nickname', validationNickname);
          setIsVisible(true);
          queryClient.invalidateQueries({ queryKey: ['userInfo'] });
        },
        onError: () => {
          alert('닉네임 변경에 실패했습니다. 다시 시도해주세요!');
        },
      }
    );
  };
  return (
    <Wrapper>
      <TitleWrapper>
        {isVisible ? (
          <>
            <NickNameWrapper>
              <Text size="l" weight="bold">
                <Text size="xl" weight="bold" style={{ color: '#0057ff' }}>
                  {userInfoData?.nickname}
                </Text>
                <CustomButton
                  aria-label="닉네임 수정"
                  onClick={() => setIsVisible(false)}
                >
                  <MdOutlineDriveFileRenameOutline size={24} color="#0057ff" />
                </CustomButton>
                님, 안녕하세요!
              </Text>
            </NickNameWrapper>
          </>
        ) : (
          <EditWrapper>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
              />
              <ValidateButton
                type="button"
                onClick={handleValidate}
                disabled={isValidating}
              >
                {isValidating ? '확인 중...' : '닉네임 검사'}
              </ValidateButton>
              <CustomButton
                aria-label="닉네임 수정 완료"
                type="submit"
                disabled={!isEnable}
              >
                <MdOutlineDriveFileRenameOutline
                  size={24}
                  color={isEnable ? '#0057ff' : '#cccccc'}
                />
              </CustomButton>
            </Form>
            {validationNickname && !isValidating && (
              <ValidationMessage $isEnable={!!isEnable}>
                {isEnable
                  ? '사용 가능한 닉네임입니다.'
                  : '이미 사용 중인 닉네임입니다.'}
              </ValidationMessage>
            )}
            <Text size="xs" weight="normal" style={{ color: '#9e9e9e' }}>
              닉네임 길이는 1-12 글자로 제한됩니다.
            </Text>
          </EditWrapper>
        )}
      </TitleWrapper>
      <Text size="m" weight="bold">
        관심 종목
      </Text>
      <FavoriteSection>
        <FavoriteTickerSection />
        <FavoriteArticleSection />
      </FavoriteSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 0px 60px;

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 30px;
    align-items: center;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    width: 90%;
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Form = styled.form`
  display: flex;
  align-items: end;
  gap: 8px;
`;

const Input = styled.input`
  background: none;
  border: none;
  font-size: 32px;
  color: #333333;
  height: 32px;
  max-width: 230px;
  padding: 0;
  &:focus {
    outline: none;
  }
`;

const ValidateButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  background-color: #e7f0fe;
  color: #2757aa;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #dae5f8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const ValidationMessage = styled.p<{ $isEnable: boolean }>`
  font-size: 12px;
  color: ${({ $isEnable }) => ($isEnable ? '#0057ff' : '#e53935')};
  margin: 0;
`;

const CustomButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-content: end;
  padding: 0;
  cursor: pointer;
`;

const NickNameWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    align-items: end;
    display: flex;
  }
`;

const FavoriteSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media screen and (max-width: 768px) {
    width: 90%;
    gap: 30px;
  }
`;
