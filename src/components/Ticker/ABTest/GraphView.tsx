import styled from 'styled-components';
import { PredictionListGraphDataResponse } from '@/types';

type GraphViewProps = {
  graphData?: PredictionListGraphDataResponse[];
};

export default function GraphView({ graphData }: GraphViewProps) {
  if (!graphData || graphData.length === 0) {
    return null;
  }

  return <GraphSection>{/* graph */}</GraphSection>;
}

const GraphSection = styled.div`
  display: flex;
`;
