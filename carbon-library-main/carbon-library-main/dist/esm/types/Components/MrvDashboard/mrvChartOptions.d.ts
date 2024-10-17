export declare const getChartOptions: (labels: string[], colors: string[]) => {
    states: {
        normal: {
            filter: {
                type: string;
                value: number;
            };
        };
        hover: {
            filter: {
                type: string;
                value: number;
            };
        };
        active: {
            allowMultipleDataPointsSelection: boolean;
            filter: {
                type: string;
                value: number;
            };
        };
    };
    chart: {
        type: string;
    };
    dataLabels: {
        enabled: boolean;
    };
    colors: string[];
    labels: string[];
    plotOptions: {
        pie: {
            expandOnClick: boolean;
            donut: {
                labels: {
                    show: boolean;
                    total: {
                        showAlways: boolean;
                        show: boolean;
                        label: string;
                        formatter: (w: any) => string;
                    };
                    value: {
                        formatter: (value: any) => string;
                    };
                };
            };
        };
    };
    legend: {
        show: boolean;
        showForSingleSeries: boolean;
        showForNullSeries: boolean;
        showForZeroSeries: boolean;
        position: string;
        horizontalAlign: string;
        floating: boolean;
        fontSize: string;
        fontFamily: string;
        fontWeight: number;
        formatter: undefined;
        inverseOrder: boolean;
        width: undefined;
        height: undefined;
        tooltipHoverFormatter: undefined;
        customLegendItems: never[];
        offsetX: number;
        offsetY: number;
        labels: {
            colors: string;
            useSeriesColors: boolean;
        };
        markers: {
            width: number;
            height: number;
            strokeWidth: number;
            strokeColor: string;
            fillColors: string[];
            radius: number;
            customHTML: undefined;
            onClick: undefined;
            offsetX: number;
            offsetY: number;
        };
        itemMargin: {
            horizontal: number;
            vertical: number;
        };
        onItemClick: {
            toggleDataSeries: boolean;
        };
        onItemHover: {
            highlightDataSeries: boolean;
        };
    };
    responsive: {
        breakpoint: number;
        options: {
            chart: {
                width: number;
            };
            legend: {
                position: string;
            };
        };
    }[];
    tooltip: {
        enabled: boolean;
        y: {
            formatter: (value: any) => string;
        };
    };
};
