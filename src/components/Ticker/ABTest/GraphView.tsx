import styled from 'styled-components';
import { PredictionListGraphDataResponse } from '@/types';
import useIsMobile from '@/hooks/useIsMobile';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type GraphViewProps = {
  graphData?: PredictionListGraphDataResponse;
};

export default function GraphView({ graphData }: GraphViewProps) {
  const isMobile = useIsMobile();

  if (!graphData) {
    return null;
  }

  const isMarketOpen = graphData.isMarketOpen;
  const displayData = graphData.priceData;

  const chartData = displayData.map((price, index) => ({
    x: index,
    y: price,
  }));

  const prices = chartData.map((data) => data.y);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const chartColor = isMarketOpen ? '#47c8d9' : '#ff6b6b';

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true },
      animations: {
        enabled: true,
        dynamicAnimation: {
          enabled: true,
        },
      },
    },
    colors: [chartColor],
    stroke: {
      curve: 'smooth',
      width: isMobile ? 2 : 2.6,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: [chartColor],
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    markers: {
      size: 0,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: chartData.length - 1,
          fillColor: chartColor,
          strokeColor: 'transparent',
          size: isMobile ? 4 : 6,
        },
      ],
    },
    yaxis: {
      show: false,
      min: minPrice,
      max: maxPrice,
    },
    tooltip: { enabled: false },
  };

  return (
    <ChartWrapper>
      <ApexChart
        options={options}
        series={[{ name: 'Price', data: chartData }]}
        type="area"
        height={isMobile ? 36 : 44}
      />
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  width: 154px;
  background: transparent;
  border-radius: 8px;
  padding: 10px 14px;

  @media screen and (max-width: 768px) {
    width: 100px;
    padding: 8px 12px;
  }

  .apexcharts-marker {
    animation: pulse 2s infinite;
    transform-origin: center;
    transform-box: fill-box;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.6);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(0.6);
    }
  }
`;
