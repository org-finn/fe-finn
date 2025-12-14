import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { ApexOptions } from 'apexcharts';
import { TickerGraphDataResponse } from '@/types';

type ChartProps = {
  realData: TickerGraphDataResponse[];
  sentiment: number;
};

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function transformDataForLineChart(data: TickerGraphDataResponse[]) {
  return data.map((entry) => ({
    x: entry.date,
    y: entry.price,
    changeRate: entry.changeRate,
  }));
}

export default function TickerCharts({ realData, sentiment }: ChartProps) {
  const transformedRealData = transformDataForLineChart(realData);

  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    markers: {
      size: realData.map((item) => {
        const hasArticles =
          (item.positiveArticleCount || 0) > 0 ||
          (item.negativeArticleCount || 0) > 0;
        return hasArticles ? 4 : 1;
      }),
      colors: ['#ff6b6b'],
      strokeColors: ['#ff6b6b'],
      strokeWidth: 0,
      discrete: realData.map((item, index) => {
        const hasArticles =
          (item.positiveArticleCount || 0) > 0 ||
          (item.negativeArticleCount || 0) > 0;
        return hasArticles
          ? {
              seriesIndex: 0,
              dataPointIndex: index,
              fillColor: '#ff6b6b',
              strokeColor: '#ff6b6b',
              size: 4,
              shape: 'circle' as const,
            }
          : {
              seriesIndex: 0,
              dataPointIndex: index,
              fillColor: '#ff6b6b',
              strokeColor: '#ff6b6b',
              size: 1,
              shape: 'circle' as const,
            };
      }),
    },
    xaxis: {
      type: 'category',
      categories: realData.map((item) => item.date),
      labels: {
        formatter: function (val: string) {
          return formatShortDate(val);
        },
        showDuplicates: false,
        maxHeight: 50,
      },
      tickAmount: Math.min(5, realData.length),
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      followCursor: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const price = series[seriesIndex][dataPointIndex];
        const changeRate = realData[dataPointIndex]?.changeRate || 0;
        const positiveCount =
          realData[dataPointIndex]?.positiveArticleCount || 0;
        const negativeCount =
          realData[dataPointIndex]?.negativeArticleCount || 0;

        const changeRateColor =
          changeRate > 0 ? 'red' : changeRate < 0 ? 'blue' : 'darkgrey';
        const changeRateSign = changeRate > 0 ? '+' : '';

        const hasArticles = positiveCount > 0 || negativeCount > 0;

        return `
          <div style="
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 8px 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 12px;
            min-width: 120px;
          ">
            <div style="
              font-weight: 600;
              color: #374151;
              margin-bottom: 6px;
              font-size: 13px;
            ">
              Real Data
            </div>
            <div style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 2px;
            ">
              <span style="color: #6b7280;">가격:</span>
              <span style="font-weight: 600; color: #111827;">$${price.toFixed(2)}</span>
            </div>
            <div style="
              display: flex;
              justify-content: space-between;
              ${hasArticles ? 'margin-bottom: 6px;' : ''}
            ">
              <span style="color: #6b7280;">등락률:</span>
              <span style="
                font-weight: 600;
                color: ${changeRateColor};
              ">
                ${changeRateSign}${changeRate.toFixed(2)}%
              </span>
            </div>
            ${
              hasArticles
                ? `
            <div style="
              border-top: 1px solid #e5e7eb;
              padding-top: 6px;
              margin-top: 6px;
              text-align: center;
            ">
              <span style="color: #6b7280;">긍정 기사: </span>
              <span style="font-weight: 600; color: red;">${positiveCount}개</span>
              <span style="color: #6b7280; margin-left: 8px;">/ 부정 기사: </span>
              <span style="font-weight: 600; color: blue;">${negativeCount}개</span>
            </div>
            `
                : ''
            }
          </div>
        `;
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: function (val: number) {
          return `$${val.toFixed(0)}`;
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: ['rgba(255, 255, 255, 0.1)'],
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      strokeDashArray: 3,
    },
    legend: {
      show: false,
    },
  } as const;

  return (
    <Wrapper $sentiment={sentiment}>
      <ApexChart
        options={options}
        series={[
          ...(transformedRealData.length > 0
            ? [
                {
                  data: transformedRealData,
                  color: '#ff6b6b',
                },
              ]
            : []),
        ]}
        type="area"
        height={380}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $sentiment: number }>`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(248, 248, 248, 0.02) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-radius: 8px;
  padding: 16px;

  .apexcharts-canvas {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 20%,
      transparent 80%,
      rgba(255, 255, 255, 0.03) 100%
    );
  }

  .apexcharts-gridline {
    stroke: rgba(0, 0, 0, 0.05) !important;
  }

  .apexcharts-area-series .apexcharts-series-0 .apexcharts-area {
    fill: url(#SvgjsLinearGradient1000) !important;
  }

  @media screen and (max-width: 768px) {
    padding: 0px;
  }
`;
