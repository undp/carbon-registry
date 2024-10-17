const addCommSepRound = (value: any) => {
  return Number(value)
    .toFixed(2)
    .replace('.00', '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export interface GHGChartSeriesItem {
  name: string;
  data: any[];
  type: string;
}

export interface ChartSeriesItem {
  name: string;
  data: any[];
}

export const totalEmissionOptionsSub: any = (labels: string[], chartColors: string[]) => {
  return {
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'darken',
          value: 0.7,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'bar',
      height: 400,
      // eslint-disable-next-line prettier/prettier
        width: "100%",
      stacked: true,
      stackType: 'normal',
      toolbar: {
        show: false, // Hides the toolbar which includes the menu icon
      },
    },
    // plotOptions: { bar: { horizontal: false, columnWidth: '100%' } },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      title: {
        text: 'Time',
        style: {
          color: '#263238',
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      categories: labels,
      labels: {
        rotatealways: true,
      },
      axisBorder: {
        show: true,
        color: '#3A354180',
      },
    },
    yaxis: {
      show: true,
      title: {
        text: `tCO\u2082-eq`,
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#263238',
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      labels: {
        formatter: (value: any) => {
          return addCommSepRound(value);
        },
      },
      axisBorder: {
        show: true,
        color: '#3A354180',
      },
    },
    fill: {
      opacity: 1,
      colors: chartColors,
    },
    title: {
      text: '',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Inter',
        color: '#263238',
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: false,
      showForZeroSeries: false,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Inter',
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: 30,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 5,
      labels: {
        colors: chartColors,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: chartColors,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
};

export const actualVsEstimateOptionsSub: any = (labels: string[], chartColors: string[]) => {
  return {
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'darken',
          value: 0.7,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'bar',
      height: 400,
      width: '100%',
      stacked: true,
      stackType: 'normal',
      toolbar: {
        show: false, // Hides the toolbar which includes the menu icon
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      title: {
        text: 'Sub Sector',
        style: {
          color: '#263238',
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      categories: labels,
      labels: {
        rotate: -0,
        rotateAlways: false,
        style: {
          colors: [],
          fontSize: '8px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
          whiteSpace: 'normal',
        },
      },
      axisBorder: {
        show: true,
        color: '#3A354180',
      },
    },
    yaxis: {
      show: true,
      title: {
        text: 'Percentage',
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#263238',
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      labels: {
        formatter: (value: any) => {
          return addCommSepRound(value);
        },
      },
      axisBorder: {
        show: true,
        color: '#3A354180',
      },
    },
    fill: {
      opacity: 1,
      colors: chartColors,
    },
    title: {
      text: '',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Inter',
        color: '#263238',
      },
    },
    legend: {
      show: false,
    },
  };
};

export const emissionComparisonOptionsSub: any = (labels: string[], chartColors: string[]) => {
  return {
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: true,
        filter: {
          type: 'darken',
          value: 0.7,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'line',
      height: 400,
      // eslint-disable-next-line prettier/prettier
        width: "100%",
      stacked: false,
      toolbar: {
        show: false, // Hides the toolbar which includes the menu icon
      },
    },
    stroke: {
      width: [0, 0, 0, 2],
      curve: 'stepline',
      lineCap: 'square',
      colors: ['#008f39'],
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      title: {
        text: 'Year',
        style: {
          color: '#263238',
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      categories: labels,
      labels: {
        rotatealways: true,
      },
      axisBorder: {
        show: true,
        color: '#3A354180',
      },
    },
    yaxis: {
      show: true,
      title: {
        text: 'Percentage',
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#263238',
          fontSize: '12px',
          fontFamily: 'Inter',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      labels: {
        formatter: (value: any) => {
          return addCommSepRound(value);
        },
      },
      axisBorder: {
        show: true,
        color: '#3A354180',
      },
    },
    fill: {
      opacity: 1,
      colors: chartColors,
    },
    title: {
      text: '',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'Inter',
        color: '#263238',
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: false,
      showForZeroSeries: false,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Inter',
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 5,
      labels: {
        colors: chartColors,
        useSeriesColors: false,
      },
      markers: {
        width: [12, 12, 12, 33],
        height: [12, 12, 12, 2],
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: [...chartColors, '#008f39'],
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
};
