"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SdgProjectinformationComponent = void 0;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var other_sdg_bottom_sheet_component_1 = require("../other-sdg-bottom-sheet/other-sdg-bottom-sheet.component");
var SdgProjectinformationComponent = /** @class */ (function () {
    function SdgProjectinformationComponent(bottomsheet, formBuilder, appService, utilityService, activatedRoute, router) {
        this.bottomsheet = bottomsheet;
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.utilityService = utilityService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.projects = [];
        this.stakeholderInputArr = [];
        this.povertyReductionArr = [];
        this.reducingInequalityArr = [];
        this.genderParityArr = [];
        this.otherSDGArr = [];
        this.likelihoodArr = [];
        this.impactArr = [];
        this.otherSdgValueArr = [];
        this.sdgPIForm = this.formBuilder.group({
            _id: [""],
            menuId: [SdgProjectinformationComponent_1.Constants.MENU_ID],
            remarks: [""],
            updatedBy: [""],
            permissionMenuId: [""],
            projectCode: [""],
            projectId: [""],
            projectTitle: [""],
            // back end properties
            entity: [""],
            parentProject: ["", [forms_1.Validators.required]],
            screeningApproach: [""],
            stakeholderInput: [[]],
            povertyReduction: [[]],
            reducingInequality: [[]],
            genderParity: [[]],
            otherSDG: [[]],
            approverComment: [""]
        });
    }
    SdgProjectinformationComponent_1 = SdgProjectinformationComponent;
    SdgProjectinformationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPermissionMenuId();
        this.appService.projectByModule(SdgProjectinformationComponent_1.Constants.moduleName)
            .subscribe(function (response) {
            _this.projects = response.data;
        });
        this.populateData("likelihoodArr", { key: "Likelihood", outputValue: "value" });
        this.populateData("impactArr", { key: "Impact", outputValue: "value" });
        this.populateData("otherSdgValueArr", { "element": "select",
            "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
            "key": "otherSDG", outputValue: "value" });
        // check for formId and record id
        this.formId = this.activatedRoute.snapshot.paramMap.get('formId');
        this.recordId = this.activatedRoute.snapshot.paramMap.get('recordId');
        if (this.formId && this.recordId) {
            this.approvalScreen = true;
            // read data from the from id
            this.appService.getNDC({ _id: this.formId })
                .subscribe(function (response) {
                if (response.statusCode == 200 && response.data) {
                    /* let keys = Object.keys(response.data);
                    let pathValueObj = {};
                    keys.forEach(key=> {
                      pathValueObj[key] = response.data[key];
                    })
                    this.sdgPIForm.patchValue(pathValueObj); */
                    _this.populateForm(_this.sdgPIForm, response.data);
                    _this.reAssignValues(response.data); // used fetch individual values from form and assign in related variables
                }
            });
        }
        // populate data
        if (!this.approvalScreen) {
            this.populateData("stakeholderInputArr", { "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
                "key": "stackHolderFeedback", outputValue: "value" });
            this.populateData("povertyReductionArr", { "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
                "key": "povertyReduction", "section": "qualitativeImpact", outputValue: "value" });
            this.populateData("povertyReductionArr", { "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
                "key": "povertyReduction", "section": "quantitativeImpact", outputValue: "value" });
            this.populateData("reducingInequalityArr", { "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
                "key": "reducingInequality", "section": "qualitativeImpact", outputValue: "value" });
            this.populateData("reducingInequalityArr", { "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
                "key": "reducingInequality", "section": "quantitativeImpact", outputValue: "value" });
            this.populateData("genderParityArr", { "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
                "key": "genderParity", "section": "qualitativeImpact", outputValue: "value" });
            this.populateData("genderParityArr", { "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
                "key": "genderParity", "section": "quantitativeImpact", outputValue: "value" });
        }
    };
    SdgProjectinformationComponent.prototype.reAssignValues = function (responseData) {
        var _this = this;
        // assign project from id
        this.projects.forEach(function (project) {
            if (project._id == responseData.parentProject) {
                _this.sdgPIForm.controls.parentProject.patchValue(project);
            }
        });
        this.stakeholderInputArr = responseData.stakeholderInput;
        this.povertyReductionArr = responseData.povertyReduction;
        this.reducingInequalityArr = responseData.reducingInequality;
        this.genderParityArr = responseData.genderParity;
        this.otherSDGArr = responseData.otherSDG;
    };
    SdgProjectinformationComponent.prototype.populateOthersSDG = function (count) {
        return __awaiter(this, void 0, void 0, function () {
            var otherSDGData, qualitativeArr, quantitativeArr, question2Map, otherSdg;
            var _this = this;
            return __generator(this, function (_a) {
                otherSDGData = [];
                qualitativeArr = [];
                quantitativeArr = [];
                question2Map = {};
                if (!this.otherSdgValueArr.length || count > this.otherSdgValueArr.length - 1) {
                    console.log("populated SDG data ", this.otherSDGArr);
                    return [2 /*return*/];
                }
                otherSdg = {
                    otherSdgType: this.otherSdgValueArr[count],
                    qualitativeImpact: [],
                    quantitativeImpact2: [],
                    quantitativeImpact: []
                };
                // call api to get other sdg info based on otherSdgType
                this.appService.getAppData({
                    "element": "question",
                    "menuId": SdgProjectinformationComponent_1.Constants.MENU_ID,
                    "key": "otherSDG",
                    "section": this.otherSdgValueArr[count]
                }).subscribe(function (response) {
                    otherSDGData = response.data;
                    _this.populateOtherSDGSection(otherSDGData, otherSdg, count);
                });
                return [2 /*return*/];
            });
        });
    };
    SdgProjectinformationComponent.prototype.populateOtherSDGSection = function (otherSDGData, otherSdg, count) {
        var qualitativeArr = [];
        var quantitativeArr = [];
        var question2Map = {};
        // populate the array structure based on value of otherSdgValueArr
        switch (this.otherSdgValueArr[count]) {
            case "Infrastructure, Innovation, Industry":
            case "Environment":
                qualitativeArr = otherSDGData.filter(function (element) {
                    if (element["subSection"] == "qualitativeImpact") {
                        return element;
                    }
                });
                qualitativeArr.forEach(function (element) {
                    otherSdg.qualitativeImpact.push({
                        question: element["value"],
                        isQualitative: true
                    });
                });
                quantitativeArr = otherSDGData.filter(function (element) {
                    if (element["subSection"] == "quantitativeImpact") {
                        return element;
                    }
                });
                quantitativeArr.forEach(function (element) {
                    // crate map of label and question
                    if (element["subSection2"]) {
                        if (!question2Map[element["subSection2"]]) {
                            question2Map[element["subSection2"]] = [element["value"]];
                        }
                        else {
                            question2Map[element["subSection2"]].push(element["value"]);
                        }
                    }
                });
                // create quantitativeImpact2 array
                var question2 = void 0;
                Object.keys(question2Map).forEach(function (key) {
                    otherSdg.quantitativeImpact2.push({
                        label: key,
                        questions: []
                    });
                    var lastIndex = otherSdg.quantitativeImpact2[otherSdg.quantitativeImpact2.length - 1]; // get the last record
                    // get the array of values based on key in question2Map
                    question2Map[key].forEach(function (value) {
                        lastIndex.questions.push({
                            isQuantitative: true,
                            question: value
                        });
                    });
                });
                break;
            /* case "Environment":
              
              break; */
            case "Employment":
            case "Education and Learning":
            case "Food Security and Hunger":
            case "Water and Sanitation":
            case "Health and Well Being":
                qualitativeArr = otherSDGData.filter(function (element) {
                    if (element["subSection"] == "qualitativeImpact") {
                        return element;
                    }
                });
                qualitativeArr.forEach(function (element) {
                    otherSdg.qualitativeImpact.push({
                        question: element["value"],
                        isQualitative: true
                    });
                });
                quantitativeArr = otherSDGData.filter(function (element) {
                    if (element["subSection"] == "qualitativeImpact") {
                        return element;
                    }
                });
                quantitativeArr.forEach(function (element) {
                    otherSdg.quantitativeImpact.push({
                        question: element["value"],
                        isQuantitative: true
                    });
                });
                break;
            default:
                console.error("Invalid other sdg!!!");
                return;
                break;
        }
        // add to main otherSDGArr
        this.otherSDGArr.push(otherSdg);
        this.populateOthersSDG(++count);
    };
    SdgProjectinformationComponent.prototype.populateData = function (fieldName, filter) {
        var _this = this;
        this.appService.getAppData(filter)
            .subscribe(function (response) {
            if (fieldName == "likelihoodArr") {
                _this.likelihoodArr = response.data;
                return;
            }
            else if (fieldName == "impactArr") {
                _this.impactArr = response.data;
                return;
            }
            else if (fieldName == "otherSdgValueArr") {
                _this.otherSdgValueArr = response.data;
                // populate other sdg each section
                if (!_this.approvalScreen)
                    _this.populateOthersSDG(0);
                return;
            }
            response.data = response.data.map(function (data) {
                var question = {};
                if (filter.key == "stackHolderFeedback") {
                    question.label = data;
                    question.strengths = "";
                    question.opportunities = "";
                    question.threats = "";
                    question.weakness = "";
                }
                else if (filter["key"] == "povertyReduction" && filter["section"] == "qualitativeImpact") {
                    question.question = data;
                    question.isQualitative = true;
                    question.likelihood = "";
                    question.impact = "";
                }
                else if (filter["key"] == "povertyReduction" && filter["section"] == "quantitativeImpact") {
                    question.question = data;
                    question.isQuantitative = true;
                    question.data = 0;
                    question.dataSource = "";
                }
                else if (filter["key"] == "reducingInequality" && filter["section"] == "qualitativeImpact") {
                    question.question = data;
                    question.isQualitative = true;
                    question.likelihood = "";
                    question.impact = "";
                }
                else if (filter["key"] == "reducingInequality" && filter["section"] == "quantitativeImpact") {
                    question.question = data;
                    question.isQuantitative = true;
                    question.likelihood = "";
                    question.impact = "";
                }
                else if (filter["key"] == "genderParity" && filter["section"] == "qualitativeImpact") {
                    question.question = data;
                    question.isQualitative = true;
                    question.likelihood = "";
                    question.impact = "";
                }
                else if (filter["key"] == "genderParity" && filter["section"] == "quantitativeImpact") {
                    question.question = data;
                    question.isQuantitative = true;
                    question.likelihood = "";
                    question.impact = "";
                }
                return question;
            });
            if (fieldName == "stakeholderInputArr") {
                _this.stakeholderInputArr = response.data;
            }
            else if (fieldName == "povertyReductionArr") {
                _this.povertyReductionArr = _this.povertyReductionArr.concat(response.data);
            }
            else if (fieldName == "reducingInequalityArr") {
                _this.reducingInequalityArr = _this.reducingInequalityArr.concat(response.data);
            }
            else if (fieldName == "genderParityArr") {
                _this.genderParityArr = _this.genderParityArr.concat(response.data);
            }
            //this.sdgPIForm.controls[controlName].setValue(response.data);
        });
    };
    SdgProjectinformationComponent.prototype.getPermissionMenuId = function () {
        this.appService
            .getRecord(SdgProjectinformationComponent_1.Constants.MENU_ID)
            .subscribe(function (res) {
            if (res.data) {
                SdgProjectinformationComponent_1.Constants.permissionMenuId =
                    res.data.permissionMenuId;
            }
        }, function (err) {
            console.error(err);
        });
    };
    SdgProjectinformationComponent.prototype.submit = function () {
        var _this = this;
        console.log("stakeholderInputArr  ", this.stakeholderInputArr);
        console.log("povertyReductionArr  ", this.povertyReductionArr);
        console.log("otherSDGArr  ", this.otherSDGArr);
        // add rest of the form values for the question section
        this.sdgPIForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        this.sdgPIForm.controls.stakeholderInput.patchValue(this.stakeholderInputArr);
        this.sdgPIForm.controls.povertyReduction.patchValue(this.povertyReductionArr);
        this.sdgPIForm.controls.reducingInequality.patchValue(this.reducingInequalityArr);
        this.sdgPIForm.controls.genderParity.patchValue(this.genderParityArr);
        this.sdgPIForm.controls.otherSDG.patchValue(this.otherSDGArr);
        this.appService.saveNDC(this.sdgPIForm.value)
            .subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.utilityService.openSnackBar(response.message, 'success');
            }
        }, function (err) {
            _this.utilityService.openSnackBar(err, 'error');
        });
    };
    SdgProjectinformationComponent.prototype.onProjectSelect = function () {
        var _this = this;
        this.appService.getNDC({ entity: SdgProjectinformationComponent_1.Constants.entity, parentProject: this.selectedProject._id }).subscribe(function (response) {
            console.log("response.data   ", response);
            // fill form with existing data
            // if no existing data found then populate data from selected project
            if (!response.data) {
                /* this.sdgPIForm.controls.projectCode.setValue(this.sdgPIForm.controls.parentProject.value.projectCode);
                this.sdgPIForm.controls.projectTitle.setValue(this.sdgPIForm.controls.parentProject.value.projectTitle);
                this.sdgPIForm.controls.projectId.setValue(this.sdgPIForm.controls.parentProject.value.projectId); */
                _this.populateForm(_this.sdgPIForm, _this.selectedProject);
            }
            else {
                _this.populateForm(_this.sdgPIForm, response.data);
                _this.reAssignValues(response.data); // used fetch individual values from form and assign in related variables
            }
        }, function (error) {
            console.error("Error in fetching existing record ", error);
        });
        // console.log(this.sdgPIForm.controls.parentProject.value);
        // call api to get existing latest record
    };
    SdgProjectinformationComponent.prototype.populateForm = function (form, data) {
        var keys = Object.keys(data);
        var pathValueObj = {};
        keys.forEach(function (key) {
            pathValueObj[key] = data[key];
        });
        form.patchValue(pathValueObj);
    };
    SdgProjectinformationComponent.prototype.onTabChange = function (event) {
        console.log(event.index);
        if (event.index == 4) {
            this.openBottomSheet();
        }
    };
    SdgProjectinformationComponent.prototype.updateDataStatus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.recordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.sdgPIForm.controls.approverComment.value
        };
        this.appService.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.sdgPIForm.reset();
                _this.utilityService.openSnackBar(res.message, 'success');
                _this.router.navigate(['./my-approvals']);
            }
            else {
                _this.utilityService.openSnackBar(res.message, 'error');
            }
        }, function (err) {
            _this.utilityService.openSnackBar(err.message, 'error');
        });
    };
    SdgProjectinformationComponent.prototype.openBottomSheet = function () {
        var _this = this;
        // Take refernce of bottom sheet
        var bottomSheetRef = this.bottomsheet.open(other_sdg_bottom_sheet_component_1.OtherSdgBottomSheetComponent, {
            data: {
                datas: this.otherSdgValueArr
            }
        });
        // subscribe to observable that emit event when bottom sheet closes
        bottomSheetRef.afterDismissed().subscribe(function (dataFromChild) {
            console.log(dataFromChild);
            if (dataFromChild == undefined) {
                _this.openBottomSheet();
            }
            else if (dataFromChild != undefined) {
                // update visible flag
                _this.otherSDGArr.map(function (sdg) {
                    sdg.otherSdgType == dataFromChild ? sdg.isVisible = true : sdg.isVisible = false;
                });
                // do the api call for other sdg question list
            }
        });
    };
    var SdgProjectinformationComponent_1;
    SdgProjectinformationComponent.Constants = {
        MENU_ID: "SDG_Assessment_ProjectInformation",
        permissionMenuId: "",
        moduleName: "SDG_INPUT",
        entity: "SDG INPUT"
    };
    SdgProjectinformationComponent = SdgProjectinformationComponent_1 = __decorate([
        core_1.Component({
            selector: "app-sdg-projectinformation",
            templateUrl: "./sdg-projectinformation.component.html",
            styleUrls: ["./sdg-projectinformation.component.scss"]
        })
    ], SdgProjectinformationComponent);
    return SdgProjectinformationComponent;
}());
exports.SdgProjectinformationComponent = SdgProjectinformationComponent;
