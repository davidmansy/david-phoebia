import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryContainer,
} from "victory";

function Chart({ versions }) {
  return (
    <React.Fragment>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        containerComponent={<VictoryContainer title="Chart of versions" />}
      >
        <VictoryAxis
          tickValues={versions.map((_, i) => i + 1)}
          tickFormat={versions.map((v) => v.version)}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}kb`} />
        <VictoryBar data={versions} x="version" y="size" />
      </VictoryChart>
    </React.Fragment>
  );
}

export default Chart;
