import { inject } from 'aurelia-framework';
import { DataTable } from '../../resources/utils/dataTable';
import { AppConfig } from '../../config/appConfig';
import { Utils } from '../../resources/utils/utils';
import { People } from '../../resources/data/people';
import { is4ua } from '../../resources/data/is4ua';
import { Chart } from 'node_modules/chart.js/dist/Chart.js';

@inject(DataTable, AppConfig, Utils, People, is4ua)
export class Institutions {
	spinnerHTML = "";

	unselectedFields = [{ field: 'address', displayName: 'Address' }, { field: 'postalCode', displayName: 'Postal Code' }, { field: 'dropDate', displayName: 'Drop Date' }, { field: 'joinDate', displayName: 'Join Date' }];
	selectedFields = [{ field: 'name', displayName: 'Name' }, { field: 'institutionType', displayName: 'Institution Type' }, { field: 'memberType', displayName: 'Member Type' }, { field: 'highestDegree', displayName: 'Highest Degree' }, { field: 'region', displayName: 'Region' }, { field: 'country', displayName: 'Country' }, { field: 'institutionStatus', displayName: 'Status' }]
	fileName = 'institutions.csv';
	tableSelected = true;
	backgroundColors = ['#cc3300', '#99e600', '#0099cc', '#ff0066', '#6666ff', '#1a8cff', '#000080', '#66ff99', '#1aff66', '#808000', '#ffff66', '#4d4d00', '#ccffff', '#006666', '#339933', '#b3ffff', '#000099', '#66ff33', '#269900', '#ffff00', '#ffff66', '#9999ff', '#6600cc', '#009933', '', '#0000b3', '#ff0000', '#00004d', '#0000cc', '#ff0000', '#ff0000', '#ffb3b3', '#ffb3b3', '#e63900', '#ffb3b3', '#330d00', '#ffb3b3', '#3333ff', '#0000cc'];


	constructor(datatable, config, utils, people, is4ua) {
		this.dataTable = datatable;
		this.dataTable.initialize(this);
		this.config = config;
		this.utils = utils;
		this.people = people;
		this.is4ua = is4ua;

		this.userObj = JSON.parse(sessionStorage.getItem('user'));
		this.DynamicDoughnutData = {};
		this.SimpleLineData = {};

		// this.resetLineData();
	}

