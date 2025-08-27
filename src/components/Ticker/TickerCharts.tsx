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

  // 날짜 동적으로 계산하기 위해
  const allDates = [...realData].map((d) => d.date);
  const uniqueDates = [...new Set(allDates)].sort();
  const shownDates = uniqueDates.filter((_, index, arr) => {
    const step = Math.floor(arr.length / 4);
    return index % step === 0 || index === arr.length - 1;
  });

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
    xaxis: {
      type: 'category',
      labels: {
        formatter: function (val: string) {
          return shownDates.includes(val) ? formatShortDate(val) : '';
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      followCursor: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const price = series[seriesIndex][dataPointIndex];
        const changeRate = realData[dataPointIndex]?.changeRate || 0;

        const changeRateColor =
          changeRate > 0 ? 'red' : changeRate < 0 ? 'blue' : 'darkgrey';
        const changeRateSign = changeRate > 0 ? '+' : '';

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
            ">
              <span style="color: #6b7280;">등락률:</span>
              <span style="
                font-weight: 600;
                color: ${changeRateColor};
              ">
                ${changeRateSign}${changeRate.toFixed(2)}%
              </span>
            </div>
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
`;
