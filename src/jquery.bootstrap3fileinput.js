/*
jQuery.Bootstrap3FileInput.js
--------------------------------------
Bootstrap 3 File Input - jQuery plugin which makes file inputs styled like the rest of Bootstrap 3 inputs.
By Lukasz Miedziński - @lmiedzinski https://github.com/lmiedzinski
Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
Based on previous work of:
	- Jorge Moreno @alterebro  https://github.com/alterebro/jQuery.NiceFileInput.js
*/
(function ($) {
    $.fn.bootstrap3FileInput = function (options) {
        var settings = {
            fileButtonTooltip: 'Browse...', // Default file button text
            fileButtonStyle: 'default', // Default file button style (default, success, danger...)
            clearButtonTooltip: 'Clear', // Default clear button text
            clearButtonStyle: 'default', // Default clear button style (default, success, danger...)
            fontAwesomeEnabled: true // Default enabled font awesome icons
        };

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function () {
            var self = this;

            if ($(self).attr('data-styled') === undefined) {

                var randomNumber = Math.round(Math.random() * 10000);
                var date = new Date();
                var id = date.getTime() + randomNumber.toString();

                var filename = $('<input type="text" class="form-control" readonly="readonly" title="">')
                    .addClass('NFI' + id);

                if (settings.fontAwesomeEnabled) {
                    var button = $('<button id="NFI-button-' + id + '" data-toggle="tooltip" data-placement="bottom" title="' + settings.fileButtonTooltip + '">')
                        .addClass('btn btn-' + settings.fileButtonStyle)
                        .attr('type', 'button')
                        .html('<i class="fa fa-folder-open fa-fw"></i>');

                    var clear = $('<button id="NFI-clear-' + id + '" data-toggle="tooltip" data-placement="bottom" title="' + settings.clearButtonTooltip + '">')
                        .addClass('btn btn-' + settings.clearButtonStyle)
                        .attr('type', 'button')
                        .html('<i class="fa fa-trash fa-fw"></i>');
                } else {
                    var button = $('<button id="NFI-button-' + id + '">')
                        .addClass('btn btn-' + settings.fileButtonStyle)
                        .attr('type', 'button')
                        .html(settings.fileButtonTooltip);

                    var clear = $('<button id="NFI-clear-' + id + '">')
                        .addClass('btn btn-' + settings.clearButtonStyle)
                        .attr('type', 'button')
                        .html(settings.clearButtonTooltip);
                }

                $(self).after(filename);
                $(self).before(button);
                $(self).addClass('NFI' + id)
                $('#NFI-button-' + id).wrap('<span class="input-group-btn NFI' + id + '"></span>');
                $('#NFI-button-' + id).after(clear);
                $('.NFI' + id).wrapAll('<div class="input-group" style="margin-bottom: 15px" id="NFI-wrapper-' + id + '" />');

                $("#NFI-wrapper-" + id).addClass($(self).attr("class"));

                $(self)
                    .css({
                        'display': 'none'
                    });

                $(self).on("change", function (e) {
                    const files = e.target.files;
                    let fileString = '';
                    for (let i = 0; i < files.length; i++) {
                        fileString += i > 0 ? ', ' + files.item(i).name : files.item(i).name;
                    }
                    filename.val(fileString);
                    filename.attr('title', fileString);
                });

                $('#NFI-button-' + id).click(() => {
                    $(self).click();
                });

                $(filename).click(() => {
                    $(self).click();
                });

                $('#NFI-clear-' + id).click(() => {
                    $(self).attr('type', 'text');
                    $(self).val('');
                    $(self).attr('type', 'file');
                    filename.val('');
                    filename.attr('title', '');
                });

                if (settings.fontAwesomeEnabled) {
                    $('#NFI-button-' + id).tooltip();
                    $('#NFI-clear-' + id).tooltip();
                }

                $(self).attr('data-styled', true);
            }
        });

    };
})(jQuery);