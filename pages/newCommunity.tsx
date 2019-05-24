import { lighten } from 'polished';
import { FC } from 'react';
import styled from 'styled-components';
import { CreateCommunity } from '../components/Community/Create';
import Layout from '../layouts/Main';

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 40px 0;
`;

const Container = styled.div`
  padding: 20px;
  background: ${({ theme }) =>
    theme.dark2Color && lighten(0.01, theme.dark2Color)};
  display: flex;
  flex-direction: column;
  width: 640px;
`;

const NewCommunityPage: FC = () => (
  <Layout>
    <Box>
      <Container>
        <CreateCommunity />
      </Container>
    </Box>
  </Layout>
);

export default NewCommunityPage;
