import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import {  Grid } from "@material-ui/core";

import {  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineMarkSeries} from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';
function Chart({data}) {
  return (
    <Grid item xs={6} md={6} sm={12}>
    <Card >
       <CardContent>
        <XYPlot width={400} height={300}><XAxis/><YAxis/>
        <HorizontalGridLines />
        <VerticalGridLines />
        <LineMarkSeries data={data} />
        </XYPlot>
        </CardContent>
    </Card>
    </Grid>
  );
}

export default Chart;
