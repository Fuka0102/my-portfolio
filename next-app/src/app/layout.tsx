import type { Metadata } from "next";
import { Bricolage_Grotesque, Noto_Sans_JP, DM_Sans } from "next/font/google";
import "../styles/global.scss";
import  Header from '../components/Header/Header';

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ['400', '800'],
  display: 'swap',
  preload: false,
  variable: '--bricolage-grotesque'
});

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
  variable: '--noto-sans-jp'
});

const dMSans = DM_Sans({
  weight: '400',
  display: 'swap',
  preload: false,
  variable: '--dm-sans'
});


export const metadata: Metadata = {
  title: "TANAKA FUKA | Portfolio",
  description: "TANAKA FUKAのポートフォリオ。Webデザイナー・デベロッパーとして制作した作品を掲載しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${bricolageGrotesque.variable} ${notoSansJP.variable} ${dMSans.variable}`}
    >
      <body ><Header/>{children}</body>
    </html>
  );
}
