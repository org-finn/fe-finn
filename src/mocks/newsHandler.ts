import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getInfiniteArticleListPath } from '@/api/hooks/useGetInfiniteArticleList';
import { getFilterTickerListPath } from '@/api/hooks/useGetFilterTickerList';

const mockNewsList = [
  {
    articleId: '5c3efd65-af44-409b-8370-dae762c54b37',
    title:
      'Bone Marrow Failure Market Growth Accelerates with Advances in Cell and Gene Therapy | DelveInsight',
    description:
      'The bone marrow failure market is experiencing steady growth driven by increasing prevalence of bone marrow disorders, advancements in stem cell transplantation, gene therapy, and immunosuppressive treatments. Emerging therapies and rising awareness are expanding therapeutic options and improving patient outcomes.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/dbcddd65-71dd-4559-8875-ae89ac4f96db',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142261/0/en/Bone-Marrow-Failure-Market-Growth-Accelerates-with-Advances-in-Cell-and-Gene-Therapy-DelveInsight.html',
    publishedDate: '하루 전',
    source: 'Delveinsight',
  },
  {
    articleId: '29c3fbac-e2e7-41c0-baa3-aad081142d8f',
    title: 'Transaction in Own Shares',
    description:
      'Shell plc announced a share buyback program on September 1, 2025, purchasing shares across multiple trading venues including London Stock Exchange, Chi-X, BATS, and Amsterdam exchanges. HSBC Bank plc is executing the trading decisions independently from July 31 to October 24, 2025.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142255/0/en/Transaction-in-Own-Shares.html',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142255/0/en/Transaction-in-Own-Shares.html',
    publishedDate: '하루 전',
    source: 'Shell Plc',
  },
  {
    articleId: '25244b0a-b628-4a99-b075-9f7b080f5a65',
    title: 'The Best ETFs to Invest In Right Now',
    description:
      'The article explores two promising ETF investment opportunities: the iShares Semiconductor ETF for capitalizing on the AI chip market growth, and the Vanguard High Dividend Yield ETF for generating passive income through diversified dividend stocks.',
    shortCompanyNames: ['NVDA', 'AMD', 'INTC'],
    thumbnailUrl:
      'https://g.foolcdn.com/editorial/images/831487/artifical-intelligence-gettyimages-1276832742.jpg',
    contentUrl:
      'https://www.fool.com/investing/2025/09/01/the-best-etfs-to-invest-in-right-now/?source=iedfolrf0000001',
    publishedDate: '하루 전',
    source: 'Joe Tenebruso',
  },
  {
    articleId: 'db08022a-0035-4988-a650-62a6ab136027',
    title:
      'Capgemini SE : Déclaration des transactions sur actions propres réalisées du 25 au 29 août 2025',
    description:
      'Capgemini reported its share transactions from August 25-29, 2025, detailing daily trading volumes and weighted average purchase prices across different markets.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/2bd353d1-968f-4357-a8e7-379888d802f4',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142230/0/fr/Capgemini-SE-D%C3%A9claration-des-transactions-sur-actions-propres-r%C3%A9alis%C3%A9es-du-25-au-29-ao%C3%BBt-2025.html',
    publishedDate: '하루 전',
    source: 'Capgemini',
  },
  {
    articleId: '864aeeb4-5508-4240-99f2-152098c4330e',
    title:
      'Michelin completes the divestment of its bias tires and tracks for compact construction equipment activities',
    description:
      'Michelin has completed the sale of its bias tires and tracks for compact construction equipment, including two plants in Sri Lanka and the Camso brand. The divestment aligns with their 2030 sustainable growth strategy and will help strengthen financial performance.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/cb56be7e-dfca-431e-8485-d83eb00a3d58',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142233/0/en/Michelin-completes-the-divestment-of-its-bias-tires-and-tracks-for-compact-construction-equipment-activities.html',
    publishedDate: '하루 전',
    source: 'Michelin',
  },
  {
    articleId: '2cf25b80-0dbc-4079-952b-f2511859b1e4',
    title:
      'Michelin finalise la cession de ses activités pneus bias et chenilles à destination des équipements de construction compacts',
    description:
      "Michelin has completed the sale of its bias tires and tracks business for compact construction equipment, involving two Sri Lankan facilities and the Camso brand, as part of its sustainable growth strategy 'Michelin in Motion 2030'.",
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/cb56be7e-dfca-431e-8485-d83eb00a3d58',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142233/0/fr/Michelin-finalise-la-cession-de-ses-activit%C3%A9s-pneus-bias-et-chenilles-%C3%A0-destination-des-%C3%A9quipements-de-construction-compacts.html',
    publishedDate: '하루 전',
    source: 'Michelin',
  },
  {
    articleId: 'd5dd7779-e10b-4e00-a258-ccdf49a3a60f',
    title: 'Block listing Interim Review',
    description:
      'Admiral Group Plc filed an interim review of its Share Incentive Plan and Employee Benefit Trust, reporting no new securities issued during the period from March to August 2025.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/5f4bde37-efde-4532-a216-0e9d1981ad6f',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142205/0/en/Block-listing-Interim-Review.html',
    publishedDate: '하루 전',
    source: 'Dan Caunt',
  },
  {
    articleId: '62819f7f-d6f0-44e9-abea-92b8b1f7ef97',
    title:
      'Europe HVO for Data Center Backup Market Report 2025-2034, with Profiles of Neste, Repsol, TotalEnergies, Eni, Crown Oil, Certas Energy, LubiQ HVO Fuels, Rolls-Royce, and Moteurs Baudouin',
    description:
      'The European HVO market for data center backup power is projected to grow from $6.69 million in 2024 to $21.67 million by 2034, driven by demand for low-emission, eco-friendly backup power solutions in data centers.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142204/28124/en/Europe-HVO-for-Data-Center-Backup-Market-Report-2025-2034-with-Profiles-of-Neste-Repsol-TotalEnergies-Eni-Crown-Oil-Certas-Energy-LubiQ-HVO-Fuels-Rolls-Royce-and-Moteurs-Baudouin.html',
    publishedDate: '하루 전',
    source: 'Researchandmarkets.Com',
  },
  {
    articleId: '750c6a09-3e34-411c-8ebc-ef2dcb1e7fb0',
    title:
      'Data Center Fabric Market Report 2025-2033 | Cloud Migration, Big Data Analytics, IoT, Edge Computing, and Regulatory Compliance Fuel Global Demand for Advanced Data Center Fabrics',
    description:
      'The global data center fabric market is projected to grow from $43.4 billion in 2024 to $228.1 billion by 2033, driven by cloud computing, IoT, big data analytics, and regulatory compliance needs.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142202/28124/en/Data-Center-Fabric-Market-Report-2025-2033-Cloud-Migration-Big-Data-Analytics-IoT-Edge-Computing-and-Regulatory-Compliance-Fuel-Global-Demand-for-Advanced-Data-Center-Fabrics.html',
    publishedDate: '하루 전',
    source: 'Researchandmarkets.Com',
  },
  {
    articleId: 'db08022a-0035-4988-a650-62a6ab136027',
    title:
      'Capgemini SE : Déclaration des transactions sur actions propres réalisées du 25 au 29 août 2025',
    description:
      'Capgemini reported its share transactions from August 25-29, 2025, detailing daily trading volumes and weighted average purchase prices across different markets.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/2bd353d1-968f-4357-a8e7-379888d802f4',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142230/0/fr/Capgemini-SE-D%C3%A9claration-des-transactions-sur-actions-propres-r%C3%A9alis%C3%A9es-du-25-au-29-ao%C3%BBt-2025.html',
    publishedDate: '하루 전',
    source: 'Capgemini',
  },
  {
    articleId: '864aeeb4-5508-4240-99f2-152098c4330e',
    title:
      'Michelin completes the divestment of its bias tires and tracks for compact construction equipment activities',
    description:
      'Michelin has completed the sale of its bias tires and tracks for compact construction equipment, including two plants in Sri Lanka and the Camso brand. The divestment aligns with their 2030 sustainable growth strategy and will help strengthen financial performance.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/cb56be7e-dfca-431e-8485-d83eb00a3d58',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142233/0/en/Michelin-completes-the-divestment-of-its-bias-tires-and-tracks-for-compact-construction-equipment-activities.html',
    publishedDate: '하루 전',
    source: 'Michelin',
  },
  {
    articleId: '2cf25b80-0dbc-4079-952b-f2511859b1e4',
    title:
      'Michelin finalise la cession de ses activités pneus bias et chenilles à destination des équipements de construction compacts',
    description:
      "Michelin has completed the sale of its bias tires and tracks business for compact construction equipment, involving two Sri Lankan facilities and the Camso brand, as part of its sustainable growth strategy 'Michelin in Motion 2030'.",
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/cb56be7e-dfca-431e-8485-d83eb00a3d58',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142233/0/fr/Michelin-finalise-la-cession-de-ses-activit%C3%A9s-pneus-bias-et-chenilles-%C3%A0-destination-des-%C3%A9quipements-de-construction-compacts.html',
    publishedDate: '하루 전',
    source: 'Michelin',
  },
  {
    articleId: 'd5dd7779-e10b-4e00-a258-ccdf49a3a60f',
    title: 'Block listing Interim Review',
    description:
      'Admiral Group Plc filed an interim review of its Share Incentive Plan and Employee Benefit Trust, reporting no new securities issued during the period from March to August 2025.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml-eu.globenewswire.com/Resource/Download/5f4bde37-efde-4532-a216-0e9d1981ad6f',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142205/0/en/Block-listing-Interim-Review.html',
    publishedDate: '하루 전',
    source: 'Dan Caunt',
  },
  {
    articleId: '62819f7f-d6f0-44e9-abea-92b8b1f7ef97',
    title:
      'Europe HVO for Data Center Backup Market Report 2025-2034, with Profiles of Neste, Repsol, TotalEnergies, Eni, Crown Oil, Certas Energy, LubiQ HVO Fuels, Rolls-Royce, and Moteurs Baudouin',
    description:
      'The European HVO market for data center backup power is projected to grow from $6.69 million in 2024 to $21.67 million by 2034, driven by demand for low-emission, eco-friendly backup power solutions in data centers.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142204/28124/en/Europe-HVO-for-Data-Center-Backup-Market-Report-2025-2034-with-Profiles-of-Neste-Repsol-TotalEnergies-Eni-Crown-Oil-Certas-Energy-LubiQ-HVO-Fuels-Rolls-Royce-and-Moteurs-Baudouin.html',
    publishedDate: '하루 전',
    source: 'Researchandmarkets.Com',
  },
  {
    articleId: '750c6a09-3e34-411c-8ebc-ef2dcb1e7fb0',
    title:
      'Data Center Fabric Market Report 2025-2033 | Cloud Migration, Big Data Analytics, IoT, Edge Computing, and Regulatory Compliance Fuel Global Demand for Advanced Data Center Fabrics',
    description:
      'The global data center fabric market is projected to grow from $43.4 billion in 2024 to $228.1 billion by 2033, driven by cloud computing, IoT, big data analytics, and regulatory compliance needs.',
    shortCompanyNames: null,
    thumbnailUrl:
      'https://ml.globenewswire.com/Resource/Download/908fb457-7f8e-4a08-9081-5565e3dfb3d7',
    contentUrl:
      'https://www.globenewswire.com/news-release/2025/09/01/3142202/28124/en/Data-Center-Fabric-Market-Report-2025-2033-Cloud-Migration-Big-Data-Analytics-IoT-Edge-Computing-and-Regulatory-Compliance-Fuel-Global-Demand-for-Advanced-Data-Center-Fabrics.html',
    publishedDate: '하루 전',
    source: 'Researchandmarkets.Com',
  },
];

