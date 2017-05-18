/* global $ */
(function() {
    'use strict';

    var i = 0,
        quantityType = $('#quantityType'),
        quantity = $('#quantity'),
        itemsPerCase = $('#itemsPerCase'),
        orderDate = $('#orderDate'),
        inspectionDate = $('#inspectionDate'),
        freight = $('#freight'),
        freightWell = $('#freightWell'),
        addItemButton = $('#addItemButton'),
        itemDiv = $('#itemDiv'),
        importCheckbox = $('#importCheckbox'),
        importWell = $('#importWell');


    function validateQTYvsPack() {
        if (quantityType.val() == 1 && quantity.val() % itemsPerCase.val() != 0) {
            if (quantity.val() === "" || itemsPerCase.val() === "") {
                return;
            }
            showModal(itemsPerCase.val(), quantity.val());
            quantity.val('');
        }
    }
    
    orderDate.datepicker();

    orderDate.val($.datepicker.formatDate('mm/dd/yy', new Date()));
    
    inspectionDate.datepicker();

    freight.change(() => {
        if (freight.val() >= 3) {
            freightWell.show();
        } else {
            freightWell.hide();
        }
    });

    quantityType.change(() => {
        validateQTYvsPack(); 
    });

    quantity.focusout(() => {
        validateQTYvsPack();
    });

    itemsPerCase.focusout(() => {
        validateQTYvsPack(); 
    });

    importCheckbox.change(() => {
        console.log('here');
        if (importCheckbox[0].checked) {
            importWell.show();
        } else {
            importWell.hide();
        }
    });

    function showModal(perCase, quantity) {
        if (alertModal) {
            alertModal.remove();
        }
        
        var alertModal = 
        $(
            '<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog modal-lg" role="document">' +
                '<div class="modal-content">' +
                '<div class="modal-body">' +
                    '<div id="alert" class="alert alert-danger" role="alert">' +
                        '<h3 class="text-center">INVALID QUANTITY</h3>' +
                        '<h4 class="text-center">Quantity (' + quantity + ') is not evenly divisible by Case Pack (' + perCase + ')</h4>' +
                        '<h5 class="text-center">Only complete cases are allowed</h5>' +
                    '</div>' +
                '</div>' +
                
                '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>' +
                '</div>' +
                '</div>' +
            '</div>' +
            '</div>'
        );

        alertModal.appendTo(document.body);
        alertModal.modal('show');
    }

    addItemButton.click(() => {
        let count = i++;
        $(  
            '<div id="' + count + '" class="col-md-8 col-md-offset-2 well well-lg item">' +
                    '<div class="form-group">' +
                        '<label class="col-md-2 control-label">Item:</label>' +
                        '<div class="col-md-3">' +
                            '<select class="form-control">' +
                                '<option>RJ14-12-P</option>' +
                                '<option>RJ14-4-M</option>' +
                                '<option>RJ11-SKG</option>' +
                            '</select>' +
                        '</div>' +
         
                        '<div class="col-md-4">' +
                            '<input type="text" class="form-control" placeholder="Search"/>' +
                        '</div>' +
                        '<div class="col-md-1 searchButton">' +
                            '<button class="btn btn-info glyph" type="button"><span class="glyphicon glyphicon-search"></span></button>' +
                        '</div>' +
                    
                        '<div class="col-md-2">' +
                            '<button class="btn btn-success col-md-12" type="button" disabled="disabled">New Item</button>' +
                        '</div>' +
                    '</div>' +


                   '<div class="form-group">' +
                        '<label class="col-md-2 control-label">Description:</label>' +
                        '<div class="col-md-10">' +
                            '<textarea class="form-control" rows="2" placeholder="Based on selected Item"></textarea>' +
                        '</div>' +
                    '</div>' +

                    '<div class="form-group">' +
                        '<label class="col-md-2 control-label">Per Case:</label>' +
                        '<div class="col-md-10">' +
                            '<input id="itemsPerCase" type="number" class="form-control" placeholder="Enter the number of items in one case"/>' +
                        '</div>' +
                    '</div>' +


                    '<div class="form-group">' +
                        '<label class="col-md-2 control-label">Quantity:</label>' +
                        '<div class="col-md-2">' +
                            '<select class="form-control">' +
                                '<option>Eaches</option>' +
                                '<option>Cases</option>' +
                            '</select>' +
                        '</div>' +
                        '<div class="col-md-4">' +
                            '<input type="number" class="form-control" placeholder="Number of Eaches/Cases"/>' +
                        '</div>' +
                        
                        '<div class="col-md-3 col-md-offset-1">' +
                            '<button class="btn btn-primary col-md-12 autofill" type="button" data-toggle="modal" data-target="#containerModal">Autofill By Container</button>' +
                        '</div>' +
                    '</div>' +

                    '<div class="form-group">' +
                        '<label class="col-md-2 control-label">Rate:</label>' +
                        '<div class="col-md-10">' +
                            '<input type="text" class="form-control" value="Based on selected Item and QTY type (This field is Read Only)" readonly/>' +
                        '</div>' +
                    '</div>' +

                    '<div class="form-group">' +
                        '<label class="col-md-2 control-label">Total:</label>' +
                        '<div class="col-md-10">' +
                            '<input type="text" class="form-control" value="Quantity * Rate (This field is Read Only)" readonly/>' +
                        '</div>' +
                    '</div>' +

                    '<div class="pull-right">' +
                        '<button class="btn btn-danger">Cancel</button>' +
                    '</div>' +

                '</div>' +
                '<div class="clearfix"></div>'
        )
        .appendTo(itemDiv)
        .find('button:last')
        .click(() => {
            $('#' + count).remove();
        });
    });
}());
