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
    },
    colors: [chartColor],
    stroke: {
      curve: 'smooth',
      width: 2.6,
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
        type="line"
        height={isMobile ? 36 : 50}
      />
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  width: 170px;
  background: white;
  border-radius: 8px;
  padding: 10px 14px;

  @media screen and (max-width: 768px) {
    width: 100px;
    padding: 8px 12px;
  }
`;
