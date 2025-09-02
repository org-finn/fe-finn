import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { ApexOptions } from 'apexcharts';

type GaugeChartProps = {
  value: number;
  maxValue?: number;
  title?: string;
  colors?: string[];
};

export default function GaugeChart({
  value,
  maxValue = 100,
  colors = ['#20E647', '#87D4F9'],
}: GaugeChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    series: [Math.round((value / maxValue) * 100)],
    colors: [colors[0]],
    plotOptions: {
      radialBar: {
        startAngle: -120,
        endAngle: 120,
        track: {
          background: '#e7e7e7',
          startAngle: -120,
          endAngle: 120,
          strokeWidth: '97%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: [colors[1]],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
  } as const;

  return (
    <Wrapper>
      <ApexChart
        options={options}
        series={options.series}
        type="radialBar"
        height={170}
      />
      <ScoreLabel>{value}점</ScoreLabel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0;
  height: 144px;
  width: 204px;

  .apexcharts-canvas {
    background: transparent;
  }
`;

const ScoreLabel = styled.div`
  position: absolute;
  bottom: 42px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;
