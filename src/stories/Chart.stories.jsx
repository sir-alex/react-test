import React from 'react';
import { css } from '@emotion/react';
import timeseriesScreen from '../timeseries-screen.png';
import histogramScreen from '../histogram-screen.png';

const Chart = ({ type }) => {
  const src = {
    timeseries: timeseriesScreen,
    histogram: histogramScreen
  }[type];

  return (
    <div css={chartStyle}>
      {src ? <img src={src} alt={`${type}-chart`}/> : <span>No chart</span>}
    </div>
  );
};

const chartStyle = () => css`
  & > img {
    border: 3px black solid;
    width: 500px;
  }
`;

export default {
  title: 'Chart',
  component: Chart,
};

const Template = (args) => <Chart {...args} />;

export const TimeseriesChart = Template.bind({});
TimeseriesChart.args = {
  type: 'timeseries',
};

export const HistogramChart = Template.bind({});
HistogramChart.args = {
  type: 'histogram',
};