const mockTickerTypes = [
  {
    code: '200 OK',
    content: {
      tickerList: [
        {
          tickerId: '2b86190f-ac3f-4154-9532-dfecb99017f2',
          shortCompanyName: 'AMD',
          tickerCode: 'AMD',
        },
        {
          tickerId: '338ce24f-af29-47f2-9e65-495609181621',
          shortCompanyName: 'Apple',
          tickerCode: 'AAPL',
        },
        {
          tickerId: '0cd501a6-b759-4b34-ad65-981d7d587bc7',
          shortCompanyName: 'Microsoft',
          tickerCode: 'MSFT',
        },
        {
          tickerId: '1378939e-14dc-4067-a4ff-d5ffc22d1ece',
          shortCompanyName: 'Amazon',
          tickerCode: 'AMZN',
        },
        {
          tickerId: '96ead7db-621b-4bd6-874f-ce490c420d20',
          shortCompanyName: 'Tesla',
          tickerCode: 'TSLA',
        },
        {
          tickerId: 'bacdf2ae-6243-41b1-a8ec-41f4262cd832',
          shortCompanyName: 'Walmart',
          tickerCode: 'WMT',
        },
        {
          tickerId: 'b687c355-d177-474a-aa69-1e8d93dd791f',
          shortCompanyName: 'JPMorgan Chase',
          tickerCode: 'JPM',
        },
        {
          tickerId: '192ab252-9d3e-4761-aa44-3e7c1f8e42ee',
          shortCompanyName: 'Johnson & Johnson',
          tickerCode: 'JNJ',
        },
        {
          tickerId: '168a0492-3189-487a-8f0a-77b71d6b8a0a',
          shortCompanyName: 'Visa',
          tickerCode: 'V',
        },
        {
          tickerId: '57e07ebc-d3c9-46da-bd29-22e30a98be1d',
          shortCompanyName: 'Exxon Mobil',
          tickerCode: 'XOM',
        },
        {
          tickerId: '19617ed1-34f0-4a81-baca-277c2bac88c7',
          shortCompanyName: 'Coca-Cola',
          tickerCode: 'KO',
        },
        {
          tickerId: 'e65bd0db-c2c2-4168-8f42-2d9b50388337',
          shortCompanyName: 'NVIDIA',
          tickerCode: 'NVDA',
        },
        {
          tickerId: '8536c00b-be96-4538-8723-878ec00695df',
          shortCompanyName: 'Netflix',
          tickerCode: 'NFLX',
        },
        {
          tickerId: 'c22fd3b6-f11d-4f83-a3e6-477f91b9b4f4',
          shortCompanyName: 'Adobe',
          tickerCode: 'ADBE',
        },
        {
          tickerId: '31985023-9e72-4a72-98c9-8066a5fb3e62',
          shortCompanyName: 'Salesforce',
          tickerCode: 'CRM',
        },
        {
          tickerId: '1fa28e50-f396-42fe-9fa7-6092145e57ff',
          shortCompanyName: 'Qualcomm',
          tickerCode: 'QCOM',
        },
        {
          tickerId: 'b9a88e4b-45db-44c1-8f90-f2ec37ced1dd',
          shortCompanyName: 'Intel',
          tickerCode: 'INTC',
        },
        {
          tickerId: 'e41d6afd-2cd7-4b97-9169-cab48e98bce0',
          shortCompanyName: 'Oracle',
          tickerCode: 'ORCL',
        },
        {
          tickerId: '57b62038-4a9f-467a-96f3-4cbd1e619b4b',
          shortCompanyName: 'Bank of America',
          tickerCode: 'BAC',
        },
        {
          tickerId: 'eeabb4ed-daab-4de4-a524-53b52c2c6cca',
          shortCompanyName: 'Goldman Sachs',
          tickerCode: 'GS',
        },
        {
          tickerId: 'fefe2e62-ad94-4b94-935a-912e6fc3581c',
          shortCompanyName: 'P&G',
          tickerCode: 'PG',
        },
        {
          tickerId: '7f99d78b-3070-4c42-80f3-5710ffe4ca15',
          shortCompanyName: 'Home Depot',
          tickerCode: 'HD',
        },
        {
          tickerId: '1a5ef443-f436-49d4-b816-807bb754190d',
          shortCompanyName: "McDonald's",
          tickerCode: 'MCD',
        },
        {
          tickerId: 'a02ce5ec-d634-4485-8c4f-d9104e02c651',
          shortCompanyName: 'Eli Lilly',
          tickerCode: 'LLY',
        },
        {
          tickerId: 'e4603a9e-1745-4530-85e1-8e2d425e0f41',
          shortCompanyName: 'UnitedHealth',
          tickerCode: 'UNH',
        },
        {
          tickerId: 'f3009712-f9a5-4ac2-a67e-2476d658f0b5',
          shortCompanyName: 'Pfizer',
          tickerCode: 'PFE',
        },
        {
          tickerId: '463348b5-e166-4cc4-bfb9-f13b405ca1ec',
          shortCompanyName: 'Broadcom',
          tickerCode: 'AVGO',
        },
        {
          tickerId: 'abec59d2-7c6e-414f-9994-c4c30331ffc6',
          shortCompanyName: 'Costco',
          tickerCode: 'COST',
        },
        {
          tickerId: '4bf3ab58-23e8-4d63-a151-530f530d3e51',
          shortCompanyName: 'Disney',
          tickerCode: 'DIS',
        },
        {
          tickerId: '75124d2c-e7d3-4ee6-bcae-3a0786294345',
          shortCompanyName: 'Google',
          tickerCode: 'GOOGL',
        },
        {
          tickerId: '67fdafec-a741-425e-bc8e-d86249b4642b',
          shortCompanyName: 'Meta',
          tickerCode: 'META',
        },
      ],
    },
  },
];

export const newsHandlers = [
  http.get(`${BASE_URL}${getInfiniteArticleListPath()}`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const pageSize = 10;
    const totalItems = mockNewsList.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = mockNewsList.slice(startIndex, endIndex);

    return HttpResponse.json({
      code: '200 OK',
      message: '뉴스 목록을 성공적으로 조회하였습니다.',
      content: {
        articleList: pageData,
        pageNumber: page,
        hasNext: page < totalPages - 1,
      },
    });
  }),
  http.get(`${BASE_URL}${getFilterTickerListPath()}`, () => {
    return HttpResponse.json({
      code: '200 OK',
      message: '아티클 티커 필터링 - 티커 목록을 성공적으로 조회하였습니다.',
      content: mockTickerTypes[0].content.tickerList,
    });
  }),
];

export default newsHandlers;
