import { CompanyRole, EmissionSector, GhgStatCardTypes, WidgetType, EmissionGas, EmissionSubSectors, ProjectionTypes, SystemNames } from '../../../Definitions';
import { Button, Col, Row, DatePicker, Skeleton, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './ghg.dashboard.scss';
import { BarChartEstimatedActualStatComponent } from './BarChartEstimatedActualStatsComponent';
import { BarChartsStatComponent } from './BarChartStatsComponent';
import {
    actualVsEstimateOptionsSub,
    emissionComparisonOptionsSub,
    totalEmissionOptionsSub,
    ChartSeriesItem,
    GHGChartSeriesItem
} from './ghg.chart.options';
import { useConnection, useUserContext } from "../../../Context";

const { RangePicker } = DatePicker;

export const GHGDashboardComponent = (props: any) => {
    const {
        t,
        Chart,
        ButtonGroup,
        Link,
        isMultipleDashboardsVisible,
    } = props;
    const { get, post, delete: del } = useConnection();
    const { userInfoState } = useUserContext();
    const [endYear, setEndYear] = useState<number>(moment().year());
    const [startYear, setStartYear] = useState<number>(moment().subtract('10', 'years').year());
    const [loadingCharts, setLoadingCharts] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [estimateData, setEstimateData] = useState<any>({});
    const [actualData, setActualData] = useState<any>({});
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const colors = ['#008f39', '#FF8183', '#7FEABF', '#FFB480', '#D8D8D8'];
    const colorsComparison = ['#7FEABF', '#FF8183', '#008f39'];

    const layout = [
        [GhgStatCardTypes.AGG_EMISSIONS_BY_SECTOR, GhgStatCardTypes.AGG_EMISSIONS_BY_GAS],
        [GhgStatCardTypes.AGG_EMISSIONS_MITIGATION_POTENTIAL_BY_SECTOR],
        [GhgStatCardTypes.AGG_REDUCTION_PERCENT_BAU_BY_SECTOR],
        [GhgStatCardTypes.AGG_EMISSIONS_COMPARISON],
    ];

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        // Event listener for window resize
        window.addEventListener('resize', handleResize);
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onChangeRange = async (dateMoment: any, dateString: any) => {
        try {
            if (!dateMoment) {
                setStartYear(0);
                setEndYear(0);
            }
            if (dateMoment !== null && dateMoment[1] !== null) {
                setStartYear(moment(dateMoment[0]?._d).year());
                setEndYear(moment(dateMoment[1]?._d).year());
            } else {
                setStartYear(0);
                setEndYear(0);
            }
        } catch (e: any) {
            setStartYear(0);
            setEndYear(0);
        }
    };

    useEffect(() => {
        getData();
    }, [startYear, endYear]);

    const parseEmissionSectorData = (statData: any) => {
        const emissionSectorSeriesData: ChartSeriesItem[] = [];
        const sectorsArray = Object.keys(EmissionSector);
        const emissionsAggBySector: any = statData?.data;
        sectorsArray?.map((sector: any) => {
            if (emissionsAggBySector[sector] !== undefined) {
                emissionSectorSeriesData.push({
                    name: EmissionSector[sector as keyof typeof EmissionSector],
                    data: emissionsAggBySector[sector],
                });
            }
        });
        return [emissionSectorSeriesData, emissionsAggBySector.xLabels];
    };

    const parseEmissionGasData = (statData: any) => {
        const emissionGasSeriesData: ChartSeriesItem[] = [];
        const gasesArray = Object.keys(EmissionGas);
        const emissionsAggByGas: any = statData?.data;
        gasesArray?.map((gas: any) => {
            if (emissionsAggByGas[gas] !== undefined) {
                emissionGasSeriesData.push({
                    name: EmissionGas[gas as keyof typeof EmissionGas],
                    data: emissionsAggByGas[gas],
                });
            }
        });
        return [emissionGasSeriesData, emissionsAggByGas.xLabels];
    };

    const parseEmissionMitigationSectorData = (statData: any) => {
        const emissionSectorSeriesData: ChartSeriesItem[] = [];
        const sectorsArray = Object.keys(EmissionSector);
        const emissionsAggBySector: any = statData?.data;
        sectorsArray?.map((sector: any) => {
            if (emissionsAggBySector[sector] !== undefined) {
                emissionSectorSeriesData.push({
                    name: EmissionSector[sector as keyof typeof EmissionSector],
                    data: emissionsAggBySector[sector],
                });
            }
        });
        return [emissionSectorSeriesData, emissionsAggBySector.xLabels];
    };

    const parseEstimateAndActualEmissionSubSectorData = (statData: any) => {
        const estimatedEmissionSubSectorSeriesData: ChartSeriesItem[] = [];
        const actualEmissionSubSectorSeriesData: ChartSeriesItem[] = [];

        const subSectorsArray = Object.keys(EmissionSubSectors);
        const estimateEmissionsAggBySubSector: any = statData?.data?.estimate?.data;
        const actualEmissionsAggBySubSector: any = statData?.data?.actual?.data;
        const estimateLastUpdateTime =
            !statData?.data?.estimate?.last ||
                statData?.data?.estimate?.last === '0' ||
                statData?.data?.estimate?.last === 0
                ? '0'
                : moment(parseInt(statData?.data?.estimate?.last)).fromNow();
        const actualLastUpdateTime =
            !statData?.data?.actual?.last ||
                statData?.data?.actual?.last === '0' ||
                statData?.data?.actual?.last === 0
                ? '0'
                : moment(parseInt(statData?.data?.actual?.last)).fromNow();

        subSectorsArray?.map((subSector: any) => {
            if (estimateEmissionsAggBySubSector && estimateEmissionsAggBySubSector[subSector] !== undefined) {
                estimatedEmissionSubSectorSeriesData.push({
                    name: EmissionSubSectors[subSector as keyof typeof EmissionSubSectors],
                    data: estimateEmissionsAggBySubSector[subSector],
                });
            }
            if (actualEmissionsAggBySubSector && actualEmissionsAggBySubSector[subSector] !== undefined) {
                actualEmissionSubSectorSeriesData.push({
                    name: EmissionSubSectors[subSector as keyof typeof EmissionSubSectors],
                    data: actualEmissionsAggBySubSector[subSector],
                });
            }
        });
        return [
            estimatedEmissionSubSectorSeriesData,
            actualEmissionSubSectorSeriesData,
            estimateEmissionsAggBySubSector?.xLabels,
            actualEmissionsAggBySubSector?.xLabels,
            estimateLastUpdateTime,
            actualLastUpdateTime,
        ];
    };

    const parseEmissionComparisonData = (statData: any) => {
        const emissionComparisonSeriesData: GHGChartSeriesItem[] = [];
        const projectionTypesArray = Object.keys(ProjectionTypes);
        const emissionsAggByComparison: any = statData?.data;
        projectionTypesArray?.map((projectionType: any) => {
            if (emissionsAggByComparison[projectionType] !== undefined) {
                emissionComparisonSeriesData.push({
                    name: ProjectionTypes[projectionType as keyof typeof ProjectionTypes],
                    data: emissionsAggByComparison[projectionType],
                    type:
                        ProjectionTypes[projectionType as keyof typeof ProjectionTypes] ===
                            ProjectionTypes.actual
                            ? 'line'
                            : 'column',
                });
            }
        });
        return [emissionComparisonSeriesData, emissionsAggByComparison.xLabels];
    };

    const supportedWidgetList: any = {
        AGG_EMISSIONS_BY_SECTOR: {
            widgetType: WidgetType.BAR,
            aggType: GhgStatCardTypes.AGG_EMISSIONS_BY_SECTOR,
            configs: {
                title: t('emissionsBySectorTitle'),
                tooltip: t('emissionsBySectorTT'),
                colors: colors,
                chartColumnWidth: 12,
                chartWidth: 490,
            },
            callbacks: {
                // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
                parseData: parseEmissionSectorData,
            },
        },
        AGG_EMISSIONS_BY_GAS: {
            widgetType: WidgetType.BAR,
            aggType: GhgStatCardTypes.AGG_EMISSIONS_BY_GAS,
            configs: {
                title: t('emissionsByGasTitle'),
                tooltip: t('emissionsByGasTT'),
                colors: colors,
                chartColumnWidth: 12,
                chartWidth: 490,
            },
            callbacks: {
                parseData: parseEmissionGasData,
            },
        },
        AGG_EMISSIONS_MITIGATION_POTENTIAL_BY_SECTOR: {
            widgetType: WidgetType.BAR,
            aggType: GhgStatCardTypes.AGG_EMISSIONS_MITIGATION_POTENTIAL_BY_SECTOR,
            configs: {
                title: t('emissionsMitigationPotentialBySectorTitle'),
                tooltip: t('emissionsMitigationPotentialBySectorTT'),
                colors: colors,
                chartColumnWidth: 24,
                chartWidth: screenWidth * 0.72,
            },
            callbacks: {
                parseData: parseEmissionMitigationSectorData,
            },
        },
        AGG_REDUCTION_PERCENT_BAU_BY_SECTOR: {
            widgetType: WidgetType.BAR_ESTIMATED_AND_ACTUAL,
            aggType: GhgStatCardTypes.AGG_REDUCTION_PERCENT_BAU_BY_SECTOR,
            configs: {
                title: t('emissionsReductionPercentageBySectorTitle'),
                tooltip: t('emissionsReductionPercentageBySectorTT'),
                colors: colors,
                chartColumnWidth: 24,
                chartWidth: screenWidth * 0.72,
            },
            callbacks: {
                parseData: parseEstimateAndActualEmissionSubSectorData,
            },
        },
        AGG_EMISSIONS_COMPARISON: {
            widgetType: WidgetType.BAR,
            aggType: GhgStatCardTypes.AGG_EMISSIONS_COMPARISON,
            configs: {
                title: t('emissionsComparisonTitle'),
                tooltip: t('emissionsComparisonTT'),
                colors: colorsComparison,
                chartColumnWidth: 24,
                chartWidth: screenWidth * 0.72,
            },
            callbacks: {
                parseData: parseEmissionComparisonData,
            },
        },
    };

    const genPayload = () => {
        const stats = [];
        for (const item in GhgStatCardTypes) {
            stats.push({
                type: item,
                statFilter: {
                    startTime: startYear !== 0 ? startYear : undefined,
                    endTime: endYear !== 0 ? endYear : undefined,
                    onlyMine:
                        userInfoState?.companyRole === CompanyRole.PROGRAMME_DEVELOPER,
                },
            });
        }
        return {
            system: SystemNames.CARBON_TRANSPARENCY,
            stats: stats,
        };
    };


    const getData = async () => {
        setLoadingCharts(true);
        try {
            const response: any = await post(
                "stats/ghg/agg",
                genPayload(),
                undefined,
                process.env.REACT_APP_STAT_URL
            );
            console.log('Response', response);
            const newd: any = {};
            for (const key in response?.data?.stats) {
                if (response?.data?.stats.hasOwnProperty(key)) {
                    if (key === GhgStatCardTypes.AGG_REDUCTION_PERCENT_BAU_BY_SECTOR) {
                        setActualData(
                            response?.data.stats.AGG_REDUCTION_PERCENT_BAU_BY_SECTOR?.data?.actual?.data
                        );
                        setEstimateData(
                            response?.data.stats.AGG_REDUCTION_PERCENT_BAU_BY_SECTOR?.data?.estimate?.data
                        );
                    }
                    const obj = response?.data?.stats[key];
                    const config = supportedWidgetList[key];
                    if (config) {
                        const dx = config.callbacks.parseData(
                            obj,
                            config.configs.dataLabelField,
                            config.configs.dataValField
                        );
                        newd[key] = {
                            data: dx,
                            time:
                                !obj.last || obj.last === '0' || obj.last === 0
                                    ? '0'
                                    : moment(parseInt(obj.last)).fromNow(),
                        };
                    }
                }
            }
            console.log('newd', newd);
            setData(newd);
        } catch (error: any) {
            console.log("Error in getting users", error);
            message.open({
                type: "error",
                content: error.message,
                duration: 3,
                style: { textAlign: "right", marginRight: 15, marginTop: 10 },
            });
        } finally {
            setLoadingCharts(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const getColorsForPercentageCharts = (percentageData: any) => {
        if (percentageData === undefined || percentageData === null) {
            return [];
        }
        let maxCategory = '';
        let maxValue = -Infinity;
        let maxIndex = -1;
        const result: any = [];

        Object.keys(percentageData).forEach((category) => {
            const categoryValues = percentageData[category];
            const maxInCategory = Math.max(...categoryValues);
            const index = categoryValues.indexOf(maxInCategory);

            if (maxInCategory > maxValue) {
                maxValue = maxInCategory;
                maxCategory = category;
                maxIndex = index;
            }
        });

        Object.keys(percentageData).forEach((category) => {
            const colorArray = percentageData[category].map((_val: any, i: number) => {
                if (i === maxIndex && category === maxCategory) {
                    return '#D4AF37'; // Yellow color for the highest bar
                }
                return '#008f39'; // Blue color for other bars
            });

            result[category] = colorArray;
            return result;
        });
        return result[maxCategory];
    };

    const getChartOptions = (labels: string[], chartColors: string[], chartId: GhgStatCardTypes) => {
        switch (chartId) {
            case GhgStatCardTypes.AGG_EMISSIONS_BY_SECTOR:
            case GhgStatCardTypes.AGG_EMISSIONS_BY_GAS:
            case GhgStatCardTypes.AGG_EMISSIONS_MITIGATION_POTENTIAL_BY_SECTOR:
                return totalEmissionOptionsSub(labels, chartColors);
                break;
            case GhgStatCardTypes.AGG_REDUCTION_PERCENT_BAU_BY_SECTOR:
                return actualVsEstimateOptionsSub(labels, chartColors);
                break;
            case GhgStatCardTypes.AGG_EMISSIONS_COMPARISON:
                return emissionComparisonOptionsSub(labels, chartColors);
                break;
            default:
                break;
        }
    };

    const getWidgetJSX = (objname: any) => {
        const obj = supportedWidgetList[objname];
        if (!obj) {
            return <></>;
        }
        const d = data[obj.aggType];
        if (!d) {
            return <></>;
        }

        if (obj.widgetType === WidgetType.BAR) {
            return (
                <Col
                    xxl={obj.configs.chartColumnWidth}
                    xl={obj.configs.chartColumnWidth}
                    md={obj.configs.chartColumnWidth}
                    className="statics-card-col"
                >
                    <BarChartsStatComponent
                        id={obj.aggType}
                        title={obj.configs.title}
                        options={getChartOptions(d.data[1], obj.configs.colors, obj.aggType)}
                        series={d.data[0]}
                        lastUpdate={d.time}
                        loading={loadingCharts}
                        toolTipText={obj.configs.tooltip}
                        Chart={Chart}
                        width={obj.configs.chartWidth}
                    ></BarChartsStatComponent>
                </Col>
            );
        }

        if (obj.widgetType === WidgetType.BAR_ESTIMATED_AND_ACTUAL) {
            return (
                <Col
                    xxl={obj.configs.chartColumnWidth}
                    xl={obj.configs.chartColumnWidth}
                    md={obj.configs.chartColumnWidth}
                    className="statics-card-col"
                >
                    <BarChartEstimatedActualStatComponent
                        id={obj.aggType}
                        title={obj.configs.title}
                        estimateOptions={estimateData ? getChartOptions(
                            d.data[2],
                            getColorsForPercentageCharts(estimateData),
                            obj.aggType
                        ) : []}
                        actualOptions={actualData ? getChartOptions(
                            d.data[3],
                            getColorsForPercentageCharts(actualData),
                            obj.aggType
                        ) : []}
                        actualSeries={d.data[1]}
                        estimatedSeries={d.data[0]}
                        loading={loadingCharts}
                        toolTipText={obj.configs.tooltip}
                        Chart={Chart}
                        lastUpdateEstimate={d.data[4]}
                        lastUpdateActual={d.data[5]}
                        width={obj.configs.chartWidth}
                    ></BarChartEstimatedActualStatComponent>
                </Col>
            );
        }
    };

    return (
        <div className="ghg-dashboard-main-container">
            {isMultipleDashboardsVisible && (
                <div className="systemchange-container" style={{ marginLeft: `20px` }}>
                    <ButtonGroup aria-label="outlined button group">
                        <Link to="/dashboard">
                            <Button className="ghg-default">Carbon Registry</Button>
                        </Link>
                        <Link to="/dashboard/mrv">
                            <Button className="mid-default-btn">Transparency System</Button>
                        </Link>
                        <Button type="primary" className="ghg-primary">
                            GHG Inventory
                        </Button>
                    </ButtonGroup>
                </div>
            )}
            <div className="filter-container">
                <div className="date-filter">
                    <RangePicker
                        picker="year"
                        defaultValue={[moment().subtract('10', 'years'), moment()]}
                        allowClear={true}
                        onChange={onChangeRange}
                    />
                </div>
            </div>
            {loadingCharts ? (
                <div className="statics-and-charts-container center">
                    <Skeleton />
                </div>
            ) : (
                layout.map((row, i) => (
                    <div className="statics-and-charts-container center">
                        <Row gutter={[40, 40]} className="statics-card-row">
                            {row.map((item, j) => getWidgetJSX(item))}
                        </Row>
                    </div>
                ))
            )}
        </div>
    );
};