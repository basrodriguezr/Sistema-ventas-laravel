// Class definition
var KTSelect2 = function () {
    // Private functions
    var demos = function () {
        // basic
        $('#kt_select2_1, #kt_select2_1_validate').select2({
        });


        $('#kt_select3_2, #kt_select3_2_validate').select2({
            placeholder: "Seleccione la Empresa"
        });

        $('#kt_select3_3, #kt_select3_3_validate').select2({
            placeholder: "Seleccione la Sucursal"
        });


        $('#kt_select4_2, #kt_select4_2_validate').select2({
            placeholder: "Seleccione la Sucursal"
        });

        $('#kt_select6_2, #kt_select6_2_validate').select2({
            placeholder: "Seleccione la Empresa"
        });

        $('#kt_select7_2, #kt_select7_2_validate').select2({
            placeholder: "Seleccione la Empresa"
        });


        // nested
        $('#kt_select2_2, #kt_select2_2_validate').select2({
            placeholder: "Seleccione el Punto de Venta"
        });

        // multi select
        $('#kt_select2_3, #kt_select2_3_validate').select2({
            placeholder: "Select a state",
        });

        // basic
        $('#kt_select2_4').select2({
            placeholder: "Select a state",
            allowClear: true
        });

        // loading data from array
        var data = [{
            id: 0,
            text: 'Enhancement'
        }, {
            id: 1,
            text: 'Bug'
        }, {
            id: 2,
            text: 'Duplicate'
        }, {
            id: 3,
            text: 'Invalid'
        }, {
            id: 4,
            text: 'Wontfix'
        }];

        $('#kt_select2_5').select2({
            placeholder: "Select a value",
            data: data
        });

        // loading remote data

        function formatRepo(repo) {
            if (repo.loading) return repo.text;
            var markup = "<div class='select2-result-repository clearfix'>" +
                "<div class='select2-result-repository__meta'>" +
                "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";
            if (repo.description) {
                markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
            }
            markup += "<div class='select2-result-repository__statistics'>" +
                "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div>" +
                "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
                "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
                "</div>" +
                "</div></div>";
            return markup;
        }

        function formatRepoSelection(repo) {
            return repo.full_name || repo.text;
        }

        $("#kt_select2_6").select2({
            placeholder: "Search for git repositories",
            allowClear: true,
            ajax: {
                url: "https://api.github.com/search/repositories",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.items,
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) {
                return markup;
            }, // let our custom formatter work
            minimumInputLength: 1,
            templateResult: formatRepo, // omitted for brevity, see the source of this page
            templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
        });

        // custom styles

        // tagging support
        $('#kt_select2_12_1, #kt_select2_12_2, #kt_select2_12_3, #kt_select2_12_4').select2({
            placeholder: "Select an option",
        });

        // disabled mode
        $('#kt_select2_7').select2({
            placeholder: "Select an option"
        });

        // disabled results
        $('#kt_select2_8').select2({
            placeholder: "Select an option"
        });

        // limiting the number of selections
        $('#kt_select2_9').select2({
            placeholder: "Select an option",
            maximumSelectionLength: 2
        });

        // hiding the search box
        $('#kt_select2_10').select2({
            placeholder: "Select an option",
            minimumResultsForSearch: Infinity
        });

        // tagging support
        $('#kt_select2_11').select2({
            placeholder: "Add a tag",
            tags: true
        });

        // disabled results
        $('.kt-select2-general').select2({
            placeholder: "Select an option"
        });
    }

    var modalDemos = function () {
        $('#kt_select2_modal').on('shown.bs.modal', function () {
            // basic
            $('#kt_select2_1_modal').select2({
                placeholder: "Seleccione Empresa"
            });

            // nested
            $('#kt_select2_2_modal').select2({
                placeholder: "Seleccione Sucursal"
            });

            // multi select
            $('#kt_select2_3_modal').select2({
                placeholder: "Seleccione a Tipo Usuario",
            });



            // basic
            $('#kt_select2_4_modal').select2({
                placeholder: "Select a state",
                allowClear: true
            });
        });

        $('#kt_select3_modal').on('shown.bs.modal', function () {

            $('#kt_select3_1_modal').select2({
                placeholder: "Seleccione Empresa"
            });

            // nested
            $('#kt_select3_2_modal').select2({
                placeholder: "Seleccione Sucursal"
            });

            // multi select
            $('#kt_select3_3_modal').select2({
                placeholder: "Seleccione a Tipo Usuario",
            });
        });

        $('#kt_select4_modal').on('shown.bs.modal', function () {

            $('#kt_select4_1_modal').select2({
                placeholder: "Seleccione Empresa"
            });

            // nested
            $('#kt_select4_2_modal').select2({
                placeholder: "Seleccione Sucursal"
            });

            // multi select
            $('#kt_select4_3_modal').select2({
                placeholder: "Seleccione a Tipo Usuario",
            });
        });

        $('#kt_select5_modal').on('shown.bs.modal', function () {

            $('#kt_select5_1_modal').select2({
                placeholder: "Seleccione Empresa"
            });

            // nested
            $('#kt_select5_2_modal').select2({
                placeholder: "Seleccione Sucursal"
            });

            // multi select
            $('#kt_select5_3_modal').select2({
                placeholder: "Seleccione a Tipo Usuario",
            });
        });

           $('#kt_select6_modal').on('shown.bs.modal', function () {

            $('#kt_select6_1_modal').select2({
                placeholder: "Seleccione Empresa"
            });

            // nested
            $('#kt_select6_2_modal').select2({
                placeholder: "Seleccione Sucursal"
            });

            // multi select
            $('#kt_select6_3_modal').select2({
                placeholder: "Seleccione a Tipo Usuario",
            });
        });

              $('#kt_select7_modal').on('shown.bs.modal', function () {

            $('#kt_select7_1_modal').select2({
                placeholder: "Seleccione Empresa"
            });

            // nested
            $('#kt_select7_2_modal').select2({
                placeholder: "Seleccione Region"
            });

            // multi select
            $('#kt_select7_3_modal').select2({
                placeholder: "Seleccione a Ciudad",
            });

            $('#kt_select7_4_modal').select2({
                placeholder: "Seleccione a Comuna",
            });
        });
    }

    // Public functions
    return {
        init: function () {
            demos();
            modalDemos();
        }
    };
}();

// Initialization
jQuery(document).ready(function () {
    KTSelect2.init();
});