	resetPieData() {
		this.DynamicDoughnutData = {
			labels: ["Red", "Green", "Yellow"],
			datasets: [
				{
					data: [300, 50, 100],
					backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					],
					hoverBackgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					]
				}]
		};
	}

	resetLineData() {
		this.SimpleLineData = {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
				{
					label: "Healthy People",
					backgroundColor: "rgba(220,220,220,0.2)",
					borderColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: [65, 59, 80, 81, 56, 55, 40]
				},
				{
					label: "Ill People",
					backgroundColor: "rgba(151,187,205,0.2)",
					borderColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",
					data: [28, 48, 40, 19, 86, 27, 90]
				}
			]
		};
	}

	async attached() {
		$('[data-toggle="tooltip"]').tooltip();
		$('#loading').show();
		let responses = await Promise.all([
			// this.people.getPeopleArray('?order=lastName'),
			this.people.getInstitutionsArray('?order=name', true),
			this.is4ua.loadIs4ua()
		]);
		this.people.institutionsArray.forEach((item, index) => {
			if (item.name == 'HEC Montréal') {
				this.people.institutionsArray.splice(index, 1);
			}
			if (item.name == '-- UA Staff --') {
				this.people.institutionsArray.splice(index, 1);
			}
			if (item.memberType == '04') {
				this.people.institutionsArray.splice(index, 1);
			}
		});

		this.config.getConfig(true);
		this.dataTable.updateArray(this.people.institutionsArray);
		this.resetIS4UADataIT();
		this.resetIS4UADataMT();
		this.resetIS4UADataHD();
		this.resetCountryData();
		this.resetRegionData();
		this.resetStatusDataMT();
		$('#loading').hide();
	}

	async activate() {

	}

	async refresh() {
		$('#loading').show();
		await this.people.getInstitutionsArray('?order=name', true);
		this.dataTable.updateArray(this.people.institutionsArray);
		$('#loading').hide();
	}

	showTable() {
		this.tableSelected = true;
	}

	showGraph() {
		this.tableSelected = false;
	}

	resetIS4UADataIT() {
		var labels = new Array();
		var data = new Array();
		var categories = new Array();
		var index;
		this.is4ua.institutionTypes.forEach((item, i) => {
			labels.push(item.description);
			categories.push(item.code);
			data.push(0);
		});

		this.people.institutionsArray.forEach(item => {
			index = categories.indexOf(item.institutionType);
			if (index > -1) data[index]++;
		});

		this.DynamicDoughnutData = {
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: this.backgroundColors,
					hoverBackgroundColor: this.backgroundColors
				}]
		};
	}

	resetIS4UADataHD() {
		var labels = new Array();
		var data = new Array();
		var categories = new Array();
		var index;
		var backGroundColors = new Array();
		this.is4ua.highestDegrees.forEach((item, i) => {
			labels.push(item.description);
			categories.push(item.code);
			data.push(0);
			backGroundColors.push(this.backgroundColors[i])
		});

		this.people.institutionsArray.forEach(item => {
			index = categories.indexOf(item.highestDegree);
			if (index > -1) data[index]++;
		});

		this.DynamicDoughnutDataHD = {
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: this.backgroundColors,
					hoverBackgroundColor: this.backgroundColors
				}]
		};
	}

	resetIS4UADataMT() {
		var labels = new Array();
		var data = new Array();
		var categories = new Array();
		var index;
		var backGroundColors = new Array();
		this.is4ua.memberTypes.forEach((item, i) => {
			labels.push(item.description);
			categories.push(item.code);
			data.push(0);
			backGroundColors.push(this.backgroundColors[i])
		});

		this.people.institutionsArray.forEach(item => {
			index = categories.indexOf(item.memberType);
			if (index > -1) data[index]++;
		});

		this.DynamicDoughnutDataMT = {
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: this.backgroundColors,
					hoverBackgroundColor: this.backgroundColors
				}]
		};
	}

	resetCountryData() {
		var data = new Array();
		var categories = new Array();
		var index;
		var backGroundColors = new Array();

		this.people.institutionsArray.forEach(item => {
			if (categories.indexOf(item.country) === -1) {
				categories.push(item.country);
				data.push(0);
			}
			index = categories.indexOf(item.country);
			if (index > -1) data[index]++;
		});

		this.DynamicDoughnutDataCountries = {
			labels: categories,
			datasets: [
				{
					data: data,
					backgroundColor: this.backgroundColors,
					hoverBackgroundColor: this.backgroundColors
				}]
		};
	}

	resetRegionData() {
		var data = new Array();
		var categories = new Array();
		var index;
		var backGroundColors = new Array();

		this.people.institutionsArray.forEach(item => {
			if (categories.indexOf(item.region) === -1) {
				categories.push(item.region);
				data.push(0);
			}
			index = categories.indexOf(item.region);
			if (index > -1) data[index]++;
		});

		this.DynamicDoughnutDataRegions = {
			labels: categories,
			datasets: [
				{
					data: data,
					backgroundColor: this.backgroundColors,
					hoverBackgroundColor: this.backgroundColors
				}]
		};
	}

	resetStatusDataMT() {
		var labels = new Array();
		var data = new Array();
		var categories = new Array();
		var index;
		this.is4ua.institutonStatusArray.forEach((item, i) => {
			labels.push(item.description);
			categories.push(item.code);
			data.push(0);
		});

		this.people.institutionsArray.forEach(item => {
			index = categories.indexOf(item.institutionStatus);
			if (index > -1) data[index]++;
		});

		this.DynamicDoughnutDataStatus = {
			labels: labels,
			datasets: [
				{
					data: data,
					backgroundColor: this.backgroundColors,
					hoverBackgroundColor: this.backgroundColors
				}]
		};
	}

	export() {
		this.showExportPanel = !this.showExportPanel;
	}

	selectField(index) {
		this.selectedFields.push(this.unselectedFields.splice(index, 1)[0]);
	}

	removeField(index) {
		this.unselectedFields.push(this.selectedFields.splice(index, 1)[0]);
	}

	downloadCSV() {
		if (this.selectedFields.length) {
			var exportArray = this.utils.copyArray(this.dataTable.displayArray);
			var csvContent = "";
			var lines = new Array();
			var delimiter = ',';
			var lineDelimiter = '\n';
			var numFields = this.selectedFields.length;
			if (this.substituteDescriptions) exportArray = this.subIs4uaValues(exportArray);
			exportArray.forEach(item => {
				var line = "";
				this.selectedFields.forEach((field, index) => {
					line += item[field.field];
					if (index < numFields) {
						line += delimiter;
					}
				})
				lines.push(line);
			})
			csvContent = lines.join(lineDelimiter);
			console.log(csvContent);
			var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
			if (navigator.msSaveBlob) { // IE 10+
				navigator.msSaveBlob(blob, this.fileName);
			} else {
				var link = document.createElement("a");
				if (link.download !== undefined) { // feature detection
					// Browsers that support HTML5 download attribute
					var url = URL.createObjectURL(blob);
					link.setAttribute("href", url);
					link.setAttribute("download", this.fileName);
					link.style.visibility = 'hidden';
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}
			}

			this.showExportPanel = false;
		}

	}

	downloadExcel() {
		if (this.selectedFields.length) {
			var exportArray = this.utils.copyArray(this.dataTable.baseArray);
			if (this.substituteDescriptions) exportArray = this.subIs4uaValues(exportArray);

			let csvContent = "data:text/csv;charset=utf-8;";
			this.selectedFields.forEach(item => {
				csvContent += "," + item.displayName;
			})
			csvContent += "\r\n";
			exportArray.forEach(item => {
				this.selectedFields.forEach((field, index) => {
					if (index > 0) csvContent += ",";
					csvContent += item[field.field] ? item[field.field].replace(",", " ") : "";
				})
				csvContent += "\r\n";
			});
			var encodedUri = encodeURI(csvContent);
			var link = document.createElement("a");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", "institutions.csv");
			document.body.appendChild(link);

			link.click();

			// var exportArray = this.utils.copyArray(this.dataTable.baseArray);
			// var htmlContent = "<table><tr>";
			// var numFields = this.selectedFields.length;
			// if(this.substituteDescriptions) exportArray = this.subIs4uaValues(exportArray);

			// this.selectedFields.forEach(item => {
			// 	htmlContent += "<th>" + item.displayName + "</th>";
			// })
			// htmlContent += "</tr>";

			// exportArray.forEach(item => {
			// 	var line = "<tr>";
			// 	this.selectedFields.forEach((field, index) => {
			// 		line += "<td>" + item[field.field] + "</td>"; 
			// 	})
			// 	line += "</tr>";
			// 	htmlContent += line;
			// });
			// htmlContent += "</table>";
			// window.open('data:application/vnd.ms-excel,' + htmlContent);
			// this.showExportPanel = false;
		} else {
			this.utils.showNotification("You haven't chosen any fields to include");
		}
	}

	subIs4uaValues(exportArray) {
		var institutionType = $.grep(this.selectedFields, function (e) { return e.field == 'institutionType' });
		var memberType = $.grep(this.selectedFields, function (e) { return e.field == 'memberType' });
		var highestDegree = $.grep(this.selectedFields, function (e) { return e.field == 'highestDegree' });

		if (institutionType.length) {
			exportArray.forEach((item) => {
				var obj = this.dataTable.findObj(this.is4ua.institutionTypes, 'code', item.institutionType);
				item['institutionType'] = obj ? obj['description'] : null;
			})
		}
		if (memberType.length) {
			exportArray.forEach((item) => {
				var obj = this.dataTable.findObj(this.is4ua.memberTypes, 'code', item.memberType);
				item['memberType'] = obj ? obj['description'] : null;
			})
		}
		if (highestDegree.length) {
			exportArray.forEach((item) => {
				var obj = this.dataTable.findObj(this.is4ua.highestDegrees, 'code', item.highestDegree);
				item['highestDegree'] = obj ? obj['description'] : null;
			})
		}
		return exportArray;
	}

	cancelDownload() {
		this.showExportPanel = false;
	}

	customInstitutionTypeSorter(sortProperty, sortDirection, sortArray, context) {
		sortArray.forEach((item) => {
			var obj = context.dataTable.findObj(context.is4ua.institutionTypes, 'code', item.institutionType);
			item['sortProperty'] = obj ? obj['description'] : null;
		})

		return sortArray.sort((a, b) => {
			var result = (a['sortProperty'] < b['sortProperty']) ? -1 : (a['sortProperty'] > b['sortProperty']) ? 1 : 0;
			return result * sortDirection;
		});
	}

	customMemberTypeSorter(sortProperty, sortDirection, sortArray, context) {
		sortArray.forEach((item) => {
			var obj = context.dataTable.findObj(context.is4ua.memberTypes, 'code', item.memberType);
			item['sortProperty'] = obj ? obj['description'] : null;
		})

		return sortArray.sort((a, b) => {
			var result = (a['sortProperty'] < b['sortProperty']) ? -1 : (a['sortProperty'] > b['sortProperty']) ? 1 : 0;
			return result * sortDirection;
		});
	}

	customHighestDegreeSorter(sortProperty, sortDirection, sortArray, context) {
		sortArray.forEach((item) => {
			var obj = context.dataTable.findObj(context.is4ua.highestDegrees, 'code', item.highestDegree);
			item['sortProperty'] = obj ? obj['description'] : null;
		})

		return sortArray.sort((a, b) => {
			var result = (a['sortProperty'] < b['sortProperty']) ? -1 : (a['sortProperty'] > b['sortProperty']) ? 1 : 0;
			return result * sortDirection;
		});
	}
}