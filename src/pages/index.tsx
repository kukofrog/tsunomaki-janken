import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import useDarkMode from 'hooks/useDarkMode';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Header from 'components/Header';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'])),
    },
  };
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px 80px 40px;
`;

const Goddess = styled.img`
  width: 160px;
  height: 160px;
`;

const TextBox = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h1 {
    color: var(--text-primary);
    font-size: 40px;
    line-height: 44px;
  }
  span {
    margin-top: 12px;
    color: var(--text-secondary);
    font-size: 20px;
  }
`;

const ThemeButton = styled.button`
  margin: 20px 0;
  padding: 8px 20px;
  border-radius: 100px;
  box-shadow: 0px 4px 12px rgba(99, 88, 122, 0.5);
  background-color: #63587a;
  color: #fff;

  span {
    font-size: 16px;
  }
`;

const LocaleLink = styled.a`
  font-size: 16px;
  cursor: pointer;
  color: #5f3dc4;
  text-decoration: underline;
`;

const Home: NextPage = props => {
  const { theme, setTheme } = useDarkMode();
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{'Next.js Boilerplate'}</title>
      </Head>
      <Container>
        <Header />
        <Goddess src="https://i.imgur.com/DQaWmTF.jpg" />
        <TextBox>
          <h1>{t('title')}</h1>
          <span>{t('description')}</span>
        </TextBox>
        <ThemeButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          <span>
            {t('theme_msg')} {theme === 'light' ? '☀️' : '🌙'}
          </span>
        </ThemeButton>
      </Container>
    </>
  );
};

export default Home;
