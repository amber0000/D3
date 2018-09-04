'use strict';


define('main', ['backtesting','graph'], function (backtesting, graph) {
	backtesting.init();
	graph.init();

	$(document).ready(function () {

		$("#button01").click(function () {
			var obj = {
				data : [
					{
						id: 1,
						flag: 'EUR',
						currencyCode: 'EUR',
						currency: 'Euro',
						level: 0.9033,
						units: 'EUR / USD',
						asOf: '08/19/2018',
						onedChng: 0.0026
					}
				],
				columns: [
					{
						data: 'id',
						type: 'numeric',
						width: 40
					},
					{
						data: 'flag'
					},
					{
						data: 'currencyCode',
						type: 'text'
					},
					{
						data: 'currency',
						type: 'text'
					},
					{
						data: 'level',
						type: 'numeric',
						numericFormat: {
						pattern: '0.0000'
						}
					}
				],
				colHeaders: [
					'날짜',
					'롱/숏',
					'진입가',
					'청산가',
					'계약수'
				]
			}
			backtesting.sheet.updateSettings(obj);
			return false;
		});

		$("#button02").click(function () {
			var obj = {
				afterSelectionByProp: function(row, column, row2, column2, preventScrolling, selectionLayerLevel){
					console.log(row);
					console.log(column);
					console.log(row2);
					console.log(column2);
					console.log(preventScrolling);
					console.log(selectionLayerLevel);
					console.log("---------------------");
	
				},
				afterDeselect: function(){
					console.log('afterDeselect');
				},
			}

			backtesting.sheet.updateSettings(obj);
			return false;
		});
	});

});
