import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './projections.scss';
import {
  Form,
  DatePicker,
  Upload,
  Button,
  Tabs,
  Input,
  Col,
  Row,
  Collapse,
  InputNumber,
  message,
  Tooltip,
  Empty,
} from 'antd';
import {
  UploadOutlined,
  LockFilled,
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import moment from 'moment';
import { EmissionSectors, excelFields, formFields, projectionsCsvFieldMap, totalProjectionFields } from '../emission.mappings';
import { ProjectionTypes } from '../projection.types';
import React from 'react';
import { CompanyRole, Role, addCommSep } from '../../../Definitions';
import { RcFile } from 'antd/lib/upload';
import { HttpStatusCode } from 'axios';
import DiscardChangesConfirmationModel from '../../Common/Models/discardChangesConfirmationModel';
import { ClipboardCheck } from 'react-bootstrap-icons';
import { GHGRecordState } from '../../../Definitions/Enums/ghg.record.state.enum';
import GHGUserActionConfirmationModel from '../../Common/Models/ghgUserActionConfirmationModel';
import { useConnection, useUserContext } from "../../../Context";

export const GHGProjectionsComponent = (props: any) => {
  const {
    t,
  } = props;
  const { userInfoState } = useUserContext();
  const [data, setData] = useState<any[]>([]);

  const { put, get, post } = useConnection();
  const [loading, setLoading] = useState<boolean>(false);
  const [isPendingFinalization, setIsPendingFinalization] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [disabledYears, setDisabledYears] = useState<number[]>([]);
  const [changedValues, setChangedValues] = useState<any>();

  const [totalNationalBau, setTotalNationalBau] = useState<number>(0);
  const [totalNationalConditionalNdc, setTotalNationalConditionalNdc] = useState<number>(0);
  const [totalNationalUnconditionalNdc, setTotalNationalUnconditionalNdc] = useState<number>(0);

  const [energyEmissionsBau, setEnergyEmissionsBau] = useState<number>(0);
  const [energyEmissionsConditionalNdc, setEnergyEmissionsConditionalNdc] = useState<number>(0);
  const [energyEmissionsUnconditionalNdc, setEnergyEmissionsUnconditionalNdc] = useState<number>(0);

  const [fuelCombustionActivitiesBau, setFuelCombustionActivitiesBau] = useState<number>(0);
  const [fuelCombustionActivitiesConditionalNdc, setFuelCombustionActivitiesConditionalNdc] =
    useState<number>(0);
  const [fuelCombustionActivitiesUnconditionalNdc, setFuelCombustionActivitiesUnconditionalNdc] =
    useState<number>(0);

  const [fugitiveEmissionsFromFuelsBau, setFugitiveEmissionsFromFuelsBau] = useState<number>(0);
  const [fugitiveEmissionsFromFuelsConditionalNdc, setFugitiveEmissionsFromFuelsConditionalNdc] =
    useState<number>(0);
  const [
    fugitiveEmissionsFromFuelsUnconditionalNdc,
    setFugitiveEmissionsFromFuelsUnconditionalNdc,
  ] = useState<number>(0);

  const [carbonDioxideTransportStorageBau, setCarbonDioxideTransportStorageBau] =
    useState<number>(0);
  const [
    carbonDioxideTransportStorageConditionalNdc,
    setCarbonDioxideTransportStorageConditionalNdc,
  ] = useState<number>(0);
  const [
    carbonDioxideTransportStorageUnconditionalNdc,
    setCarbonDioxideTransportStorageUnconditionalNdc,
  ] = useState<number>(0);

  const [industrialProcessesProductUseBau, setIndustrialProcessesProductUseBau] =
    useState<number>(0);
  const [
    industrialProcessesProductUseConditionalNdc,
    setIndustrialProcessesProductUseConditionalNdc,
  ] = useState<number>(0);
  const [
    industrialProcessesProductUseUnconditionalNdc,
    setIndustrialProcessesProductUseUnconditionalNdc,
  ] = useState<number>(0);

  const [agricultureForestryOtherLandUseBau, setAgricultureForestryOtherLandUseBau] =
    useState<number>(0);
  const [
    agricultureForestryOtherLandUseConditionalNdc,
    setAgricultureForestryOtherLandUseConditionalNdc,
  ] = useState<number>(0);
  const [
    agricultureForestryOtherLandUseUnconditionalNdc,
    setAgricultureForestryOtherLandUseUnconditionalNdc,
  ] = useState<number>(0);

  const [wasteBau, setWasteBau] = useState<number>(0);
  const [wasteConditionalNdc, setWasteConditionalNdc] = useState<number>(0);
  const [wasteUnconditionalNdc, setWasteUnconditionalNdc] = useState<number>(0);

  const [otherBau, setOtherBau] = useState<number>(0);
  const [otherConditionalNdc, setOtherConditionalNdc] = useState<number>(0);
  const [otherUnconditionalNdc, setOtherUnconditionalNdc] = useState<number>(0);

  const [totalCo2WithoutLandEmissions, setTotalCo2WithoutLandEmissions] = useState({
    totalCo2WithoutLand_bau: 0,
    totalCo2WithoutLand_conditionalNdc: 0,
    totalCo2WithoutLand_unconditionalNdc: 0
  });

  const [totalCo2WithLandEmissions, setTotalCo2WithLandEmissions] = useState({
    totalCo2WithLand_bau: 0,
    totalCo2WithLand_conditionalNdc: 0,
    totalCo2WithLand_unconditionalNdc: 0
  });

  const [isSavedFormDataSet, setIsSavedFormDataSet] = useState<boolean>(false);
  const [formDataVersion, setFormDataVersion] = useState(1);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const [openSaveFormModal, setOpenSaveFormModal] = useState(false);
  const [openFinalizeFormModal, setOpenFinalizeFormModal] = useState(false);
  const [openResetFormModal, setOpenResetFormModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>('');
  const [actionInfo, setActionInfo] = useState<any>({});

  const { Panel } = Collapse;
  const [form] = Form.useForm();

  const createSetFieldObject = (obj: any, objName: string) => {
    const result: any = {};

    for (const key in obj) {
      const energyEmissionsSub = obj[key];
      for (const childKey in energyEmissionsSub) {
        if (typeof energyEmissionsSub[childKey] === 'object') {
          for (const category in energyEmissionsSub) {
            const subcategory = energyEmissionsSub[category];

            for (const gas in subcategory) {
              result[`${key}_${category}_${gas}`] = !isNaN(subcategory[gas]) ? subcategory[gas] : 0;
            }
          }
        } else {
          for (const gas in energyEmissionsSub) {
            result[`${objName}_${key}_${gas}`] = !isNaN(energyEmissionsSub[gas]) ? energyEmissionsSub[gas] : 0;
          }
        }
      }
    }
    return result;
  };

  const validateExcelDataFormat = (sheet: any, excelData: any): boolean => {
    const sheetHeadings: any = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
    })[0];
    const columnHeadings = ['Sector', 'Business As Usual', 'Conditional NDC', 'Unconditional NDC'];

    if (!columnHeadings.every((element: any) => sheetHeadings.includes(element))) {
      return false;
    }

    const sectorValues = excelData.map((excelDataObj: any) => excelDataObj.Sector);

    if (!excelFields.every((element: any) => sectorValues.includes(element))) {
      return false;
    }

    return true;
  };

  const populateFormWithUploadedFile = (excelData: any, keyPrefix: string) => {
    const result: any = {};
    const emissions: any = {};
    for (const key in ProjectionTypes) {
      emissions[key] = excelData[ProjectionTypes[key]];
    }
    return (result[keyPrefix] = emissions);
  };

  const handleFileUploadData = (excelData: any) => {
    const result: any = {};
    excelData.forEach((excelDataObj: any) => {
      if (Object.keys(EmissionSectors).includes(excelDataObj.Sector)) {
        result[EmissionSectors[excelDataObj.Sector]] = populateFormWithUploadedFile(
          excelDataObj,
          EmissionSectors[excelDataObj.Sector]
        );
      }
    });
    const upData = {
      energyEmissions: {
        fuelCombustionActivities: {
          energyIndustries: result.energyIndustries,
          manufacturingIndustriesConstruction: result.manufacturingIndustriesConstruction,
          transport: result.transport,
          otherSectors: result.otherSectors,
          nonSpecified: result.nonSpecified,
        },
        fugitiveEmissionsFromFuels: {
          solidFuels: result.solidFuels,
          oilNaturalGas: result.oilNaturalGas,
          otherEmissionsEnergyProduction: result.otherEmissionsEnergyProduction,
        },
        carbonDioxideTransportStorage: {
          transportOfCo2: result.transportOfCo2,
          injectionStorage: result.injectionStorage,
          other: result.otherCarbonDioxideTransportStorage,
        },
      },
      industrialProcessesProductUse: {
        mineralIndustry: result.mineralIndustry,
        chemicalIndustry: result.chemicalIndustry,
        metalIndustry: result.metalIndustry,
        nonEnergyProductsFuelsSolventUse: result.nonEnergyProductsFuelsSolventUse,
        electronicsIndustry: result.electronicsIndustry,
        productUsesSubstOzoneDepletingSubs: result.productUsesSubstOzoneDepletingSubs,
        otherProductManufactureUse: result.otherProductManufactureUse,
        other: result.otherIndustrialProcessesProductUse,
      },
      agricultureForestryOtherLandUse: {
        livestock: result.livestock,
        land: result.land,
        aggregateNonCo2SourcesLand: result.aggregateNonCo2SourcesLand,
        other: result.otherAgricultureForestryOtherLandUse,
      },
      waste: {
        solidWasteDisposal: result.solidWasteDisposal,
        biologicalTreatmentSolidWaste: result.biologicalTreatmentSolidWaste,
        incinerationOpenBurningWaste: result.incinerationOpenBurningWaste,
        wastewaterTreatmentDischarge: result.wastewaterTreatmentDischarge,
        other: result.otherWaste,
      },
      other: {
        indirectN2oEmissions: result.indirectN2oEmissions,
        other: result.other,
      },
      totalCo2WithoutLand: result.totalCo2WithoutLand,
      totalCo2WithLand: result.totalCo2WithLand,
    };
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    setFormValues(upData);
  };


  useEffect(() => {
    const hasSaveState = data.some((item: any) => item.state === 'SAVED');
    setIsPendingFinalization(hasSaveState);
  }, [data, uploadedFileName]);

  function calculateSumEmissionView(obj: any, conditionType: string) {
    let sum = 0;
    for (const key in obj) {
      if (key === conditionType) {
        sum += (typeof obj[key] === "number") ? obj[key] : 0;
      } else if (
        typeof obj[key] === 'object' &&
        key !== 'totalCo2WithLand' &&
        key !== 'totalCo2WithoutLand'
      ) {
        const calculatedSum = calculateSumEmissionView(obj[key], conditionType)
        sum += (typeof calculatedSum === "number") ? calculatedSum : 0;
      }
    }
    return sum;
  }

  const onValuesChange = (changedValues: any, allValues: any) => {
    let initialValues = null;
    if (isPendingFinalization) {
      const savedData = data.filter((item: any) => item.state === 'SAVED');
      initialValues = savedData[0];
    }
    const currentValues = form.getFieldsValue(true);
    const isChanged = !(
      JSON.stringify(currentValues) === JSON.stringify(initialValues)
    );
    setIsFormChanged(isChanged);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const createSaveRequestPayload = async (fields: any, remarks: string, status: GHGRecordState) => {
    let requestBody: any = {};
    const savedEmission = {
      year: fields?.year.year(),
      energyEmissions: {
        fuelCombustionActivities: {
          energyIndustries: {
            bau: fields?.fuelCombustionActivities_energyIndustries_bau,
            conditionalNdc: fields?.fuelCombustionActivities_energyIndustries_conditionalNdc,
            unconditionalNdc: fields?.fuelCombustionActivities_energyIndustries_unconditionalNdc,
          },
          manufacturingIndustriesConstruction: {
            bau: fields?.fuelCombustionActivities_manufacturingIndustriesConstruction_bau,
            conditionalNdc: fields?.fuelCombustionActivities_manufacturingIndustriesConstruction_conditionalNdc,
            unconditionalNdc: fields?.fuelCombustionActivities_manufacturingIndustriesConstruction_unconditionalNdc,
          },
          transport: {
            bau: fields?.fuelCombustionActivities_transport_bau,
            conditionalNdc: fields?.fuelCombustionActivities_transport_conditionalNdc,
            unconditionalNdc: fields?.fuelCombustionActivities_transport_unconditionalNdc,
          },
          otherSectors: {
            bau: fields?.fuelCombustionActivities_otherSectors_bau,
            conditionalNdc: fields?.fuelCombustionActivities_otherSectors_conditionalNdc,
            unconditionalNdc: fields?.fuelCombustionActivities_otherSectors_unconditionalNdc,
          },
          nonSpecified: {
            bau: fields?.fuelCombustionActivities_nonSpecified_bau,
            conditionalNdc: fields?.fuelCombustionActivities_nonSpecified_conditionalNdc,
            unconditionalNdc: fields?.fuelCombustionActivities_nonSpecified_unconditionalNdc,
          },
        },
        fugitiveEmissionsFromFuels: {
          solidFuels: {
            bau: fields?.fugitiveEmissionsFromFuels_solidFuels_bau,
            conditionalNdc: fields?.fugitiveEmissionsFromFuels_solidFuels_conditionalNdc,
            unconditionalNdc: fields?.fugitiveEmissionsFromFuels_solidFuels_unconditionalNdc,
          },
          oilNaturalGas: {
            bau: fields?.fugitiveEmissionsFromFuels_oilNaturalGas_bau,
            conditionalNdc: fields?.fugitiveEmissionsFromFuels_oilNaturalGas_conditionalNdc,
            unconditionalNdc: fields?.fugitiveEmissionsFromFuels_oilNaturalGas_unconditionalNdc,
          },
          otherEmissionsEnergyProduction: {
            bau: fields?.fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_bau,
            conditionalNdc: fields?.fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_conditionalNdc,
            unconditionalNdc: fields?.fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_unconditionalNdc,
          },
        },
        carbonDioxideTransportStorage: {
          transportOfCo2: {
            bau: fields?.carbonDioxideTransportStorage_transportOfCo2_bau,
            conditionalNdc: fields?.carbonDioxideTransportStorage_transportOfCo2_conditionalNdc,
            unconditionalNdc: fields?.carbonDioxideTransportStorage_transportOfCo2_unconditionalNdc,
          },
          injectionStorage: {
            bau: fields?.carbonDioxideTransportStorage_injectionStorage_bau,
            conditionalNdc: fields?.carbonDioxideTransportStorage_injectionStorage_conditionalNdc,
            unconditionalNdc: fields?.carbonDioxideTransportStorage_injectionStorage_unconditionalNdc,
          },
          other: {
            bau: fields?.carbonDioxideTransportStorage_other_bau,
            conditionalNdc: fields?.carbonDioxideTransportStorage_other_conditionalNdc,
            unconditionalNdc: fields?.carbonDioxideTransportStorage_other_unconditionalNdc,
          },
        },
      },
      industrialProcessesProductUse: {
        mineralIndustry: {
          bau: fields?.industrialProcessesProductUse_mineralIndustry_bau,
          conditionalNdc: fields?.industrialProcessesProductUse_mineralIndustry_conditionalNdc,
          unconditionalNdc: fields?.industrialProcessesProductUse_mineralIndustry_unconditionalNdc,
        },
        chemicalIndustry: {
          bau: fields?.industrialProcessesProductUse_chemicalIndustry_bau,
          conditionalNdc: fields?.industrialProcessesProductUse_chemicalIndustry_conditionalNdc,
          unconditionalNdc: fields?.industrialProcessesProductUse_chemicalIndustry_unconditionalNdc,
        },
        metalIndustry: {
          bau: fields?.industrialProcessesProductUse_metalIndustry_bau,
          conditionalNdc: fields?.industrialProcessesProductUse_metalIndustry_conditionalNdc,
          unconditionalNdc: fields?.industrialProcessesProductUse_metalIndustry_unconditionalNdc,
        },
        nonEnergyProductsFuelsSolventUse: {
          bau: fields?.industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_bau,
          conditionalNdc: fields?.industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_conditionalNdc,
          unconditionalNdc: fields?.industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_unconditionalNdc,
        },
        electronicsIndustry: {
          bau: fields?.industrialProcessesProductUse_electronicsIndustry_bau,
          conditionalNdc: fields?.industrialProcessesProductUse_electronicsIndustry_conditionalNdc,
          unconditionalNdc: fields?.industrialProcessesProductUse_electronicsIndustry_unconditionalNdc,
        },
        productUsesSubstOzoneDepletingSubs: {
          bau: fields?.industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_bau,
          conditionalNdc: fields?.industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_conditionalNdc,
          unconditionalNdc: fields?.industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_unconditionalNdc,
        },
        otherProductManufactureUse: {
          bau: fields?.industrialProcessesProductUse_otherProductManufactureUse_bau,
          conditionalNdc: fields?.industrialProcessesProductUse_otherProductManufactureUse_conditionalNdc,
          unconditionalNdc: fields?.industrialProcessesProductUse_otherProductManufactureUse_unconditionalNdc,
        },
        other: {
          bau: fields?.industrialProcessesProductUse_other_bau,
          conditionalNdc: fields?.industrialProcessesProductUse_other_conditionalNdc,
          unconditionalNdc: fields?.industrialProcessesProductUse_other_unconditionalNdc,
        },
      },
      agricultureForestryOtherLandUse: {
        livestock: {
          bau: fields?.agricultureForestryOtherLandUse_livestock_bau,
          conditionalNdc: fields?.agricultureForestryOtherLandUse_livestock_conditionalNdc,
          unconditionalNdc: fields?.agricultureForestryOtherLandUse_livestock_unconditionalNdc,
        },
        land: {
          bau: fields?.agricultureForestryOtherLandUse_land_bau,
          conditionalNdc: fields?.agricultureForestryOtherLandUse_land_conditionalNdc,
          unconditionalNdc: fields?.agricultureForestryOtherLandUse_land_unconditionalNdc,
        },
        aggregateNonCo2SourcesLand: {
          bau: fields?.agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_bau,
          conditionalNdc: fields?.agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_conditionalNdc,
          unconditionalNdc: fields?.agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_unconditionalNdc,
        },
        other: {
          bau: fields?.agricultureForestryOtherLandUse_other_bau,
          conditionalNdc: fields?.agricultureForestryOtherLandUse_other_conditionalNdc,
          unconditionalNdc: fields?.agricultureForestryOtherLandUse_other_unconditionalNdc,
        },
      },
      waste: {
        solidWasteDisposal: {
          bau: fields?.waste_solidWasteDisposal_bau,
          conditionalNdc: fields?.waste_solidWasteDisposal_conditionalNdc,
          unconditionalNdc: fields?.waste_solidWasteDisposal_unconditionalNdc,
        },
        biologicalTreatmentSolidWaste: {
          bau: fields?.waste_biologicalTreatmentSolidWaste_bau,
          conditionalNdc: fields?.waste_biologicalTreatmentSolidWaste_conditionalNdc,
          unconditionalNdc: fields?.waste_biologicalTreatmentSolidWaste_unconditionalNdc,
        },
        incinerationOpenBurningWaste: {
          bau: fields?.waste_incinerationOpenBurningWaste_bau,
          conditionalNdc: fields?.waste_incinerationOpenBurningWaste_conditionalNdc,
          unconditionalNdc: fields?.waste_incinerationOpenBurningWaste_unconditionalNdc,
        },
        wastewaterTreatmentDischarge: {
          bau: fields?.waste_wastewaterTreatmentDischarge_bau,
          conditionalNdc: fields?.waste_wastewaterTreatmentDischarge_conditionalNdc,
          unconditionalNdc: fields?.waste_wastewaterTreatmentDischarge_unconditionalNdc,
        },
        other: {
          bau: fields?.waste_other_bau,
          conditionalNdc: fields?.waste_other_conditionalNdc,
          unconditionalNdc: fields?.waste_other_unconditionalNdc,
        },
      },
      other: {
        indirectN2oEmissions: {
          bau: fields?.other_indirectN2oEmissions_bau,
          conditionalNdc: fields?.other_indirectN2oEmissions_conditionalNdc,
          unconditionalNdc: fields?.other_indirectN2oEmissions_unconditionalNdc,
        },
        other: {
          bau: fields?.other_other_bau,
          conditionalNdc: fields?.other_other_conditionalNdc,
          unconditionalNdc: fields?.other_other_unconditionalNdc,
        },
      },
      totalCo2WithoutLand: {
        bau: fields?.totalCo2WithoutLand_bau,
        conditionalNdc: fields?.totalCo2WithoutLand_conditionalNdc,
        unconditionalNdc: fields?.totalCo2WithoutLand_unconditionalNdc,
      },
      totalCo2WithLand: {
        bau: fields?.totalCo2WithLand_bau,
        conditionalNdc: fields?.totalCo2WithLand_conditionalNdc,
        unconditionalNdc: fields?.totalCo2WithLand_unconditionalNdc,
      },
      state: status,
      remarks,
      version: formDataVersion,
    };
    requestBody = savedEmission;
    if (fields?.emissionsDocument) {
      const emissionImportBase64 = await getBase64(
        fields?.emissionsDocument[0]?.originFileObj as RcFile
      );
      if (emissionImportBase64?.length > 0) {
        requestBody.emissionDocument = emissionImportBase64;
      }
    }
    return requestBody;
  };

  const clearForm = () => {
    form.resetFields();

    setFuelCombustionActivitiesBau(0);
    setFuelCombustionActivitiesConditionalNdc(0);
    setFuelCombustionActivitiesUnconditionalNdc(0);

    setFugitiveEmissionsFromFuelsBau(0);
    setFugitiveEmissionsFromFuelsConditionalNdc(0);
    setFugitiveEmissionsFromFuelsUnconditionalNdc(0);

    setCarbonDioxideTransportStorageBau(0);
    setCarbonDioxideTransportStorageConditionalNdc(0);
    setCarbonDioxideTransportStorageUnconditionalNdc(0);

    setIndustrialProcessesProductUseBau(0);
    setIndustrialProcessesProductUseConditionalNdc(0);
    setIndustrialProcessesProductUseUnconditionalNdc(0);

    setAgricultureForestryOtherLandUseBau(0);
    setAgricultureForestryOtherLandUseConditionalNdc(0);
    setAgricultureForestryOtherLandUseUnconditionalNdc(0);

    setWasteBau(0);
    setWasteConditionalNdc(0);
    setWasteUnconditionalNdc(0);

    setOtherBau(0);
    setOtherConditionalNdc(0);
    setOtherUnconditionalNdc(0);
  }

  const resetForm = async () => {
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    await getProjectionData();
    setOpenResetFormModal(false);
    setIsSavedFormDataSet(false);
    clearUploadDoc();
    if (!isPendingFinalization) {
      clearForm();
    }
    message.open({
      type: 'success',
      content: t('ghgInventory:formCancelledSuccess'),
      duration: 4,
      style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
    });
  };

  const onResetFormCanceled = () => {
    setOpenResetFormModal(false);
  };

  const onOpenResetFormModel = () => {
    if (!isFormChanged) {
      message.open({
        type: 'error',
        content: t('ghgInventory:formNotChanged'),
        duration: 4,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
    } else {
      setActionInfo({
        action: `${t('ghgInventory:proceed')}`,
        headerText: `${t('ghgInventory:discardHeaderText')}`,
        type: 'danger',
        icon: <CloseCircleOutlined />,
      });
      setErrorMsg('');
      setOpenResetFormModal(true);
    }
  };

  const onSaveFormCanceled = () => {
    setOpenSaveFormModal(false);
  };

  const onOpenSaveFormModel = () => {
    const { year, ...rest } = form.getFieldsValue(true);
    const otherFieldsNegativeValue = Object.values(rest).some(value => {
      return typeof value === 'number' && value < 0;
    });
    form
      .validateFields()
      .then(values => {
        if (!isFormChanged) {
          message.open({
            type: 'error',
            content: t('ghgInventory:formNotChanged'),
            duration: 4,
            style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
          });
        } else {
          setActionInfo({
            action: `${t("ghgInventory:submit")}`,
            headerText: `${t("ghgInventory:submitModelHeader")}`,
            type: "primary",
            icon: <CheckCircleOutlined />,
          });
          setErrorMsg('');
          setOpenSaveFormModal(true);
        }
      })
      .catch(errorInfo => {
        if (otherFieldsNegativeValue) {
          message.open({
            type: 'error',
            content: t('ghgInventory:negativeValuesNotAllowed'),
            duration: 4,
            style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
          });
        }
      });
  };


  const onFinalizeFormCanceled = () => {
    setOpenFinalizeFormModal(false);
  };

  const onOpenFinalizeFormModel = () => {
    const { year, ...rest } = form.getFieldsValue(true);
    const otherFieldsEmpty = Object.values(rest).every(value => !value);
    const otherFieldsNegativeValue = Object.values(rest).some(value => {
      return typeof value === 'number' && value < 0;
    });
    form
      .validateFields()
      .then(values => {
        // Validation successful, set ActionInfo and open the form modal
        if (otherFieldsEmpty) {
          message.open({
            type: 'error',
            content: t('ghgInventory:cannotFinaliseEmpty'),
            duration: 4,
            style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
          });
        } else {
          setActionInfo({
            action: `${t("ghgInventory:finalize")}`,
            headerText: `${t("ghgInventory:finalizeModelHeader")}`,
            type: "primary",
            icon: <ClipboardCheck />,
          });
          setErrorMsg('');
          setOpenFinalizeFormModal(true);
        }
      })
      .catch(errorInfo => {
        // Validation failed
        if (otherFieldsNegativeValue) {
          message.open({
            type: 'error',
            content: t('ghgInventory:negativeValuesNotAllowed'),
            duration: 4,
            style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
          });
        }
        console.log('Validation failed:', errorInfo);
      });
  };

  const getProjectionData = async () => {
    setLoading(true);
    try {
      const response: any = await get('national/projections');
      console.log('Projection GET -> ', response);
      if (response?.data) {
        setData(response.data);
      }
    } catch (error: any) {
      console.log('Error in projection fetch - ', error);
      message.open({
        type: 'error',
        content: error?.message,
        duration: 4,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
    } finally {
      setIsFormChanged(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProjectionData();
    };

    fetchData();
  }, []);

  const onSubmitForm = async (remarks: string, status: GHGRecordState) => {
    const fields = form.getFieldsValue(true);
    const payload = await createSaveRequestPayload(fields, remarks, status);
    setLoading(true);
    try {
      const response: any = await post('national/projections', payload);
      console.log('Projections creation -> ', response);
      if (response?.statusText === 'SUCCESS') {
        setOpenSaveFormModal(false);
        let messageContent = response?.status == HttpStatusCode.Created ?
          t('ghgInventory:projectionCreationSuccess')
          : t('ghgInventory:projectionUpdateSuccess');

        if (status === GHGRecordState.FINALIZED) {
          clearUploadDoc();
          clearForm();
          messageContent = t('ghgInventory:projectionFinalizedSuccess');
        }
        setOpenFinalizeFormModal(false);
        message.open({
          type: 'success',
          content: messageContent,
          duration: 4,
          style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
        });
        clearUploadDoc();
        await getProjectionData();
      }
    } catch (error: any) {
      console.log('Error in projection creation - ', error);
      setOpenSaveFormModal(false);
      setOpenFinalizeFormModal(false);
      message.open({
        type: 'error',
        content: error?.message,
        duration: 4,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
      if (error.status === HttpStatusCode.Conflict.valueOf()) {
        await getProjectionData();
        setIsSavedFormDataSet(false);
        clearUploadDoc();
        if (!isPendingFinalization) {
          clearForm();
        }
      } else if (error.status === HttpStatusCode.Forbidden.valueOf()) {
        clearUploadDoc();
        clearForm();
        await getProjectionData();
      }
    } finally {
      // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
      setIsFormChanged(false);
      setLoading(false);
    }
  };


  const setFormValues = (projectionObject: any) => {
    if (projectionObject.year) {
      form.setFieldsValue({ year: moment(projectionObject.year, 'YYYY') });
    }
    form.setFieldsValue(createSetFieldObject(projectionObject.energyEmissions, 'energyEmissions'));
    form.setFieldsValue(
      createSetFieldObject(
        projectionObject.industrialProcessesProductUse,
        'industrialProcessesProductUse'
      )
    );
    form.setFieldsValue(
      createSetFieldObject(
        projectionObject.agricultureForestryOtherLandUse,
        'agricultureForestryOtherLandUse'
      )
    );
    form.setFieldsValue(createSetFieldObject(projectionObject.waste, 'waste'));
    form.setFieldsValue(createSetFieldObject(projectionObject.other, 'other'));
    form.setFieldsValue({
      totalCo2WithoutLand_bau: projectionObject.totalCo2WithoutLand.bau,
      totalCo2WithoutLand_conditionalNdc: projectionObject.totalCo2WithoutLand.conditionalNdc,
      totalCo2WithoutLand_unconditionalNdc: projectionObject.totalCo2WithoutLand.unconditionalNdc,
    });
    form.setFieldsValue({
      totalCo2WithLand_bau: projectionObject.totalCo2WithLand.bau,
      totalCo2WithLand_conditionalNdc: projectionObject.totalCo2WithLand.conditionalNdc,
      totalCo2WithLand_unconditionalNdc: projectionObject.totalCo2WithLand.unconditionalNdc,
    });

    setFuelCombustionActivitiesBau(
      calculateSumEmissionView(projectionObject?.energyEmissions.fuelCombustionActivities, 'bau')
    );
    setFuelCombustionActivitiesConditionalNdc(
      calculateSumEmissionView(
        projectionObject?.energyEmissions.fuelCombustionActivities,
        'conditionalNdc'
      )
    );
    setFuelCombustionActivitiesUnconditionalNdc(
      calculateSumEmissionView(
        projectionObject?.energyEmissions.fuelCombustionActivities,
        'unconditionalNdc'
      )
    );

    setFugitiveEmissionsFromFuelsBau(
      calculateSumEmissionView(projectionObject?.energyEmissions.fugitiveEmissionsFromFuels, 'bau')
    );
    setFugitiveEmissionsFromFuelsConditionalNdc(
      calculateSumEmissionView(
        projectionObject?.energyEmissions.fugitiveEmissionsFromFuels,
        'conditionalNdc'
      )
    );
    setFugitiveEmissionsFromFuelsUnconditionalNdc(
      calculateSumEmissionView(
        projectionObject?.energyEmissions.fugitiveEmissionsFromFuels,
        'unconditionalNdc'
      )
    );

    setCarbonDioxideTransportStorageBau(
      calculateSumEmissionView(
        projectionObject?.energyEmissions.carbonDioxideTransportStorage,
        'bau'
      )
    );
    setCarbonDioxideTransportStorageConditionalNdc(
      calculateSumEmissionView(
        projectionObject?.energyEmissions.carbonDioxideTransportStorage,
        'conditionalNdc'
      )
    );
    setCarbonDioxideTransportStorageUnconditionalNdc(
      calculateSumEmissionView(
        projectionObject?.energyEmissions.carbonDioxideTransportStorage,
        'unconditionalNdc'
      )
    );

    setIndustrialProcessesProductUseBau(
      calculateSumEmissionView(projectionObject?.industrialProcessesProductUse, 'bau')
    );
    setIndustrialProcessesProductUseConditionalNdc(
      calculateSumEmissionView(projectionObject?.industrialProcessesProductUse, 'conditionalNdc')
    );
    setIndustrialProcessesProductUseUnconditionalNdc(
      calculateSumEmissionView(projectionObject?.industrialProcessesProductUse, 'unconditionalNdc')
    );

    setAgricultureForestryOtherLandUseBau(
      calculateSumEmissionView(projectionObject?.agricultureForestryOtherLandUse, 'bau')
    );
    setAgricultureForestryOtherLandUseConditionalNdc(
      calculateSumEmissionView(projectionObject?.agricultureForestryOtherLandUse, 'conditionalNdc')
    );
    setAgricultureForestryOtherLandUseUnconditionalNdc(
      calculateSumEmissionView(
        projectionObject?.agricultureForestryOtherLandUse,
        'unconditionalNdc'
      )
    );

    setWasteBau(
      calculateSumEmissionView(projectionObject?.waste, 'bau')
    );
    setWasteConditionalNdc(
      calculateSumEmissionView(projectionObject?.waste, 'conditionalNdc')
    );
    setWasteUnconditionalNdc(
      calculateSumEmissionView(projectionObject?.waste, 'unconditionalNdc')
    );

    setOtherBau(
      calculateSumEmissionView(projectionObject?.other, 'bau')
    );
    setOtherConditionalNdc(
      calculateSumEmissionView(projectionObject?.other, 'conditionalNdc')
    );
    setOtherUnconditionalNdc(
      calculateSumEmissionView(projectionObject?.other, 'unconditionalNdc')
    );

    setIsSavedFormDataSet(true);
  };

  useEffect(() => {
    const savedData = data.filter((item: any) => item.state === 'SAVED');
    if (!isSavedFormDataSet) {
      if (savedData && savedData.length > 0) {
        setFormValues(savedData[0]);
      }
    }
    if (savedData && savedData.length > 0) {
      setFormDataVersion(savedData[0].version);
    }
    const years: number[] = data
      .filter((item: any) => !(item.state === 'SAVED' && item.year)) // Filter out items where state is not 'SAVED'
      .map((item: any) => parseInt(item.year));

    // Update 'disabledYears' only if 'years' array has changed
    setDisabledYears((prevYears) => {
      if (JSON.stringify(prevYears) !== JSON.stringify(years)) {
        return years;
      }
      return prevYears;
    });
  }, [data]);

  const checkFile = (file: File) => {
    const isXLSX =
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel';
    if (!isXLSX) {
      console.log('You can only upload XLSX file!');
    }
    return isXLSX;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const clearUploadDoc = () => {
    setUploadedFileName('');
    form.setFieldsValue({
      emissionsDocument: null,
    });
  };

  const handleYearChange = (date: any, dateString: string) => {
    setSelectedYear(dateString);
  };

  const isYearDisabled = (current: any) => {
    return disabledYears.includes(current.year());
  };

  useEffect(() => {
    setEnergyEmissionsBau(
      fuelCombustionActivitiesBau + fugitiveEmissionsFromFuelsBau + carbonDioxideTransportStorageBau
    );
  }, [
    fuelCombustionActivitiesBau,
    fugitiveEmissionsFromFuelsBau,
    carbonDioxideTransportStorageBau,
  ]);

  useEffect(() => {
    setTotalNationalBau(
      energyEmissionsBau +
      industrialProcessesProductUseBau +
      agricultureForestryOtherLandUseBau +
      wasteBau +
      otherBau
    );
  }, [
    energyEmissionsBau +
    industrialProcessesProductUseBau +
    agricultureForestryOtherLandUseBau +
    wasteBau +
    otherBau,
  ]);

  useEffect(() => {
    setEnergyEmissionsConditionalNdc(
      fuelCombustionActivitiesConditionalNdc +
      fugitiveEmissionsFromFuelsConditionalNdc +
      carbonDioxideTransportStorageConditionalNdc
    );
  }, [
    fuelCombustionActivitiesConditionalNdc,
    fugitiveEmissionsFromFuelsConditionalNdc,
    carbonDioxideTransportStorageConditionalNdc,
  ]);

  useEffect(() => {
    setTotalNationalConditionalNdc(
      energyEmissionsConditionalNdc +
      industrialProcessesProductUseConditionalNdc +
      agricultureForestryOtherLandUseConditionalNdc +
      wasteConditionalNdc +
      otherConditionalNdc
    );
  }, [
    energyEmissionsConditionalNdc +
    industrialProcessesProductUseConditionalNdc +
    agricultureForestryOtherLandUseConditionalNdc +
    wasteConditionalNdc +
    otherConditionalNdc,
  ]);

  useEffect(() => {
    setEnergyEmissionsUnconditionalNdc(
      fuelCombustionActivitiesUnconditionalNdc +
      fugitiveEmissionsFromFuelsUnconditionalNdc +
      carbonDioxideTransportStorageUnconditionalNdc
    );
  }, [
    fuelCombustionActivitiesUnconditionalNdc,
    fugitiveEmissionsFromFuelsUnconditionalNdc,
    carbonDioxideTransportStorageUnconditionalNdc,
  ]);

  useEffect(() => {
    setTotalNationalUnconditionalNdc(
      energyEmissionsUnconditionalNdc +
      industrialProcessesProductUseUnconditionalNdc +
      agricultureForestryOtherLandUseUnconditionalNdc +
      wasteUnconditionalNdc +
      otherUnconditionalNdc
    );
  }, [
    energyEmissionsUnconditionalNdc +
    industrialProcessesProductUseUnconditionalNdc +
    agricultureForestryOtherLandUseUnconditionalNdc +
    wasteUnconditionalNdc +
    otherUnconditionalNdc,
  ]);

  const getBauSum = (panelHeading: any) => {
    switch (panelHeading) {
      case 'energyEmissions':
        return energyEmissionsBau;
      case 'fuelCombustionActivities':
        return fuelCombustionActivitiesBau;
      case 'fugitiveEmissionsFromFuels':
        return fugitiveEmissionsFromFuelsBau;
      case 'carbonDioxideTransportStorage':
        return carbonDioxideTransportStorageBau;
      case 'industrialProcessesProductUse':
        return industrialProcessesProductUseBau;
      case 'agricultureForestryOtherLandUse':
        return agricultureForestryOtherLandUseBau;
      case 'waste':
        return wasteBau;
      case 'other':
        return otherBau;
      default:
        return 0;
    }
  };

  const getConditionalNdcSum = (panelHeading: any) => {
    switch (panelHeading) {
      case 'energyEmissions':
        return energyEmissionsConditionalNdc;
      case 'fuelCombustionActivities':
        return fuelCombustionActivitiesConditionalNdc;
      case 'fugitiveEmissionsFromFuels':
        return fugitiveEmissionsFromFuelsConditionalNdc;
      case 'carbonDioxideTransportStorage':
        return carbonDioxideTransportStorageConditionalNdc;
      case 'industrialProcessesProductUse':
        return industrialProcessesProductUseConditionalNdc;
      case 'agricultureForestryOtherLandUse':
        return agricultureForestryOtherLandUseConditionalNdc;
      case 'waste':
        return wasteConditionalNdc;
      case 'other':
        return otherConditionalNdc;
      default:
        return 0;
    }
  };

  const getUnconditionalNdcSum = (panelHeading: any) => {
    switch (panelHeading) {
      case 'energyEmissions':
        return energyEmissionsUnconditionalNdc;
      case 'fuelCombustionActivities':
        return fuelCombustionActivitiesUnconditionalNdc;
      case 'fugitiveEmissionsFromFuels':
        return fugitiveEmissionsFromFuelsUnconditionalNdc;
      case 'carbonDioxideTransportStorage':
        return carbonDioxideTransportStorageUnconditionalNdc;
      case 'industrialProcessesProductUse':
        return industrialProcessesProductUseUnconditionalNdc;
      case 'agricultureForestryOtherLandUse':
        return agricultureForestryOtherLandUseUnconditionalNdc;
      case 'waste':
        return wasteUnconditionalNdc;
      case 'other':
        return otherUnconditionalNdc;
      default:
        return 0;
    }
  };

  const calculateSumBau = (event: any, panelHeading: any) => {
    const formValues = form.getFieldsValue();

    if (panelHeading === 'fuelCombustionActivities') {
      const sum =
        (formValues.fuelCombustionActivities_energyIndustries_bau || 0) +
        (formValues.fuelCombustionActivities_manufacturingIndustriesConstruction_bau || 0) +
        (formValues.fuelCombustionActivities_transport_bau || 0) +
        (formValues.fuelCombustionActivities_otherSectors_bau || 0) +
        (formValues.fuelCombustionActivities_nonSpecified_bau || 0);
      console.log('sum triggered', sum);
      setFuelCombustionActivitiesBau(sum);
    }
    if (panelHeading === 'fugitiveEmissionsFromFuels') {
      const sum =
        (formValues.fugitiveEmissionsFromFuels_solidFuels_bau || 0) +
        (formValues.fugitiveEmissionsFromFuels_oilNaturalGas_bau || 0) +
        (formValues.fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_bau || 0);
      setFugitiveEmissionsFromFuelsBau(sum);
    }
    if (panelHeading === 'carbonDioxideTransportStorage') {
      const sum =
        (formValues.carbonDioxideTransportStorage_transportOfCo2_bau || 0) +
        (formValues.carbonDioxideTransportStorage_injectionStorage_bau || 0) +
        (formValues.carbonDioxideTransportStorage_other_bau || 0);
      setCarbonDioxideTransportStorageBau(sum);
    }
    if (panelHeading === 'industrialProcessesProductUse') {
      const sum =
        (formValues.industrialProcessesProductUse_mineralIndustry_bau || 0) +
        (formValues.industrialProcessesProductUse_chemicalIndustry_bau || 0) +
        (formValues.industrialProcessesProductUse_metalIndustry_bau || 0) +
        (formValues.industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_bau || 0) +
        (formValues.industrialProcessesProductUse_electronicsIndustry_bau || 0) +
        (formValues.industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_bau || 0) +
        (formValues.industrialProcessesProductUse_otherProductManufactureUse_bau || 0) +
        (formValues.industrialProcessesProductUse_other_bau || 0);
      setIndustrialProcessesProductUseBau(sum);
    }
    if (panelHeading === 'agricultureForestryOtherLandUse') {
      const sum =
        (formValues.agricultureForestryOtherLandUse_livestock_bau || 0) +
        (formValues.agricultureForestryOtherLandUse_land_bau || 0) +
        (formValues.agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_bau || 0) +
        (formValues.agricultureForestryOtherLandUse_other_bau || 0);
      setAgricultureForestryOtherLandUseBau(sum);
    }
    if (panelHeading === 'waste') {
      const sum =
        (formValues.waste_solidWasteDisposal_bau || 0) +
        (formValues.waste_biologicalTreatmentSolidWaste_bau || 0) +
        (formValues.waste_incinerationOpenBurningWaste_bau || 0) +
        (formValues.waste_wastewaterTreatmentDischarge_bau || 0) +
        (formValues.waste_other_bau || 0);
      setWasteBau(sum);
    }
    if (panelHeading === 'other') {
      const sum =
        (formValues.other_indirectN2oEmissions_bau || 0) + (formValues.other_other_bau || 0);
      setOtherBau(sum);
    }
    return 0;
  };

  const calculateSumConditionalNdc = (event: any, panelHeading: any) => {
    const formValues = form.getFieldsValue();

    if (panelHeading === 'fuelCombustionActivities') {
      const sum =
        (formValues.fuelCombustionActivities_energyIndustries_conditionalNdc || 0) +
        (formValues.fuelCombustionActivities_manufacturingIndustriesConstruction_conditionalNdc ||
          0) +
        (formValues.fuelCombustionActivities_transport_conditionalNdc || 0) +
        (formValues.fuelCombustionActivities_otherSectors_conditionalNdc || 0) +
        (formValues.fuelCombustionActivities_nonSpecified_conditionalNdc || 0);
      setFuelCombustionActivitiesConditionalNdc(sum);
    }
    if (panelHeading === 'fugitiveEmissionsFromFuels') {
      const sum =
        (formValues.fugitiveEmissionsFromFuels_solidFuels_conditionalNdc || 0) +
        (formValues.fugitiveEmissionsFromFuels_oilNaturalGas_conditionalNdc || 0) +
        (formValues.fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_conditionalNdc || 0);
      setFugitiveEmissionsFromFuelsConditionalNdc(sum);
    }
    if (panelHeading === 'carbonDioxideTransportStorage') {
      const sum =
        (formValues.carbonDioxideTransportStorage_transportOfCo2_conditionalNdc || 0) +
        (formValues.carbonDioxideTransportStorage_injectionStorage_conditionalNdc || 0) +
        (formValues.carbonDioxideTransportStorage_other_conditionalNdc || 0);
      setCarbonDioxideTransportStorageConditionalNdc(sum);
    }
    if (panelHeading === 'industrialProcessesProductUse') {
      const sum =
        (formValues.industrialProcessesProductUse_mineralIndustry_conditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_chemicalIndustry_conditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_metalIndustry_conditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_conditionalNdc ||
          0) +
        (formValues.industrialProcessesProductUse_electronicsIndustry_conditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_conditionalNdc ||
          0) +
        (formValues.industrialProcessesProductUse_otherProductManufactureUse_conditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_other_conditionalNdc || 0);
      setIndustrialProcessesProductUseConditionalNdc(sum);
    }
    if (panelHeading === 'agricultureForestryOtherLandUse') {
      const sum =
        (formValues.agricultureForestryOtherLandUse_livestock_conditionalNdc || 0) +
        (formValues.agricultureForestryOtherLandUse_land_conditionalNdc || 0) +
        (formValues.agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_conditionalNdc ||
          0) +
        (formValues.agricultureForestryOtherLandUse_other_conditionalNdc || 0);
      setAgricultureForestryOtherLandUseConditionalNdc(sum);
    }
    if (panelHeading === 'waste') {
      const sum =
        (formValues.waste_solidWasteDisposal_conditionalNdc || 0) +
        (formValues.waste_biologicalTreatmentSolidWaste_conditionalNdc || 0) +
        (formValues.waste_incinerationOpenBurningWaste_conditionalNdc || 0) +
        (formValues.waste_wastewaterTreatmentDischarge_conditionalNdc || 0) +
        (formValues.waste_other_conditionalNdc || 0);
      setWasteConditionalNdc(sum);
    }
    if (panelHeading === 'other') {
      const sum =
        (formValues.other_indirectN2oEmissions_conditionalNdc || 0) +
        (formValues.other_other_conditionalNdc || 0);
      setOtherConditionalNdc(sum);
    }
    return 0;
  };

  const calculateSumUnconditionalNdc = (event: any, panelHeading: any) => {
    const formValues = form.getFieldsValue();

    if (panelHeading === 'fuelCombustionActivities') {
      const sum =
        (formValues.fuelCombustionActivities_energyIndustries_unconditionalNdc || 0) +
        (formValues.fuelCombustionActivities_manufacturingIndustriesConstruction_unconditionalNdc ||
          0) +
        (formValues.fuelCombustionActivities_transport_unconditionalNdc || 0) +
        (formValues.fuelCombustionActivities_otherSectors_unconditionalNdc || 0) +
        (formValues.fuelCombustionActivities_nonSpecified_unconditionalNdc || 0);
      setFuelCombustionActivitiesUnconditionalNdc(sum);
    }
    if (panelHeading === 'fugitiveEmissionsFromFuels') {
      const sum =
        (formValues.fugitiveEmissionsFromFuels_solidFuels_unconditionalNdc || 0) +
        (formValues.fugitiveEmissionsFromFuels_oilNaturalGas_unconditionalNdc || 0) +
        (formValues.fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_unconditionalNdc ||
          0);
      setFugitiveEmissionsFromFuelsUnconditionalNdc(sum);
    }
    if (panelHeading === 'carbonDioxideTransportStorage') {
      const sum =
        (formValues.carbonDioxideTransportStorage_transportOfCo2_unconditionalNdc || 0) +
        (formValues.carbonDioxideTransportStorage_injectionStorage_unconditionalNdc || 0) +
        (formValues.carbonDioxideTransportStorage_other_unconditionalNdc || 0);
      setCarbonDioxideTransportStorageUnconditionalNdc(sum);
    }
    if (panelHeading === 'industrialProcessesProductUse') {
      const sum =
        (formValues.industrialProcessesProductUse_mineralIndustry_unconditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_chemicalIndustry_unconditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_metalIndustry_unconditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_unconditionalNdc ||
          0) +
        (formValues.industrialProcessesProductUse_electronicsIndustry_unconditionalNdc || 0) +
        (formValues.industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_unconditionalNdc ||
          0) +
        (formValues.industrialProcessesProductUse_otherProductManufactureUse_unconditionalNdc ||
          0) +
        (formValues.industrialProcessesProductUse_other_unconditionalNdc || 0);
      setIndustrialProcessesProductUseUnconditionalNdc(sum);
    }
    if (panelHeading === 'agricultureForestryOtherLandUse') {
      const sum =
        (formValues.agricultureForestryOtherLandUse_livestock_unconditionalNdc || 0) +
        (formValues.agricultureForestryOtherLandUse_land_unconditionalNdc || 0) +
        (formValues.agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_unconditionalNdc ||
          0) +
        (formValues.agricultureForestryOtherLandUse_other_unconditionalNdc || 0);
      setAgricultureForestryOtherLandUseUnconditionalNdc(sum);
    }
    if (panelHeading === 'waste') {
      const sum =
        (formValues.waste_solidWasteDisposal_unconditionalNdc || 0) +
        (formValues.waste_biologicalTreatmentSolidWaste_unconditionalNdc || 0) +
        (formValues.waste_incinerationOpenBurningWaste_unconditionalNdc || 0) +
        (formValues.waste_wastewaterTreatmentDischarge_unconditionalNdc || 0) +
        (formValues.waste_other_unconditionalNdc || 0);
      setWasteUnconditionalNdc(sum);
    }
    if (panelHeading === 'other') {
      const sum =
        (formValues.other_indirectN2oEmissions_unconditionalNdc || 0) +
        (formValues.other_other_unconditionalNdc || 0);
      setOtherUnconditionalNdc(sum);
    }
    return 0;
  };

  const handleTotalCo2WithoutLandEmissions = (field: any, value: any) => {
    setTotalCo2WithoutLandEmissions(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleTotalCo2WithLandEmissions = (field: any, value: any) => {
    setTotalCo2WithLandEmissions(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Helper function to get form field value
  const getFieldValue = (fieldName: string) => {
    const formValues = form.getFieldsValue(true);
    const fieldValue = formValues[fieldName];
    return (fieldValue && fieldValue >= 0) ? addCommSep(Number(fieldValue)) : fieldValue;
  };

  const renderPanelHeader = (panelHeading: any) => (
    <Row gutter={16}>
      <Col xl={12} md={12} className="panel-header-col">
        <span>{t(`ghgInventory:${panelHeading}`)}</span>
      </Col>
      <Col xl={9} md={9} className="panel-header-emission-value-col">
        <Row gutter={16}>
          <Col xl={7}>
            <Tooltip title={addCommSep(Number(getBauSum(panelHeading)))}>
              <div className="co2-total-pill">{addCommSep(Number(getBauSum(panelHeading)))}</div>
            </Tooltip>
          </Col>
          <Col xl={7}>
            <Tooltip title={addCommSep(Number(getConditionalNdcSum(panelHeading)))}>
              <div className="ch4-total-pill">{addCommSep(Number(getConditionalNdcSum(panelHeading)))}</div>
            </Tooltip>
          </Col>
          <Col xl={7}>
            <Tooltip title={addCommSep(Number(getUnconditionalNdcSum(panelHeading)))}>
              <div className="n2o-total-pill">{addCommSep(Number(getUnconditionalNdcSum(panelHeading)))}</div>
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  const renderPanelHeaderView = (panelHeading: any, tabData: any) => {
    const projectionObject = tabData[panelHeading];

    return (
      <Row gutter={16}>
        <Col xl={12} md={12} className="panel-header-col">
          <span>{t(`ghgInventory:${panelHeading}`)}</span>
        </Col>
        <Col xl={9} md={9}>
          <Row gutter={16} className="panel-header-emission-value-col">
            <Col xl={7}>
              <Tooltip title={addCommSep(Number(calculateSumEmissionView(projectionObject, 'bau')))}>
                <div className="co2-total-pill">
                  {addCommSep(Number(calculateSumEmissionView(projectionObject, 'bau')))}
                </div>
              </Tooltip>
            </Col>
            <Col xl={7}>
              <Tooltip title={addCommSep(Number(calculateSumEmissionView(projectionObject, 'conditionalNdc')))}>
                <div className="ch4-total-pill">
                  {addCommSep(Number(calculateSumEmissionView(projectionObject, 'conditionalNdc')))}
                </div>
              </Tooltip>
            </Col>
            <Col xl={7}>
              <Tooltip title={addCommSep(Number(calculateSumEmissionView(projectionObject, 'unconditionalNdc')))}>
                <div className="n2o-total-pill">
                  {addCommSep(Number(calculateSumEmissionView(projectionObject, 'unconditionalNdc')))}
                </div>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const renderPanelContent = (panelHeading: any, item: any, index: any) => (
    <Row gutter={16} key={index} className="panel-content-row">
      <Col xl={12} md={12} className="panel-content-title">
        <span>{t(`ghgInventory:${item}`)}</span>
      </Col>
      <Col xl={9} md={9}>
        <Row gutter={16} className="panel-content-input-box-row">
          <Col xl={7}>
            <Tooltip title={getFieldValue(panelHeading + '_' + item + '_bau')}>
              <Form.Item
                name={panelHeading + '_' + item + '_bau'}
                rules={[
                  {
                    validator: async (rule, value) => {
                      if (value && value < 0) {
                        throw new Error();
                      }
                    },
                  },
                ]}
              >
                <InputNumber onChange={(event) => calculateSumBau(event, panelHeading)}
                  disabled={userInfoState?.userRole === Role.ViewOnly} />
              </Form.Item>
            </Tooltip>
          </Col>
          <Col xl={7}>
            <Tooltip title={getFieldValue(panelHeading + '_' + item + '_conditionalNdc')}>
              <Form.Item
                name={panelHeading + '_' + item + '_conditionalNdc'}
                rules={[
                  {
                    validator: async (rule, value) => {
                      if (value && value < 0) {
                        throw new Error();
                      }
                    },
                  },
                ]}
              >
                <InputNumber onChange={(event) => calculateSumConditionalNdc(event, panelHeading)}
                  disabled={userInfoState?.userRole === Role.ViewOnly}
                />
              </Form.Item>
            </Tooltip>
          </Col>
          <Col xl={7}>
            <Tooltip title={getFieldValue(panelHeading + '_' + item + '_unconditionalNdc')}>
              <Form.Item
                name={panelHeading + '_' + item + '_unconditionalNdc'}
                rules={[
                  {
                    validator: async (rule, value) => {
                      if (value && value < 0) {
                        throw new Error();
                      }
                    },
                  },
                ]}
              >
                <InputNumber
                  onChange={(event) => calculateSumUnconditionalNdc(event, panelHeading)}
                  disabled={userInfoState?.userRole === Role.ViewOnly}
                />
              </Form.Item>
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  const renderPanelContentView = (
    bau: any,
    conditionalNdc: any,
    unconditionalNdc: any,
    item: any,
    index: any
  ) => {
    return (
      <Row gutter={16} key={index} className="panel-content-row">
        <Col xl={12} md={12} className="panel-content-title">
          <span>{t(`ghgInventory:${item}`)}</span>
        </Col>
        <Col xl={9} md={9}>
          <Row gutter={16} className="panel-content-input-box-row">
            <Col xl={7}>
              <Tooltip title={bau ? addCommSep(Number(bau)) : bau}>
                <div>
                  <InputNumber value={bau ? addCommSep(Number(bau)) : bau} disabled />
                </div>
              </Tooltip>
            </Col>
            <Col xl={7}>
              <Tooltip title={conditionalNdc ? addCommSep(Number(conditionalNdc)) : conditionalNdc}>
                <div>
                  <InputNumber value={conditionalNdc ? addCommSep(Number(conditionalNdc)) : conditionalNdc} disabled />
                </div>
              </Tooltip>
            </Col>
            <Col xl={7}>
              <Tooltip title={unconditionalNdc ? addCommSep(Number(unconditionalNdc)) : unconditionalNdc}>
                <div>
                  <InputNumber value={unconditionalNdc ? addCommSep(Number(unconditionalNdc)) : unconditionalNdc} disabled />
                </div>
              </Tooltip>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };


  const objectToCSV = (dataToDownload: any) => {
    const flattenObject = (obj: any, prefix = '') => {
      return Object.keys(obj).reduce((acc: any, key) => {
        const pre: any = prefix.length ? `${prefix}_` : '';
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(acc, flattenObject(obj[key], pre + key));
        } else {
          acc[pre + key] = obj[key];
        }
        return acc;
      }, {});
    };

    const headers: any[] = [];
    const contentKeys: any[] = [];


    const flattenedObj = flattenObject(dataToDownload);
    const objKeys: any = Object.keys(flattenedObj);

    for (const key in projectionsCsvFieldMap) {
      if (objKeys.includes(key)) {
        headers.push(projectionsCsvFieldMap[key])
        contentKeys.push(key);
      }
    }

    const flattenedData = [dataToDownload].map((item) => {
      const flattened: any = flattenObject(item);
      return contentKeys.map((header: any) => flattened[header]);
    });

    const allHeaders = [...headers, ...totalProjectionFields]
    const totalEmissionValues = [
      calculateSumEmissionView(dataToDownload, 'bau'),
      calculateSumEmissionView(dataToDownload, 'conditionalNdc'),
      calculateSumEmissionView(dataToDownload, 'unconditionalNdc')
    ];
    const combinedData = [...flattenedData[0], totalEmissionValues];

    const csvContent =
      allHeaders.map((header) => `"${header}"`).join(',') +
      '\n' +
      combinedData.map((value) => (value === undefined || value === null) ? "" : value).join(',');

    return csvContent;
  };

  const downloadCSV = (dataToDownload: any) => {
    const csvContent = objectToCSV(dataToDownload);
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GHG-Reporting-Projections_${dataToDownload.year}_V${dataToDownload.version}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const isRowDataEmpty = (projectionDataObj: any) => {
    if (projectionDataObj == undefined || projectionDataObj == null) {
      return true;
    }

    const bau = projectionDataObj?.bau;
    const conditionalNdc = projectionDataObj?.conditionalNdc;
    const unconditionalNdc = projectionDataObj?.unconditionalNdc;

    if (!bau && !conditionalNdc && !unconditionalNdc) {
      return true;
    }

    return false;
  }

  const isSectionDataEmpty = (sectionTotalBau: number, sectionTotalConditionalNdc: number, sectionTotalUnconditionalNdc: number) => {
    if (!sectionTotalBau && !sectionTotalConditionalNdc && !sectionTotalUnconditionalNdc) {
      return true;
    }

    return false;
  }

  const displayEmptyView = () => {
    if (!data || data.length === 0) {
      if (userInfoState?.companyRole !== CompanyRole.GOVERNMENT && userInfoState?.companyRole !== CompanyRole.MINISTRY) {
        return true;
      } else if (userInfoState?.userRole === Role.ViewOnly) {
        return true;
      }
    }
    return false;
  }

  const canViewForm = () => {
    if (userInfoState?.companyRole === CompanyRole.GOVERNMENT || userInfoState?.companyRole === CompanyRole.MINISTRY) {
      if (userInfoState?.userRole === Role.ViewOnly && data.some((item: any) => item.state === 'SAVED')) {
        return true;
      } else if (userInfoState?.userRole !== Role.ViewOnly) {
        return true;
      }
    }
    return false
  }

  return (
    <div>
      <div className="content-container projection-tab-container">
        <div className="projection-title-bar">
          <div className="title-bar">
            <div className="body-title">{t(`ghgInventory:projections`)}</div>
            <div className="body-sub-title">{t(`ghgInventory:totalNationalEmissionSubTitle`)}</div>
          </div>
        </div>
        {(displayEmptyView()) && (
          <div className="content-card empty-emission-container">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span>
                  {t("ghgInventory:noProjections")}
                </span>
              } />
          </div>
        )}
        {(!displayEmptyView()) && (
          <div className="content-card add-projection">
            <Tabs defaultActiveKey="Add New" centered>
              {(canViewForm()) && (
                <Tabs.TabPane key="Add New" tab={t(`ghgInventory:addNew`)}>
                  <div>
                    <Form
                      labelCol={{ span: 20 }}
                      wrapperCol={{ span: 24 }}
                      name="add-projection"
                      className="programme-details-form"
                      layout="vertical"
                      requiredMark={true}
                      form={form}
                      onValuesChange={onValuesChange}
                      onFinish={onOpenSaveFormModel}
                    >
                      <Row>
                        <Col xl={12} md={12} className="add-new-year-picker-col">
                          <div>
                            <Form.Item
                              label={t("ghgInventory:year")}
                              name="year"
                              rules={[
                                {
                                  required: true,
                                  message: "",
                                },
                                {
                                  validator: async (rule, value) => {
                                    if (
                                      String(value).trim() === "" ||
                                      String(value).trim() === undefined ||
                                      value === null ||
                                      value === undefined
                                    ) {
                                      throw new Error(
                                        `${t("ghgInventory:year")} ${t(
                                          "isRequired"
                                        )}`
                                      );
                                    }
                                  },
                                },
                              ]}
                            >
                              <DatePicker
                                onChange={handleYearChange}
                                picker="year"
                                disabledDate={isYearDisabled}
                                size="large"
                                disabled={isPendingFinalization}
                              />
                            </Form.Item>
                          </div>
                        </Col>
                        <Col xl={12} md={12} className="add-new-upload-file-col">
                          <Row className="add-new-upload-file-label">{t(`ghgInventory:emissionRemovalDocument`)}</Row>
                          <Row>
                            <Col xxl={5} xl={6} md={6} className="add-new-upload-file-inner-col">
                              <Form.Item
                                name="emissionsDocument"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                required={true}
                              >
                                <Upload
                                  accept=".xlsx"
                                  showUploadList={false}
                                  beforeUpload={(file) => {
                                    if (!checkFile(file)) {
                                      message.open({
                                        type: 'error',
                                        content: t('ghgInventory:invalidFileType'),
                                        duration: 4,
                                        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
                                      });
                                      return false;
                                    }
                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                      const xldata = e.target?.result;
                                      if (xldata) {
                                        try {
                                          const workbook = XLSX.read(xldata, { type: 'array' });
                                          const sheetName = workbook.SheetNames[0];
                                          const sheet = workbook.Sheets[sheetName];
                                          const excelData = XLSX.utils.sheet_to_json(sheet);
                                          if (!validateExcelDataFormat(sheet, excelData)) {
                                            message.open({
                                              type: 'error',
                                              content: t('ghgInventory:invalidDataInExcel'),
                                              duration: 4,
                                              style: {
                                                textAlign: 'right',
                                                marginRight: 15,
                                                marginTop: 10,
                                              },
                                            });
                                            return false;
                                          }
                                          handleFileUploadData(excelData);
                                          setUploadedFileName(file.name);
                                        } catch (error) {
                                          console.log(error, 'error', file);
                                        }
                                      }
                                    };
                                    reader.readAsArrayBuffer(file); // Use readAsArrayBuffer for Excel files

                                    // Prevent upload
                                    return false;
                                  }}
                                >
                                  <Button icon={<UploadOutlined />} disabled={userInfoState?.userRole === Role.ViewOnly} >
                                    {t(`ghgInventory:upload`)}
                                  </Button>
                                </Upload>
                              </Form.Item>
                            </Col>
                            <Col xl={16} md={16} className="add-new-upload-file-name-input">
                              <Input
                                value={uploadedFileName}
                                disabled={userInfoState?.userRole === Role.ViewOnly}
                                readOnly
                                suffix={
                                  uploadedFileName && (
                                    <Button
                                      onClick={clearUploadDoc}
                                      icon={<DeleteOutlined />}
                                      style={{ marginRight: '-10px', padding: '0px 6px' }}
                                    />
                                  )
                                }
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={9} offset={12}>
                          <Row gutter={16} className="table-heading-row">
                            <Col xl={7} className="table-heading-col">
                              Business As Usual (BAU)
                            </Col>
                            <Col xl={7} className="table-heading-col">
                              Conditional NDC
                            </Col>
                            <Col xl={7} className="table-heading-col">
                              Unconditional NDC
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row gutter={16} className="total-emission-row">
                        <Col xl={12} md={12}>
                          <span className="total-emission-title">
                            {t(`ghgInventory:totalNationalEmission`)}
                          </span>
                        </Col>
                        <Col xl={9} md={9}>
                          <Row gutter={16} className="total-emission-value-col">
                            <Col xl={7}>
                              <Tooltip title={addCommSep(Number(totalNationalBau))}>
                                <div className="co2-total-pill">{addCommSep(Number(totalNationalBau))}</div>
                              </Tooltip>
                            </Col>
                            <Col xl={7}>
                              <Tooltip title={addCommSep(Number(totalNationalConditionalNdc))}>
                                <div className="ch4-total-pill">{addCommSep(Number(totalNationalConditionalNdc))}</div>
                              </Tooltip>
                            </Col>
                            <Col xl={7}>
                              <Tooltip title={addCommSep(Number(totalNationalUnconditionalNdc))}>
                                <div className="n2o-total-pill">{addCommSep(Number(totalNationalUnconditionalNdc))}</div>
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Collapse
                        ghost
                        expandIcon={({ isActive }) =>
                          isActive ? <MinusCircleOutlined /> : <PlusCircleOutlined />
                        }
                      >
                        {Object.entries(formFields).map(([panelHeading, panelContent]) => (
                          <Panel header={renderPanelHeader(panelHeading)} key={panelHeading}>
                            {Array.isArray(panelContent)
                              ? panelContent.map((item, index) =>
                                renderPanelContent(panelHeading, item, index)
                              )
                              : Object.entries(panelContent).map(
                                ([subPanelHeading, subPanelContent]) => (
                                  //   <Col span={12} key={subPanelHeading}>
                                  <div className="sub-panel">
                                    <div className="sub-panel-heading">
                                      {renderPanelHeader(subPanelHeading)}
                                    </div>
                                    {subPanelContent.map((item, index) =>
                                      renderPanelContent(subPanelHeading, item, index)
                                    )}
                                  </div>
                                )
                              )}
                          </Panel>
                        ))}
                      </Collapse>
                      <Row
                        gutter={16}
                        key={'totalCo2WithoutLand'}
                        className="total-co2-without-land-row"
                      >
                        <Col xl={12} md={12} className="total-co2-without-land-title">
                          <span>
                            {t(`ghgInventory:totalCo2WithoutLand`)}
                          </span>
                        </Col>
                        <Col xl={9} md={9}>
                          <Row gutter={16} className="panel-content-input-box-row total-co2-land-input-box-row">
                            <Col xl={7}>
                              <Tooltip title={getFieldValue('totalCo2WithoutLand_bau')}>
                                <Form.Item name="totalCo2WithoutLand_bau"
                                  rules={[
                                    {
                                      validator: async (rule, value) => {
                                        if (value && value < 0) {
                                          throw new Error();
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    onChange={(value) => handleTotalCo2WithoutLandEmissions('totalCo2WithoutLand_bau', value)}
                                    disabled={userInfoState?.userRole === Role.ViewOnly} />
                                </Form.Item>
                              </Tooltip>
                            </Col>
                            <Col xl={7}>
                              <Tooltip title={getFieldValue('totalCo2WithoutLand_conditionalNdc')}>
                                <Form.Item name="totalCo2WithoutLand_conditionalNdc"
                                  rules={[
                                    {
                                      validator: async (rule, value) => {
                                        if (value && value < 0) {
                                          throw new Error();
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    onChange={(value) => handleTotalCo2WithoutLandEmissions('totalCo2WithoutLand_conditionalNdc', value)}
                                    disabled={userInfoState?.userRole === Role.ViewOnly} />
                                </Form.Item>
                              </Tooltip>
                            </Col>
                            <Col xl={7}>
                              <Tooltip title={getFieldValue('totalCo2WithoutLand_unconditionalNdc')}>
                                <Form.Item name="totalCo2WithoutLand_unconditionalNdc"
                                  rules={[
                                    {
                                      validator: async (rule, value) => {
                                        if (value && value < 0) {
                                          throw new Error();
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    onChange={(value) => handleTotalCo2WithoutLandEmissions('totalCo2WithoutLand_unconditionalNdc', value)}
                                    disabled={userInfoState?.userRole === Role.ViewOnly} />
                                </Form.Item>
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row gutter={16} key={'totalCo2WithLand'} className="total-co2-with-land-row">
                        <Col xl={12} md={12} className="total-co2-with-land-title">
                          <span>
                            {t(`ghgInventory:totalCo2WithLand`)}
                          </span>
                        </Col>
                        <Col xl={9} md={9}>
                          <Row gutter={16} className="panel-content-input-box-row total-co2-land-input-box-row">
                            <Col xl={7}>
                              <Tooltip title={getFieldValue('totalCo2WithLand_bau')}>
                                <Form.Item name="totalCo2WithLand_bau"
                                  rules={[
                                    {
                                      validator: async (rule, value) => {
                                        if (value && value < 0) {
                                          throw new Error();
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    onChange={(value) => handleTotalCo2WithoutLandEmissions('totalCo2WithLand_bau', value)}
                                    disabled={userInfoState?.userRole === Role.ViewOnly} />
                                </Form.Item>
                              </Tooltip>
                            </Col>
                            <Col xl={7}>
                              <Tooltip title={getFieldValue('totalCo2WithLand_conditionalNdc')}>
                                <Form.Item name="totalCo2WithLand_conditionalNdc"
                                  rules={[
                                    {
                                      validator: async (rule, value) => {
                                        if (value && value < 0) {
                                          throw new Error();
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    onChange={(value) => handleTotalCo2WithoutLandEmissions('totalCo2WithLand_conditionalNdc', value)}
                                    disabled={userInfoState?.userRole === Role.ViewOnly} />
                                </Form.Item>
                              </Tooltip>
                            </Col>
                            <Col xl={7}>
                              <Tooltip title={getFieldValue('totalCo2WithLand_unconditionalNdc')}>
                                <Form.Item name="totalCo2WithLand_unconditionalNdc"
                                  rules={[
                                    {
                                      validator: async (rule, value) => {
                                        if (value && value < 0) {
                                          throw new Error();
                                        }
                                      },
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    onChange={(value) => handleTotalCo2WithoutLandEmissions('totalCo2WithLand_unconditionalNdc', value)}
                                    disabled={userInfoState?.userRole === Role.ViewOnly} />
                                </Form.Item>
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      {((userInfoState?.companyRole === CompanyRole.GOVERNMENT || userInfoState?.companyRole === CompanyRole.MINISTRY)
                        && (userInfoState?.userRole !== Role.ViewOnly)) &&
                        (
                          <div className="steps-actions">
                            {userInfoState?.companyRole === CompanyRole.GOVERNMENT &&
                              (<Button className="finalize-btn" type="primary" loading={loading} onClick={onOpenFinalizeFormModel}>
                                {/* {t('addProgramme:submit')} */}
                                Finalise
                              </Button>)}
                            <Button className="submit-btn" type="primary" onClick={onOpenSaveFormModel} loading={loading}>
                              {/* {t('addProgramme:submit')} */}
                              Submit
                            </Button>
                            <Button className="back-btn" onClick={onOpenResetFormModel} loading={loading}>
                              {/* {t('addProgramme:back')} */}
                              Cancel
                            </Button>
                          </div>
                        )
                      }
                    </Form>
                  </div>
                </Tabs.TabPane>
              )}

              {data.map(
                (tabData: any) =>
                  tabData.state === 'FINALIZED' && (
                    <Tabs.TabPane className='view-data-panel'
                      key={tabData.id.toString()}
                      tab={
                        <span>
                          {tabData.year}
                          {tabData.state === 'FINALIZED' && <LockFilled style={{ marginLeft: 5 }} />}
                        </span>
                      }
                    >
                      <div>
                        <Row>
                          <Col xl={12} md={12} className="add-new-year-picker-col">
                            <div>
                              <Row className="add-new-upload-file-label">Year</Row>
                              <DatePicker
                                //   onChange={handleYearChange}
                                picker="year"
                                disabledDate={isYearDisabled}
                                defaultValue={moment(tabData.year, 'YYYY')}
                                disabled
                                size="large"
                              />
                            </div>
                          </Col>
                          <Col xl={12} md={12} className="add-new-upload-file-col">
                            <Row className="add-new-upload-file-label">
                              {t(`ghgInventory:emissionRemovalDocument`)}
                            </Row>
                            <Row>
                              <Col xl={15} md={15} className="view-download-file-name-input">
                                <Input value={`GHG-Reporting-Projections_${tabData.year}_V${tabData.version}.csv`} disabled />
                              </Col>
                              <Col xl={5} md={5} className="view-download-file-inner-col">
                                <Button icon={<DownloadOutlined />} onClick={() => { downloadCSV(tabData) }}>
                                  {t(`ghgInventory:download`)}
                                </Button>
                              </Col>

                            </Row>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={9} offset={12}>
                            <Row gutter={16} className="table-heading-row">
                              <Col xl={7} className="table-heading-col">
                                Business As Usual (BAU)
                              </Col>
                              <Col xl={7} className="table-heading-col">
                                Conditional NDC
                              </Col>
                              <Col xl={7} className="table-heading-col">
                                Unconditional NDC
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row gutter={16} className="total-emission-row">
                          <Col xl={12} md={12}>
                            <span>{t(`ghgInventory:totalNationalEmission`)}</span>
                          </Col>
                          <Col xl={9} md={9} className="total-emission-value-col">
                            <Row gutter={16}>
                              <Col xl={7}>
                                <Tooltip title={addCommSep(Number(calculateSumEmissionView(tabData, 'bau')))}>
                                  <div className="co2-total-pill">
                                    {addCommSep(Number(calculateSumEmissionView(tabData, 'bau')))}
                                  </div>
                                </Tooltip>
                              </Col>
                              <Col xl={7}>
                                <Tooltip title={addCommSep(Number(calculateSumEmissionView(tabData, 'conditionalNdc')))}>
                                  <div className="ch4-total-pill">
                                    {addCommSep(Number(calculateSumEmissionView(tabData, 'conditionalNdc')))}
                                  </div>
                                </Tooltip>
                              </Col>
                              <Col xl={7}>
                                <Tooltip title={addCommSep(Number(calculateSumEmissionView(tabData, 'unconditionalNdc')))}>
                                  <div className="n2o-total-pill">
                                    {addCommSep(Number(calculateSumEmissionView(tabData, 'unconditionalNdc')))}
                                  </div>
                                </Tooltip>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Collapse
                          ghost
                          expandIcon={({ isActive }) =>
                            isActive ? <MinusCircleOutlined /> : <PlusCircleOutlined />
                          }
                        >
                          {Object.entries(formFields).map(([panelHeading, panelContent]) => {
                            const projectionsObject = tabData[panelHeading];
                            const sectionTotalBau = calculateSumEmissionView(projectionsObject, 'bau');
                            const sectionTotalConditionalNdc = calculateSumEmissionView(projectionsObject, 'conditionalNdc');
                            const sectionTotalUnconditionalNdc = calculateSumEmissionView(projectionsObject, 'unconditionalNdc');
                            if (!isSectionDataEmpty(sectionTotalBau, sectionTotalConditionalNdc, sectionTotalUnconditionalNdc)) {
                              return (
                                <Panel
                                  header={renderPanelHeaderView(panelHeading, tabData)}
                                  key={panelHeading}
                                >
                                  {Array.isArray(panelContent)
                                    ? panelContent.map((item, index) => {
                                      for (const key in tabData) {
                                        if (key === panelHeading) {
                                          const emissionsObject = tabData[key];
                                          const emissionsData = emissionsObject[item];
                                          if (!isRowDataEmpty(emissionsData)) {
                                            return renderPanelContentView(
                                              emissionsData?.bau,
                                              emissionsData?.conditionalNdc,
                                              emissionsData?.unconditionalNdc,
                                              item,
                                              index
                                            );
                                          }
                                        }
                                      }
                                    })
                                    : Object.entries(panelContent).map(
                                      ([subPanelHeading, subPanelContent]) => {
                                        const projectionsObject = tabData.energyEmissions[subPanelHeading];
                                        const sectionTotalBau = calculateSumEmissionView(projectionsObject, 'bau');
                                        const sectionTotalConditionalNdc = calculateSumEmissionView(projectionsObject, 'conditionalNdc');
                                        const sectionTotalUnconditionalNdc = calculateSumEmissionView(projectionsObject, 'unconditionalNdc');
                                        if (!isSectionDataEmpty(sectionTotalBau, sectionTotalConditionalNdc, sectionTotalUnconditionalNdc)) {
                                          return (
                                            <div className="sub-panel">
                                              <div className="sub-panel-heading">
                                                {renderPanelHeaderView(
                                                  subPanelHeading,
                                                  tabData.energyEmissions
                                                )}
                                              </div>
                                              {subPanelContent.map((item, index) => {
                                                for (const key in tabData.energyEmissions[
                                                  subPanelHeading
                                                ]) {
                                                  if (key === item) {
                                                    const emissionsObject =
                                                      tabData.energyEmissions[subPanelHeading];
                                                    const emissionsData = emissionsObject[item];
                                                    if (!isRowDataEmpty(emissionsData)) {
                                                      return renderPanelContentView(
                                                        emissionsData?.bau,
                                                        emissionsData?.conditionalNdc,
                                                        emissionsData?.unconditionalNdc,
                                                        item,
                                                        index
                                                      );
                                                    }
                                                  }
                                                }
                                              })}
                                            </div>
                                          )
                                        }
                                      }
                                    )}
                                </Panel>
                              )
                            }
                          })}
                        </Collapse>
                        {(!isRowDataEmpty(tabData.totalCo2WithoutLand)) && (
                          <Row
                            gutter={16}
                            key={'totalCo2WithoutLand'}
                            className="total-co2-without-land-row"
                          >
                            <Col xl={12} md={12} className="total-co2-without-land-title">
                              <span>{t(`ghgInventory:totalCo2WithoutLand`)}</span>
                            </Col>
                            <Col xl={9} md={9}>
                              <Row gutter={16} className="panel-content-input-box-row total-co2-land-input-box-row">
                                <Col xl={7}>
                                  <Tooltip title={tabData.totalCo2WithoutLand?.bau
                                    ? addCommSep(Number(tabData.totalCo2WithoutLand?.bau))
                                    : tabData.totalCo2WithoutLand?.bau}>
                                    <div>
                                      <InputNumber value={tabData.totalCo2WithoutLand?.bau
                                        ? addCommSep(Number(tabData.totalCo2WithoutLand?.bau))
                                        : tabData.totalCo2WithoutLand?.bau} disabled />
                                    </div>
                                  </Tooltip>
                                </Col>
                                <Col xl={7}>
                                  <Tooltip title={tabData.totalCo2WithoutLand?.conditionalNdc
                                    ? addCommSep(Number(tabData.totalCo2WithoutLand?.conditionalNdc))
                                    : tabData.totalCo2WithoutLand?.conditionalNdc}>
                                    <div>
                                      <InputNumber value={tabData.totalCo2WithoutLand?.conditionalNdc
                                        ? addCommSep(Number(tabData.totalCo2WithoutLand?.conditionalNdc))
                                        : tabData.totalCo2WithoutLand?.conditionalNdc} disabled />
                                    </div>
                                  </Tooltip>
                                </Col>
                                <Col xl={7}>
                                  <Tooltip title={tabData.totalCo2WithoutLand?.unconditionalNdc
                                    ? addCommSep(Number(tabData.totalCo2WithoutLand?.unconditionalNdc))
                                    : tabData.totalCo2WithoutLand?.unconditionalNdc}>
                                    <div>
                                      <InputNumber value={tabData.totalCo2WithoutLand?.unconditionalNdc
                                        ? addCommSep(Number(tabData.totalCo2WithoutLand?.unconditionalNdc))
                                        : tabData.totalCo2WithoutLand?.unconditionalNdc} disabled />
                                    </div>
                                  </Tooltip>
                                </Col>
                              </Row>
                            </Col>
                          </Row>)}
                        {(!isRowDataEmpty(tabData.totalCo2WithLand)) && (
                          <Row gutter={16} key={'totalCo2WithLand'} className="total-co2-with-land-row total-co2-land-input-box-row">
                            <Col xl={12} md={12} className="total-co2-with-land-title">
                              <span>{t(`ghgInventory:totalCo2WithLand`)}</span>
                            </Col>
                            <Col xl={9} md={9}>
                              <Row gutter={16} className="panel-content-input-box-row">
                                <Col xl={7}>
                                  <Tooltip title={tabData.totalCo2WithLand?.bau
                                    ? addCommSep(Number(tabData.totalCo2WithLand?.bau))
                                    : tabData.totalCo2WithLand?.bau}>
                                    <div>
                                      <InputNumber value={tabData.totalCo2WithLand?.bau
                                        ? addCommSep(Number(tabData.totalCo2WithLand?.bau))
                                        : tabData.totalCo2WithLand?.bau} disabled />
                                    </div>
                                  </Tooltip>
                                </Col>
                                <Col xl={7}>
                                  <Tooltip title={tabData.totalCo2WithLand?.conditionalNdc
                                    ? addCommSep(Number(tabData.totalCo2WithLand?.conditionalNdc))
                                    : tabData.totalCo2WithLand?.conditionalNdc}>
                                    <div>
                                      <InputNumber value={tabData.totalCo2WithLand?.conditionalNdc
                                        ? addCommSep(Number(tabData.totalCo2WithLand?.conditionalNdc))
                                        : tabData.totalCo2WithLand?.conditionalNdc} disabled />
                                    </div>
                                  </Tooltip>
                                </Col>
                                <Col xl={7}>
                                  <Tooltip title={tabData.totalCo2WithLand?.unconditionalNdc
                                    ? addCommSep(Number(tabData.totalCo2WithLand?.unconditionalNdc))
                                    : tabData.totalCo2WithLand?.unconditionalNdc} >
                                    <div>
                                      <InputNumber value={tabData.totalCo2WithLand?.unconditionalNdc
                                        ? addCommSep(Number(tabData.totalCo2WithLand?.unconditionalNdc))
                                        : tabData.totalCo2WithLand?.unconditionalNdc} disabled />
                                    </div>
                                  </Tooltip>
                                </Col>
                              </Row>
                            </Col>
                          </Row>)}
                      </div>
                    </Tabs.TabPane>
                  )
              )}
            </Tabs>
          </div>
        )}
      </div>
      <GHGUserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onSubmitForm}
        onActionCanceled={onSaveFormCanceled}
        openModal={openSaveFormModal}
        errorMsg={errorMsg}
        loading={loading}
      />
      <GHGUserActionConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={onSubmitForm}
        onActionCanceled={onFinalizeFormCanceled}
        openModal={openFinalizeFormModal}
        errorMsg={errorMsg}
        loading={loading}
      />
      <DiscardChangesConfirmationModel
        t={t}
        actionInfo={actionInfo}
        onActionConfirmed={resetForm}
        onActionCanceled={onResetFormCanceled}
        openModal={openResetFormModal}
        errorMsg={errorMsg}
        loading={loading}
      />
    </div>
  );
};
