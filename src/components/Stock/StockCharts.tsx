import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { ApexOptions } from 'apexcharts';

const pastData = [
  { x: '2025-05-09', y: [101.2, 105.3, 99.8, 102.7] },
  { x: '2025-05-10', y: [102.7, 104.1, 100.2, 101.5] },
  { x: '2025-05-11', y: [101.5, 103.8, 99.7, 100.9] },
  { x: '2025-05-12', y: [100.9, 102.5, 98.9, 101.2] },
  { x: '2025-05-13', y: [101.2, 104.2, 100.5, 103.7] },
  { x: '2025-05-14', y: [103.7, 106.1, 102.8, 105.2] },
  { x: '2025-05-15', y: [105.2, 107.3, 104.0, 106.7] },
  { x: '2025-05-16', y: [106.7, 108.9, 105.1, 108.2] },
  { x: '2025-05-17', y: [108.2, 109.7, 106.4, 107.5] },
  { x: '2025-05-18', y: [107.5, 108.8, 105.9, 106.3] },
  { x: '2025-05-19', y: [106.3, 107.6, 104.2, 105.1] },
  { x: '2025-05-20', y: [105.1, 106.4, 103.3, 104.7] },
  { x: '2025-05-21', y: [104.7, 105.9, 102.4, 103.5] },
  { x: '2025-05-22', y: [103.5, 104.2, 101.7, 102.1] },
  { x: '2025-05-23', y: [102.1, 103.8, 100.6, 101.9] },
  { x: '2025-05-24', y: [101.9, 104.0, 100.2, 103.2] },
  { x: '2025-05-25', y: [103.2, 105.4, 102.0, 104.6] },
  { x: '2025-05-26', y: [104.6, 106.1, 103.1, 105.3] },
  { x: '2025-05-27', y: [105.3, 107.0, 104.2, 106.8] },
  { x: '2025-05-28', y: [106.8, 109.4, 105.5, 108.9] },
  { x: '2025-05-29', y: [108.9, 110.2, 107.1, 109.7] },
  { x: '2025-05-30', y: [109.7, 111.5, 108.3, 110.2] },
  { x: '2025-05-31', y: [110.2, 112.0, 109.1, 111.4] },
  { x: '2025-06-01', y: [111.4, 112.8, 110.2, 111.9] },
  { x: '2025-06-02', y: [111.9, 113.5, 110.7, 112.6] },
  { x: '2025-06-03', y: [112.6, 114.0, 111.4, 113.2] },
  { x: '2025-06-04', y: [113.2, 115.1, 112.2, 114.7] },
  { x: '2025-06-05', y: [114.7, 116.3, 113.5, 115.9] },
  { x: '2025-06-06', y: [115.9, 117.2, 114.6, 116.4] },
  { x: '2025-06-07', y: [116.4, 118.0, 115.2, 117.7] },
  { x: '2025-06-08', y: [117.7, 119.1, 116.3, 118.5] },
  { x: '2025-06-09', y: [118.5, 121.0, 117.0, 120.2] },
];

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
        upward: '#888888',
        downward: '#888888',
      },
    },
  },
} as const;

export default function StockCharts() {
  return (
    <Wrapper>
      <ApexChart
        options={options}
        series={[{ data: pastData }]}
        type="candlestick"
        height={380}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .apexcharts-candlestick-series
    .apexcharts-series
    .apexcharts-candlestick-area:last-of-type {
    stroke: #0057ff !important;
    fill: #0057ff !important;
  }
  .apexcharts-xaxis-annotation-label {
    writing-mode: horizontal-tb !important;
    transform: rotate(0deg) !important;
  }
  .apexcharts-xaxis-annotations rect {
    stroke: none !important;
  }
`;
