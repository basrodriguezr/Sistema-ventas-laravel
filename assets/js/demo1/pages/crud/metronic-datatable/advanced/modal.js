'use strict';
// Class definition

var KTDatatableModal = function() {

	var localDatatable = function() {
		
		var modal = $('#kt_modal_KTDatatable_local');

		var datatable = $('#modal_datatable_local_source').KTDatatable({
			// datasource definition
			data: {
				type: 'POST',
				url: "/API/getSPuntoVenta",
				pageSize: 10,
			},

			// layout definition
			layout: {
				scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
				height: 400, // datatable's body's fixed height
				minHeight: 400,
				footer: false, // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: modal.find('#generalSearch'),
			},

			// columns definition
			columns: [
				{
					field: 'id',
					title: '#',
					sortable: false,
					width: 20,
					type: 'number',
					selector: {class: 'kt-checkbox--solid'},
					textAlign: 'center',
				}, {
					field: 'employee_id',
					title: 'Employee ID',
				}, {
					field: 'name',
					title: 'Name',
					template: function(row) {
						return row.first_name + ' ' + row.last_name;
					},
				}, {
					field: 'hire_date',
					title: 'Hire Date',
					type: 'date',
					format: 'MM/DD/YYYY',
				}, {
					field: 'gender',
					title: 'Gender',
				}, {
					field: 'status',
					title: 'Status',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Pending', 'class': 'kt-badge--brand'},
							2: {'title': 'Delivered', 'class': ' kt-badge--success'},
							3: {'title': 'Canceled', 'class': ' kt-badge--primary'},
							4: {'title': 'Success', 'class': ' kt-badge--success'},
							5: {'title': 'Info', 'class': ' kt-badge--info'},
							6: {'title': 'Danger', 'class': ' kt-badge--danger'},
							7: {'title': 'Warning', 'class': ' kt-badge--warning'},
						};
						return '<span class="kt-badge ' + status[row.status].class + ' kt-badge--inline kt-badge--pill">' + status[row.status].title + '</span>';
					},
				}, {
					field: 'type',
					title: 'Type',
					autoHide: false,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Online', 'state': 'danger'},
							2: {'title': 'Retail', 'state': 'primary'},
							3: {'title': 'Direct', 'state': 'accent'},
						};
						return '<span class="kt-badge kt-badge--' + status[row.type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.type].state +
							'">' +
							status[row.type].title + '</span>';
					},
				}, {
					field: 'Actions',
					title: 'Actions',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function() {
						return '\
						<div class="dropdown">\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
                                <i class="la la-cog"></i>\
                            </a>\
						  	<div class="dropdown-menu dropdown-menu-right">\
						    	<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
						    	<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
						    	<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
						  	</div>\
						</div>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
							<i class="la la-edit"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
							<i class="la la-trash"></i>\
						</a>\
					';
					},
				}],
		});

		modal.find('#kt_form_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'status');
		});

		modal.find('#kt_form_type').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'type');
		});

		modal.find('#kt_form_status,#kt_form_type').selectpicker();

		// fix datatable layout after modal shown
		datatable.hide();
		var alreadyReloaded = false;
		modal.on('shown.bs.modal', function() {
			if (!alreadyReloaded) {
				var modalContent = $(this).find('.modal-content');
				datatable.spinnerCallback(true, modalContent);

				datatable.reload();

				datatable.on('kt-datatable--on-layout-updated', function() {
					datatable.show();
					datatable.spinnerCallback(false, modalContent);
					datatable.redraw();
				});

				alreadyReloaded = true;
			}
		});
	};

	var remoteDatatable = function() {
		var modal = $('#kt_modal_KTDatatable_remote');

		var datatable = $('#modal_datatable_ajax_source').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'https://keenthemes.com/metronic/themes/themes/metronic/dist/preview/inc/api/datatables/demos/default.php',
					},
				},
				pageSize: 10, // display 20 records per page
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
			},

			// layout definition
			layout: {
				scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
				height: 400, // datatable's body's fixed height
				minHeight: 400,
				footer: false, // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: modal.find('#generalSearch'),
				delay: 400,
			},

			// columns definition
			columns: [
				{
					field: 'RecordID',
					title: '#',
					sortable: 'asc',
					width: 30,
					type: 'number',
					selector: false,
					textAlign: 'center',
				}, {
					field: 'OrderID',
					title: 'Profile Picture',
					template: function(data, i) {
						var number = 4 + i;
						while (number > 12) {
							number = number - 3;
						}
						var user_img = '100_' + number + '.jpg';

						var pos = KTUtil.getRandomInt(0, 5);
						var position = [
							'Developer',
							'Designer',
							'CEO',
							'Manager',
							'Architect',
							'Sales'
						];

						var output = '';
						if (number > 5) {
							output = '<div class="kt-user-card-v2">\
							<div class="kt-user-card-v2__pic">\
								<img src="https://keenthemes.com/metronic/preview/assets/media/users/' + user_img + '" alt="photo">\
							</div>\
							<div class="kt-user-card-v2__details">\
								<a href="#" class="kt-user-card-v2__name">' + data.CompanyAgent + '</a>\
								<span class="kt-user-card-v2__desc">' + position[pos] + '</span>\
							</div>\
						</div>';
						}
						else {
							var stateNo = KTUtil.getRandomInt(0, 6);
							var states = [
								'success',
								'brand',
								'danger',
								'success',
								'warning',
								'primary',
								'info'];
							var state = states[stateNo];

							output = '<div class="kt-user-card-v2">\
							<div class="kt-user-card-v2__pic">\
								<div class="kt-badge kt-badge--xl kt-badge--' + state + '">' + data.CompanyAgent.substring(0, 1) + '</div>\
							</div>\
							<div class="kt-user-card-v2__details">\
								<a href="#" class="kt-user-card-v2__name">' + data.CompanyAgent + '</a>\
								<span class="kt-user-card-v2__desc">' + position[pos] + '</span>\
							</div>\
						</div>';
						}

						return output;
					},
				}, {
					field: 'CompanyAgent',
					title: 'Name',
				}, {
					field: 'ShipDate',
					title: 'Ship Date',
					type: 'date',
					format: 'MM/DD/YYYY',
				}, {
					field: 'ShipCountry',
					title: 'Ship Country',
				}, {
					field: 'Status',
					title: 'Status',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Pending', 'class': 'kt-badge--brand'},
							2: {'title': 'Delivered', 'class': ' kt-badge--success'},
							3: {'title': 'Canceled', 'class': ' kt-badge--primary'},
							4: {'title': 'Success', 'class': ' kt-badge--success'},
							5: {'title': 'Info', 'class': ' kt-badge--info'},
							6: {'title': 'Danger', 'class': ' kt-badge--danger'},
							7: {'title': 'Warning', 'class': ' kt-badge--warning'},
						};
						return '<span class="kt-badge ' + status[row.Status].class + ' kt-badge--inline kt-badge--pill">' + status[row.Status].title + '</span>';
					},
				}, {
					field: 'Type',
					title: 'Type',
					autoHide: false,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Online', 'state': 'danger'},
							2: {'title': 'Retail', 'state': 'primary'},
							3: {'title': 'Direct', 'state': 'success'},
						};
						return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state + '">' +
								status[row.Type].title + '</span>';
					},
				}, {
					field: 'Actions',
					title: 'Actions',
					sortable: false,
					width: 110,
					overflow: 'visible',
					autoHide: false,
					template: function() {
						return '\
							<div class="dropdown">\
								<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
	                                <i class="la la-ellipsis-h"></i>\
	                            </a>\
							    <div class="dropdown-menu dropdown-menu-right">\
							        <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
							        <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
							        <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
							    </div>\
							</div>\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
								<i class="la la-edit"></i>\
							</a>\
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
								<i class="la la-trash"></i>\
							</a>\
						';
					},
				}],

		});

		modal.find('#kt_form_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'status');
		});

		modal.find('#kt_form_type').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'type');
		});

		modal.find('#kt_form_status,#kt_form_type').selectpicker();

		// fix datatable layout after modal shown
		datatable.hide();
		var alreadyReloaded = false;
		modal.on('shown.bs.modal', function() {
			if (!alreadyReloaded) {
				var modalContent = $(this).find('.modal-content');
				datatable.spinnerCallback(true, modalContent);

				datatable.reload();

				datatable.on('kt-datatable--on-layout-updated', function() {
					datatable.show();
					datatable.spinnerCallback(false, modalContent);
					datatable.redraw();
				});

				alreadyReloaded = true;
			}
		});
	};

	var subRemoteDatatable = function() {
		var el = $('#sub_datatable_ajax_source');
		var datatable = el.KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'https://keenthemes.com/metronic/themes/themes/metronic/dist/preview/inc/api/datatables/demos/customers.php',
					},
				},
				pageSize: 10, // display 20 records per page
				serverPaging: true,
				serverFiltering: false,
				serverSorting: true,
			},

			// layout definition
			layout: {
				theme: 'default',
				scroll: false,
				height: null,
				footer: false,
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: el.find('#generalSearch'),
			},

			// columns definition
			columns: [
				{
					field: 'RecordID',
					title: '',
					sortable: false,
					width: 30,
					textAlign: 'center',
				}, {
					field: 'FirstName',
					title: 'First Name',
					sortable: 'asc',
				}, {
					field: 'LastName',
					title: 'Last Name',
				}, {
					field: 'Company',
					title: 'Company',
				}, {
					field: 'Email',
					title: 'Email',
				}, {
					field: 'Phone',
					title: 'Phone',
				}, {
					field: 'Status',
					title: 'Status',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Pending', 'class': 'kt-badge--brand'},
							2: {'title': 'Delivered', 'class': ' kt-badge--success'},
							3: {'title': 'Canceled', 'class': ' kt-badge--primary'},
							4: {'title': 'Success', 'class': ' kt-badge--success'},
							5: {'title': 'Info', 'class': ' kt-badge--info'},
							6: {'title': 'Danger', 'class': ' kt-badge--danger'},
							7: {'title': 'Warning', 'class': ' kt-badge--warning'},
						};
						return '<span class="kt-badge ' + status[row.Status].class + ' kt-badge--inline kt-badge--pill">' + status[row.Status].title + '</span>';
					},
				}, {
					field: 'Type',
					title: 'Type',
					autoHide: false,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Online', 'state': 'danger'},
							2: {'title': 'Retail', 'state': 'primary'},
							3: {'title': 'Direct', 'state': 'accent'},
						};
						return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state +
							'">' +
							status[row.Type].title + '</span>';
					},
				}, {
					field: 'Actions',
					width: 130,
					title: 'Actions',
					sortable: false,
					overflow: 'visible',
					textAlign: 'left',
					autoHide: false,
					template: function(row) {
						return '\
		                  <button data-record-id="' + row.RecordID + '" class="btn btn-sm btn-default btn-font-sm" title="Edit details">\
		                      <i class="flaticon2-document"></i> Details\
		                  </button>';
					},
				}],
		});

		var portlet = datatable.closest('.kt-portlet');

		portlet.find('#kt_form_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'Status');
		});

		portlet.find('#kt_form_type').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'Type');
		});

		portlet.find('#kt_form_status,#kt_form_type').selectpicker();

		datatable.on('click', '[data-record-id]', function() {
			modalSubRemoteDatatable($(this).data('record-id'));
			$('#kt_modal_sub_KTDatatable_remote').modal('show');
		});
	};

	var modalSubRemoteDatatable = function(id) {
		var el = $('#modal_sub_datatable_ajax_source');
		var datatable = el.KTDatatable({
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'https://keenthemes.com/metronic/themes/themes/metronic/dist/preview/inc/api/datatables/demos/orders.php',
						params: {
							query: {
								generalSearch: '',
								CustomerID: id,
							},
						},
					},
				},
				pageSize: 10,
				serverPaging: true,
				serverFiltering: false,
				serverSorting: true,
			},

			// layout definition
			layout: {
				theme: 'default',
				scroll: true,
				height: 350,
				footer: false,
			},

			search: {
				input: el.find('#generalSearch'),
			},

			sortable: true,

			// columns definition
			columns: [
				{
					field: 'RecordID',
					title: '#',
					sortable: false,
					width: 30,
				}, {
					field: 'OrderID',
					title: 'Order ID',
					template: function(row) {
						return '<span>' + row.OrderID + ' - ' + row.ShipCountry + '</span>';
					},
				}, {
					field: 'ShipCountry',
					title: 'Country',
					width: 100,
				}, {
					field: 'ShipAddress',
					title: 'Ship Address',
				}, {
					field: 'ShipName',
					title: 'Ship Name',
					autoHide: false,
				}, {
					field: 'TotalPayment',
					title: 'Payment',
					type: 'number',
				}, {
					field: 'Status',
					title: 'Status',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Pending', 'class': 'kt-badge--brand'},
							2: {'title': 'Delivered', 'class': ' kt-badge--success'},
							3: {'title': 'Canceled', 'class': ' kt-badge--primary'},
							4: {'title': 'Success', 'class': ' kt-badge--success'},
							5: {'title': 'Info', 'class': ' kt-badge--info'},
							6: {'title': 'Danger', 'class': ' kt-badge--danger'},
							7: {'title': 'Warning', 'class': ' kt-badge--warning'},
						};
						return '<span class="kt-badge ' + status[row.Status].class + ' kt-badge--inline kt-badge--pill">' + status[row.Status].title + '</span>';
					},
				}, {
					field: 'Type',
					title: 'Type',
					autoHide: false,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Online', 'state': 'danger'},
							2: {'title': 'Retail', 'state': 'primary'},
							3: {'title': 'Direct', 'state': 'accent'},
						};
						return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' +
							status[row.Type].state + '">' +
							status[row.Type].title + '</span>';
					},
				}],
		});

		var modal = datatable.closest('.modal');

		modal.find('#kt_form_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'Status');
		});

		modal.find('#kt_form_type').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'Type');
		});

		modal.find('#kt_form_status,#kt_form_type').selectpicker();

		// fix datatable layout after modal shown
		datatable.hide();
		modal.on('shown.bs.modal', function() {
			var modalContent = $(this).find('.modal-content');
			datatable.spinnerCallback(true, modalContent);

			datatable.on('kt-datatable--on-layout-updated', function() {
				datatable.show();
				datatable.spinnerCallback(false, modalContent);
				datatable.redraw();
			});
		}).on('hidden.bs.modal', function() {
			el.KTDatatable('destroy');
		});
	};

	return {
		// public functions
		init: function() {
			remoteDatatable();
			localDatatable();
			subRemoteDatatable();
		}
	};
}();

jQuery(document).ready(function() {
	KTDatatableModal.init();
});