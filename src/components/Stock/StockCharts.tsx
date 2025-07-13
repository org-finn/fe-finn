import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { ApexOptions } from 'apexcharts';
import { GraphDataResponse } from '@/types';

type ChartProps = {
  predData: GraphDataResponse[];
  realData: GraphDataResponse[];
  isUp: number;
};
const shownDates = [
  '2025-05-11',
  '2025-05-18',
  '2025-05-25',
  '2025-06-02',
  '2025-06-09',
];
function formatShortDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
const options: ApexOptions = {
  chart: {
    type: 'candlestick',
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
  },
  xaxis: {
    type: 'category',
    labels: {
      formatter: function (val: string) {
        return shownDates.includes(val) ? formatShortDate(val) : '';
      },
    },
  },
  annotations: {
    xaxis: [
      {
        x: '6/9',
        borderColor: 'transparent',
        label: {
          text: 'Finn의 예측!',
          style: {
            color: '#0074FF',
            background: 'transparent',
            fontWeight: 600,
            fontSize: '12px',
          },
          offsetY: -20,
          offsetX: -10,
        },
      },
    ],
  },
  tooltip: {
    x: {
      show: true,
      formatter: function (val: string | number) {
        return String(val);
      },
    },
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: undefined,
        downward: undefined,
      },
    },
  },
} as const;

function transformDataForChart(data: GraphDataResponse[]) {
  return data.map((entry) => ({
    x: entry.date, // 날짜
    y: [entry.open, entry.high, entry.low, entry.close], // open, high, low, close
  }));
}

export default function StockCharts({ predData, realData, isUp }: ChartProps) {
  const transformedPredData = transformDataForChart(predData);
  const transformedRealData = transformDataForChart(realData);

  return (
    <Wrapper $isUp={isUp}>
      <ApexChart
        options={options}
        series={[
          {
            name: 'Predicted Data',
            data: transformedPredData,
            color: '#f9dc4a',
          },
          { name: 'Real Data', data: transformedRealData, color: '#888888' },
        ]}
        type="candlestick"
        height={380}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div<{ $isUp: number }>`
  .apexcharts-candlestick-series
    .apexcharts-series
    .apexcharts-candlestick-area:last-of-type {
    stroke: ${({ $isUp }) =>
      $isUp === 1 ? 'red' : $isUp === 0 ? 'grey' : '#0057ff'} !important;
    fill: ${({ $isUp }) =>
      $isUp === 1 ? 'red' : $isUp === 0 ? 'grey' : '#0057ff'} !important;
  }
  .apexcharts-xaxis-annotation-label {
    writing-mode: horizontal-tb !important;
    transform: rotate(0deg) !important;
  }
  .apexcharts-xaxis-annotations rect {
    stroke: none !important;
  }
`;
