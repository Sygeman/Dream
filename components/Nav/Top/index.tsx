import Link from 'next/link';
import { darken, lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import UserProvider from '../../../providers/User';
import WalletProvider from '../../../providers/Wallet';
import { Avatar, Icon, CoinIconGold, CoinIconGreen } from '../../../ui';
import { humanNumbers } from '../../../utils/count';
import Menu from './Menu';
import useRouter from '../../../hooks/useRouter';
import { Access } from '../../../helpers/Access';
import config from '../../../config';

const Box = styled.div`
  height: 46px;
  display: flex;
  padding: 0 10px;
  z-index: 100;
  background: ${({ theme }) => darken(0.1, theme.main1Color)};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const LeftMenu = styled.div`
  height: 100%;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 0 5px;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const MenuButton = styled.div`
  height: 100%;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

const PointsCount = styled.div`
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};
  font-size: 12px;
  font-weight: 500;
  display: flex;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 48px;
`;

const LogoImg = styled.img`
  height: 28px;
  margin: 0 10px;
  padding: 5px;
  cursor: pointer;
  background: ${({ theme }) => lighten(0.05, theme.main1Color)};
  border-radius: 5px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const UserBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const TopLink = styled.a`
  padding: 0 10px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  font-size: 11.7px;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  height: 100%;
  text-transform: uppercase;

  :hover {
    color: ${({ theme }) => lighten(0.6, theme.main1Color)};
  }
`;

const UserDataBox = styled.div`
  padding: 0 5px;
  display: flex;
  cursor: pointer;
  align-items: center;
  height: 100%;
`;

const AvatarBox = styled.div`
  padding-left: 14px;
`;

const PointsBox = styled.div`
  display: flex;
  margin: 0 10px;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  font-size: 13px;
  background: ${({ theme }) => theme.dark2Color};
  padding: 0 10px;
  border-radius: 5px;
  height: 32px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const BuyCoinsLink = styled.a`
  margin-left: 10px;
  color: ${({ theme }) => lighten(0.3, theme.main1Color)};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  cursor: pointer;

  i {
    font-size: 15px;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => lighten(0.4, theme.main1Color)};

  @media (max-width: 700px) {
    display: none;
  }
`;

const UserCaratBox = styled.div`
  height: 100%;
  padding: 0 6px;
  display: flex;
  align-items: center;
  font-size: 17px;
`;

interface IProps {
  leftMenuTrigger: () => void;
}

const TopNav: FC<IProps> = ({ leftMenuTrigger }) => {
  const router = useRouter();

  return (
    <Box>
      <Left>
        <MenuButton onClick={() => leftMenuTrigger()}>
          <Icon type="menu" />
        </MenuButton>
        <Link href="/" passHref>
          <LogoLink>
            <LogoImg src={`${config.cdnUrl}logo.svg`} />
          </LogoLink>
        </Link>
        <LeftMenu>
          <Links>
            <Link href="/" passHref>
              <TopLink>Клипы</TopLink>
            </Link>
            <Link href="/communities" passHref>
              <TopLink>Сообщества</TopLink>
            </Link>
            <Link href="/promoter" passHref>
              <TopLink>Продвижение</TopLink>
            </Link>
            <TopLink href={config.discordInvite} target="_blank">
              Discord
            </TopLink>
          </Links>
        </LeftMenu>
      </Left>
      <Right>
        <UserBox>
          <Access
            denyContent={
              <Links>
                <Link
                  as={`/auth?continue=/newClip`}
                  href={{
                    pathname: router.route,
                    query: {
                      ...router.query,
                      authModal: 1
                    }
                  }}
                  passHref
                >
                  <TopLink>Закинуть клип</TopLink>
                </Link>
                <Link
                  as={`/auth?continue=${router.asPath}`}
                  href={{
                    pathname: router.route,
                    query: {
                      ...router.query,
                      authModal: 1
                    }
                  }}
                  passHref
                >
                  <TopLink>Войти</TopLink>
                </Link>
              </Links>
            }
          >
            <>
              <Links>
                <Link
                  as={`/newClip`}
                  href={{
                    pathname: router.route,
                    query: {
                      ...router.query,
                      newClip: 1
                    }
                  }}
                  passHref
                >
                  <TopLink>Закинуть клип</TopLink>
                </Link>
              </Links>
              <PointsBox>
                <Points>
                  <CoinIconGold />
                  <PointsCount>
                    <WalletProvider where={{ currency: 'coin' }}>
                      {({ data }) => humanNumbers(data ? data.balance : 0)}
                    </WalletProvider>
                  </PointsCount>
                </Points>
                <Points>
                  <CoinIconGreen />
                  <PointsCount>
                    <WalletProvider where={{ currency: 'real' }}>
                      {({ data }) => humanNumbers(data ? data.balance : 0)}
                    </WalletProvider>
                    <Link
                      as={`/buycoins`}
                      href={{
                        pathname: router.route,
                        query: {
                          ...router.query,
                          buyCoinsModal: 1
                        }
                      }}
                      passHref
                    >
                      <BuyCoinsLink>
                        <Icon type="plus-circle" />
                      </BuyCoinsLink>
                    </Link>
                  </PointsCount>
                </Points>
              </PointsBox>
              <UserProvider>
                {({ user }) => (
                  <Menu user={user}>
                    <UserDataBox>
                      <UserNameBox>{user.name}</UserNameBox>
                      <AvatarBox>
                        <Avatar dot avatar={user.avatar} />
                      </AvatarBox>
                      <UserCaratBox>
                        <Icon type="caret-down" />
                      </UserCaratBox>
                    </UserDataBox>
                  </Menu>
                )}
              </UserProvider>
            </>
          </Access>
        </UserBox>
      </Right>
    </Box>
  );
};

export default TopNav;
