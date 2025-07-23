import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { ApexOptions } from 'apexcharts';
import { GraphDataResponse } from '@/types';

type ChartProps = {
  predData: GraphDataResponse[];
  realData: GraphDataResponse[];
  isUp: number;
};

function formatShortDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function transformDataForLineChart(data: GraphDataResponse[]) {
  return data.map((entry) => ({
    x: entry.date,
    y: entry.price,
  }));
}

export default function StockCharts({ predData, realData, isUp }: ChartProps) {
  const transformedPredData = transformDataForLineChart(predData);
  const transformedRealData = transformDataForLineChart(realData);

  // 날짜 동적으로 계산하기 위해
  const allDates = [...predData, ...realData].map((d) => d.date);
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
    annotations: {
      xaxis:
        predData.length > 0
          ? [
              {
                x: predData[predData.length - 1]?.date,
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
            ]
          : [],
    },
    tooltip: {
      x: {
        show: true,
        formatter: function (val: string | number) {
          return formatShortDate(String(val));
        },
      },
      y: {
        formatter: function (val: number) {
          return `$${val.toFixed(2)}`;
        },
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
      show: true,
      position: 'top',
      horizontalAlign: 'right',
    },
  } as const;

  return (
    <Wrapper $isUp={isUp}>
      <ApexChart
        options={options}
        series={[
          ...(transformedPredData.length > 0
            ? [
                {
                  name: 'Predicted Data',
                  data: transformedPredData,
                  color: '#f9dc4a',
                },
              ]
            : []),
          ...(transformedRealData.length > 0
            ? [
                {
                  name: 'Real Data',
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

const Wrapper = styled.div<{ $isUp: number }>`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(248, 248, 248, 0.02) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-radius: 8px;
  padding: 16px;

  .apexcharts-xaxis-annotation-label {
    writing-mode: horizontal-tb !important;
    transform: rotate(0deg) !important;
  }

  .apexcharts-xaxis-annotations rect {
    stroke: none !important;
  }

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
