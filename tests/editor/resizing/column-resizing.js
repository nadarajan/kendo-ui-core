(function() {
    var ColumnResizing = kendo.ui.editor.ColumnResizing;
    var TableResizing = kendo.ui.editor.TableResizing;
    var cell;
    var cellIndex;
    var columnResizing;
    var fixture;
    var options;
    var initialWidthInPixels;
    var rows;
    var tableElement;
    var wrapper;
    var FIXTURE_SELECTOR = "#qunit-fixture";

    var DOT = ".";
    var RESIZE_HANDLE_CLASS = "k-column-resize-handle";
    var RESIZE_MARKER_CLASS = "k-column-resize-marker";
    var HANDLE_SELECTOR = DOT + RESIZE_HANDLE_CLASS;
    var MARKER_SELECTOR = DOT + RESIZE_MARKER_CLASS;

    var FIRST_COLUMN = "td:first";
    var SECOND_COLUMN = "tr:first td:nth-child(2)";
    var LAST_COLUMN = "tr:first td:last";
    var CONTENT_EDITABLE = "contenteditable";
    var PX = "px";

    var FALSE = "false";
    var TRUE = "true";
    var NS = "kendoEditorColumnResizing";
    var MAX = 123456;
    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";
    var PERCENTAGE = "%";
    var ROW = "tr";
    var COLUMN = "td";
    
    var TD = "td";
    var TH = "th";
    var TBODY = "tbody";
    var WIDTH = "width";

    var TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS =
        '<table id="table" class="k-table" style="width: 400px";padding:20px;>' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="width:100px;border:1px solid red;">col 11</td>' +
                '<td id="col12" class="col" style="width:100px;border:1px solid red;">col 12</td>' +
                '<td id="col13" class="col" style="width:100px;border:1px solid red;">col 13</td>' +
                '<td id="col14" class="col" style="width:100px;border:1px solid red;">col 14</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col" style="width:100px;border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="width:100px;border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="width:100px;border:1px solid red;">col 23</td>' +
                '<td id="col24" class="col" style="width:100px;border:1px solid red;">col 24</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col" style="width:100px;border:1px solid red;">col 31</td>' +
                '<td id="col32" class="col" style="width:100px;border:1px solid red;">col 32</td>' +
                '<td id="col33" class="col" style="width:100px;border:1px solid red;">col 33</td>' +
                '<td id="col34" class="col" style="width:100px;border:1px solid red;">col 34</td>' +
            '</tr>' +
        '</table>';
    var TABLE_WITH_COLUMNS_IN_PERCENTAGES =
        '<table id="table" class="k-table" style="width:200px";padding:30px;>' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="width:25%;border:1px solid red;">col 11</td>' +
                '<td id="col12" class="col" style="width:25%;border:1px solid red;">col 12</td>' +
                '<td id="col13" class="col" style="width:25%;border:1px solid red;">col 13</td>' +
                '<td id="col13" class="col" style="width:25%;border:1px solid red;">col 14</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col" style="width:25%;border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="width:25%;border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 23</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col21" class="col" style="width:25%;border:1px solid red;">col 31</td>' +
                '<td id="col22" class="col" style="width:25%;border:1px solid red;">col 32</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 33</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 34</td>' +
            '</tr>' +
            '<tr id="row4" class="row">' +
                '<td id="col21" class="col" style="width:25%;border:1px solid red;">col 41</td>' +
                '<td id="col22" class="col" style="width:25%;border:1px solid red;">col 42</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 43</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 44</td>' +
            '</tr>' +
        '</table>';
    var TABLE_WITH_COLUMNS_IN_PIXELS_AND_PERCENTAGES =
        '<table id="table" class="k-table" style="width: 400px";>' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="width:100px;border:1px solid red;">col 11</td>' +
                '<td id="col12" class="col" style="width:25%;border:1px solid red;">col 12</td>' +
                '<td id="col13" class="col" style="width:100px;border:1px solid red;">col 13</td>' +
                '<td id="col14" class="col" style="width:100px;border:1px solid red;">col 14</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col" style="width:100px;border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="width:25%;border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="width:100px;border:1px solid red;">col 23</td>' +
                '<td id="col24" class="col" style="width:100px;border:1px solid red;">col 24</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col" style="width:100px;border:1px solid red;">col 31</td>' +
                '<td id="col32" class="col" style="width:25%;border:1px solid red;">col 32</td>' +
                '<td id="col33" class="col" style="width:100px;border:1px solid red;">col 33</td>' +
                '<td id="col34" class="col" style="width:100px;border:1px solid red;">col 34</td>' +
            '</tr>' +
        '</table>';
    var TABLE_HTML =
        '<table id="table" class="k-table" style="padding:30px;>' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="border:1px solid red;">col 11</td>' +
                '<td id="col12" class="col" style="border:1px solid red;">col 12</td>' +
                '<td id="col13" class="col" style="border:1px solid red;">col 13</td>' +
                '<td id="col13" class="col" style="border:1px solid red;">col 14</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col" style="border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="border:1px solid red;">col 23</td>' +
                '<td id="col23" class="col" style="border:1px solid red;">col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col21" class="col" style="border:1px solid red;">col 31</td>' +
                '<td id="col22" class="col" style="border:1px solid red;">col 32</td>' +
                '<td id="col23" class="col" style="border:1px solid red;">col 33</td>' +
                '<td id="col23" class="col" style="border:1px solid red;">col 34</td>' +
            '</tr>' +
            '<tr id="row4" class="row">' +
                '<td id="col21" class="col" style="border:1px solid red;">col 41</td>' +
                '<td id="col22" class="col" style="border:1px solid red;">col 42</td>' +
                '<td id="col23" class="col" style="border:1px solid red;">col 43</td>' +
                '<td id="col23" class="col" style="border:1px solid red;">col 44</td>' +
            '</tr>' +
        '</table>';
    var NESTED_TABLE_HTML =
        '<table id="table" class="k-table">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col">' +
                    '<table id="nestedTable" class="k-table">' +
                        '<tr id="row1" class="row">' +
                            '<td id="col11" class="col">col 11</td>' +
                        '</tr>' +
                        '<tr id="row2" class="row">' +
                            '<td id="col21" class="col">col 21</td>' +
                        '</tr>' +
                    '</table>' +
                '</td>' +
                '<td id="col12" class="col">col 12</td>' +
                '<td id="col13" class="col">col 13</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col">+col 21</td>' +
                '<td id="col22" class="col">+col 22</td>' +
                '<td id="col23" class="col">+col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col">+col 31</td>' +
                '<td id="col32" class="col">+col 32</td>' +
                '<td id="col33" class="col">+col 33</td>' +
            '</tr>' +
        '</table>';
    var CONTENT_HTML = '<div id="wrapper">' + TABLE_HTML + '</div>';

    function resizeColumn(column, from, to, options) {
        triggerBorderHover(column, options);

        triggerResize(column, from, to, options);

        triggerResizeEnd(column);
    }

    function triggerBorderHover(element, options) {
        var rtl = (options || {}).rtl;
        var width = rtl ? 0 : $(element).outerWidth();

        triggerEvent(element, {
            type: MOUSE_MOVE,
            clientX: $(element).offset().left + width - $(element.ownerDocument).scrollLeft(),
            clientY: 0,
            buttons: 0
        });
    }

    function triggerResize(element, from, to, options) {
        triggerBorderHover(element, options);

        var doc = $(element[0].ownerDocument.documentElement);
        var resizeHandle = $(QUnit.fixture).find(HANDLE_SELECTOR);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        triggerResizeStart(element, from, to);

        doc.trigger($.Event(MOUSE_MOVE, {
            pageX: position.left + to,
            pageY: 0,
            buttons: 0
        }));
    }

    function triggerResizeStart(element, from, to) {
        var resizeHandle = $(QUnit.fixture).find(HANDLE_SELECTOR);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        resizeHandle.trigger($.Event(MOUSE_DOWN, {
            pageX: position.left + from,
            pageY: 0,
            buttons: 0
        }));
    }

    function triggerResizeEnd(column) {
        $(column[0].ownerDocument.documentElement).trigger($.Event(MOUSE_UP));
    }

    function triggerEvent(element, eventOptions) {
        var options = $.extend({
            type: "mousedown",
            pageX: 0,
            pageY: 0,
            buttons: 0
        }, eventOptions || {});

        $(element).trigger(options);
    }

    function getColumnWidths(table, columnIndex, preferComputedStyles) {
        var columns = $(tableElement).find(ROW).children(COLUMN)
            .filter(function() {
                return ($(this).index() === columnIndex);
            });

        return calculateColumnWidths(columns, preferComputedStyles);
    }

    function calculateColumnWidths(columns, preferComputedStyles) {
        var columnWidths = columns.map(function() {
            var cell = this;

            if (preferComputedStyles) {
                return $(cell).outerWidth();
            }
            else {
                return parseFloat(cell.style.width);
            }
        });

        return columnWidths;
    }

    module("editor column resizing", {
        setup: function() {
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(QUnit.fixture)[0];
        },

        teardown: function() {
            $(".table").remove();
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not be initialized with element that is different from table", function() {
        columnResizing = new ColumnResizing(QUnit.fixture, {});

        equal(columnResizing.element, undefined);
    });

    test("should be initialized with table element", function() {
        columnResizing = new ColumnResizing(tableElement, {});

        equal(columnResizing.element, tableElement);
    });

    test("should be initialized with default options", function() {
        var defaultOptions = {
            tags: ["td", "th"],
            min: 20,
            rootElement: null,
            eventNamespace: ".kendoEditorColumnResizing",
            rtl: false,
            handle: {
                dataAttribute: "column",
                width: 10,
                height: 0,
                classNames: {
                    handle: "k-column-resize-handle",
                    marker: "k-column-resize-marker"
                },
                template:
                    '<div class="k-column-resize-handle" unselectable="on" contenteditable="false">' +
                        '<div class="k-column-resize-marker"></div>' +
                    '</div>'
            }
        };

        columnResizing = new ColumnResizing(tableElement, {});

        deepEqual(columnResizing.options, defaultOptions);
    });

    test("should be initialized with custom tags", function() {
        var options = { tags: ["th"] };

        columnResizing = new ColumnResizing(tableElement, options);

        deepEqual(columnResizing.options.tags, ["th"]);
    });

    test("should be initialized with an array of tags", function() {
        var options = { tags: "tag" };

        columnResizing = new ColumnResizing(tableElement, options);

        deepEqual(columnResizing.options.tags, ["tag"]);
    });

    test("mousemove handlers should be attached to all columns", function() {
        columnResizing = new ColumnResizing(tableElement, {});

        assertEvent(tableElement, { type: MOUSE_MOVE, selector: "td,th", namespace: NS });
    });

    test("mousemove handlers should be attached to custom tags", function() {
        columnResizing = new ColumnResizing(tableElement, { tags: ["th", "td"] });

        assertEvent(tableElement, { type: MOUSE_MOVE, selector: "th,td", namespace: NS });
    });

    module("editor column resizing resize handle", {
        setup: function() {
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering the border of the first cell should append resize handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    test("hovering the border of the first cell multiple times should append only one resize handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);
        triggerBorderHover(cell);
        triggerBorderHover(cell);

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    test("hovering the last cell should not create resize handle", function() {
        var cell = $(columnResizing.element).find("tr:first td:last");

        triggerBorderHover(cell);

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).length, 0);
    });

    test("resize handle should be stored as a reference", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR)[0], columnResizing.resizeHandle[0]);
    });

    test("resize handle left offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var cellWidth = cell[0].offsetWidth;
        var leftOffset = cell.offset().left;

        triggerBorderHover(cell);

        roughlyEqual(columnResizing.resizeHandle.css("left"), cellWidth + leftOffset - (columnResizing.options.handle.width / 2) + PX, 0.01);
    });

    test("resize handle left offset should not be lower than min", function() {
        var cell = $(columnResizing.element).find(SECOND_COLUMN);
        var cellWidth = cell.outerWidth();
        var leftOffset = cell.offset().left;

        triggerResize(cell, leftOffset + cellWidth, leftOffset + cellWidth - MAX);

        roughlyEqual(columnResizing.resizeHandle.css("left"), leftOffset + options.min + PX, 1);
    });

    test("resize handle left offset should not be greater than max", function() {
        var cell = $(columnResizing.element).find(SECOND_COLUMN);
        var cellWidth = cell[0].offsetWidth;
        var leftOffset = cell.offset().left;

        triggerResize(cell, leftOffset + cellWidth, leftOffset + cellWidth + MAX);

        roughlyEqual(columnResizing.resizeHandle.css("left"),
            leftOffset + cellWidth + cell.next().outerWidth() - options.handle.width - options.min + PX, 1);
    });

    test("resize handle top offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("top"), $(tableElement).find(TBODY).position().top + PX);
    });

    test("resize handle width should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("width"), columnResizing.options.handle.width + PX);
    });

    test("resize handle height should be equal to table body height", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("height"), $(tableElement).find(TBODY).css("height"));
    });

    test("resize handle should be shown on hover", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("display"), "block");
    });

    test("resize handle should be removed when leaving the cell border", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        $(columnResizing.resizeHandle).show();

        triggerEvent(cell, { type: MOUSE_MOVE, pageX: MAX });

        equal($(columnResizing.options.rootElement).find(HANDLE_SELECTOR).length, 0);
    });

    test("resize handle should store data about resizing cell", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.data("column"), cell[0]);
    });

    test("resize handle should be recreated when resizing a different column", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var initialResizeHandle = columnResizing.resizeHandle;
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(columnResizing.resizeHandle !== initialResizeHandle);
    });

    test("resize handle should be removed when resizing a different column", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        equal($(columnResizing.options.rootElement).find(HANDLE_SELECTOR).length, 1);
    });

    test("resize handle should be re-created when hovering a different column", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        equal($(columnResizing.options.rootElement).find(HANDLE_SELECTOR).length, 1);
    });

    test("resize handle should be removed from the column on resize end", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell[0].offsetWidth;
        triggerBorderHover(cell);

        resizeColumn(cell, initialWidth, initialWidth + 10);

        equal($(columnResizing.options.rootElement).find(HANDLE_SELECTOR).length, 0);
    });

    test("resize handle reference should be removed on resize end", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);

        resizeColumn(cell, cell[0].offsetWidth, cell[0].offsetWidth + 10);

        equal(columnResizing.resizeHandle, null);
    });

    module("editor column resizing resize handle", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
            cell = $(columnResizing.element).find(FIRST_COLUMN);
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not be shown if mouse button is pressed", function() {
        columnResizing.showResizeHandle(cell, { buttons: 1 });

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).length, 0);
    });

    test("should be shown if mouse button is not pressed", function() {
        columnResizing.showResizeHandle(cell, { buttons: 0 });

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    module("editor column resizing resize handle show", {
        setup: function() {
            wrapper = $("<div id='wrapper' contenteditable='true' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(wrapper);
            columnResizing = new ColumnResizing(tableElement[0], {
                rootElement: wrapper
            });
            cell = $(columnResizing.element).find(FIRST_COLUMN);
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should disable editing in the root element", function() {
        columnResizing.showResizeHandle(cell, { buttons: 0 });

        equal($(columnResizing.options.rootElement).attr(CONTENT_EDITABLE), FALSE);
    });

    module("editor column resizing existing resize handle", {
        setup: function() {
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be shown when hovering a column", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("display"), "block");
    });

    test("should be shown when hovering a cell for a second time", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        triggerEvent(cell, { type: MOUSE_MOVE, pageX: MAX });

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("display"), "block");
    });

    test("should be shown when resizing is in progress", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();
        triggerBorderHover(cell);
        columnResizing.resizingInProgress = function() { return true; };

        triggerResize(cell, initialWidth, initialWidth + 10);

        equal(columnResizing.resizeHandle.css("display"), "block");
    });

    test("should be shown when resizing is not in progress", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();
        triggerBorderHover(cell);
        columnResizing.resizingInProgress = function() { return false; };

        triggerResize(cell, initialWidth, initialWidth + 10);

        equal(columnResizing.resizeHandle.css("display"), "block");
    });

    module("editor column resizing resize hint marker", {
        setup: function() {
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("resize hint marker should not be visible on column border hover", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).children(MARKER_SELECTOR).css("display"), "none");
    });

    test("should be visible on resize start", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();
        triggerBorderHover(cell);

        triggerResizeStart(cell, initialWidth, initialWidth + 10);

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).children(MARKER_SELECTOR).css("display"), "block");
    });

    test("should be visible while resizing", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();

        triggerResize(cell, initialWidth, initialWidth + 10);

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).children(MARKER_SELECTOR).css("display"), "block");
    });

    test("should be visible on resize handle mouse down", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);

        triggerEvent(columnResizing.resizeHandle, { type: MOUSE_DOWN });

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).children(MARKER_SELECTOR).css("display"), "block");
    });

    test("should not be visible on resize handle mouse up", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);

        triggerEvent(columnResizing.resizeHandle, { type: MOUSE_UP });

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).children(MARKER_SELECTOR).css("display"), "none");
    });

    editor_module("editor column resizing resize handle", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.tableResizing = null;
            $(editor.body).append($(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS)[0]);
            tableElement = $(editor.body).find("#table")[0];
            columnResizing = editor.columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            editor.columnResizing.destroy();
            columnResizing.destroy();
            removeMocksIn(editor.columnResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not be remove when moving out of a table ", function() {
        triggerBorderHover($(columnResizing.element).find(FIRST_COLUMN));

        triggerEvent(tableElement, { type: MOUSE_LEAVE });

        equal($(columnResizing.options.rootElement).find(HANDLE_SELECTOR).length, 1);
    });

    test("should be initialized when hovering a scrolled editor document", function() {
        $(tableElement).width($(editor.document).width() + 100);
        $(editor.document).scrollLeft(20);

        triggerBorderHover($(tableElement).find(SECOND_COLUMN)[0]);

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    module("editor column resizing destroy", {
        setup: function() {
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            cell = $(columnResizing.element).find(FIRST_COLUMN);
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should detach event handlers", function() {
        columnResizing.destroy();

        equal(jQueryEvents(columnResizing.element), undefined);
    });

    test("should set element to null", function() {
        columnResizing.destroy();

        equal(columnResizing.element, null);
    });

    test("should remove resize handle from DOM", function() {
        triggerBorderHover(cell)

        columnResizing.destroy();

        equal($(columnResizing.options.rootElement).find(HANDLE_SELECTOR).length, 0);
    });

    test("should set resize handle to nullM", function() {
        triggerBorderHover(cell)

        columnResizing.destroy();

        equal(columnResizing.resizeHandle, null);
    });

    test("should call resizable destroy", function() {
        triggerBorderHover(cell);
        var destroySpy = spy(columnResizing._resizable, "destroy");

        columnResizing.destroy();

        equal(destroySpy.calls("destroy"), 1);
    });

    test("should remove resizable reference", function() {
        triggerBorderHover(cell);

        columnResizing.destroy();

        equal(columnResizing._resizable, null);
    });

    module("editor column resizing", {
        setup: function() {
            wrapper = $("<div id='wrapper' contenteditable='true' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(wrapper);
            columnResizing = new ColumnResizing(tableElement[0], {
                rootElement: wrapper
            });
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering the border of a cell should disable editing in the root element", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal($(columnResizing.options.rootElement).attr(CONTENT_EDITABLE), FALSE);
    });

    test("hovering the border of a cell should disable the editing in editable root element", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        $(wrapper).removeAttr(CONTENT_EDITABLE);
        $(wrapper).removeAttr(CONTENT_EDITABLE, "");

        triggerBorderHover(cell);

        equal($(columnResizing.options.rootElement).attr(CONTENT_EDITABLE), undefined);
    });

    test("hovering the border of a cell should not disable editing in non-editable root element", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        $(wrapper).removeAttr(CONTENT_EDITABLE);

        triggerBorderHover(cell);

        equal($(columnResizing.options.rootElement).attr(CONTENT_EDITABLE), undefined);
    });

    test("leaving the border of a cell should enable editing in the root element", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);

        triggerEvent(cell, { type: MOUSE_MOVE, pageX: MAX });

        equal($(columnResizing.options.rootElement).attr(CONTENT_EDITABLE), TRUE);
    });

    test("leaving a cell should not change editing of the root element when resizing is in progress", function() {
        var editable = $(columnResizing.options.rootElement).attr(CONTENT_EDITABLE);
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        columnResizing.resizingInProgress = function() { return true; };
        triggerBorderHover(cell);

        triggerEvent(cell, { type: MOUSE_MOVE, pageX: MAX });

        equal($(columnResizing.options.rootElement).attr(CONTENT_EDITABLE), editable);
    });

    test("leaving a cell should enable editing in the root element when resizing is not progress", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        columnResizing.resizingInProgress = function() { return false; };
        triggerBorderHover(cell);

        triggerEvent(cell, { type: MOUSE_MOVE, pageX: MAX });

        equal($(columnResizing.options.rootElement).attr(CONTENT_EDITABLE), TRUE);
    });

    test("resizing a column should not change the editing of the root element", function() {
        var editable = $(columnResizing.options.rootElement).attr(CONTENT_EDITABLE);
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();

        resizeColumn(cell, initialWidth, initialWidth + 10);

        equal($(columnResizing.options.rootElement).attr(CONTENT_EDITABLE), editable);
    });

    module("editor column resizing destroy", {
        setup: function() {
            wrapper = $("<div id='wrapper' contenteditable='true' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(wrapper);
            columnResizing = new ColumnResizing(tableElement[0], {
                rootElement: wrapper
            });
            cell = tableElement.find(FIRST_COLUMN);
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("destroy should not change the editing of the root element", function() {
        columnResizing.destroy();

        equal($(wrapper).attr(CONTENT_EDITABLE), TRUE);
    });

    module("editor column resizing resizable", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a cell should initialize resizable", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        ok(cell.data("kendoResizable") instanceof kendo.ui.Resizable);
    });

    test("hovering a second cell should destroy the resizable of the initial cell", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(cell.data("kendoResizable") === undefined);
    });
    
    test("hovering a second cell should create resizable for second cell", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(secondCell.data("kendoResizable") instanceof kendo.ui.Resizable);
    });

    module("editor column resizing in pixels", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
            cell = $(columnResizing.element).find(FIRST_COLUMN);
            cellIndex = cell.index();
            initialWidthInPixels = cell.outerWidth();
            adjacentColumnWidthInPixels = cell.next().outerWidth();
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("cell width should be increased when resizing", function() {
        var differenceInPixels = 60;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        equal(cell[0].style.width, (initialWidthInPixels + differenceInPixels + PX));
    });

    test("cell width should be decreased when resizing", function() {
        var differenceInPixels = (-1) * 60;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        roughlyEqual(cell[0].style.width, (initialWidthInPixels + differenceInPixels) + PX, 2);
    });

    test("cell width should not be lower than min", function() {
        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        equal(cell[0].style.width, options.min + PX);
    });

    test("cell width should not be greater than the sum of column and adjacent column width", function() {
        var differenceInPixels = MAX;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        equal(cell[0].style.width, (initialWidthInPixels + adjacentColumnWidthInPixels - options.min) + PX);
    });

    test("all columns with the same index in other rows should be resized", function() {
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = 60;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex].style.width, (initialWidthInPixels + differenceInPixels) + PX);
        }
    });

    test("all columns to the right in other rows should be decreased", function() {
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = 60;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, (adjacentColumnWidthInPixels - differenceInPixels) + PX);
        }
    });

    test("all columns to the right in other rows should be increased", function() {
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = (-1) * 60;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, (adjacentColumnWidthInPixels - differenceInPixels) + PX);
        }
    });

    test("width of all columns to the right in other rows should not be lower than min", function() {
        var rows = $(columnResizing.element).find(ROW);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + MAX);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, options.min + PX);
        }
    });

    test("width of all columns to the right in other rows should not be greater than the sum of column and adjacent column width", function() {
        var rows = $(columnResizing.element).find(ROW);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width,
                (initialWidthInPixels + adjacentColumnWidthInPixels - options.min) + PX);
        }
    });

    test("all columns with different index in other rows should be resized", function() {
        var differenceInPixels = 20;
        var otherColumns = $(columnResizing.element).find(COLUMN).filter(function() {
            return $(this).index() !== cellIndex && $(this).index() !== (cellIndex + 1);
        });
        var columnWidths = calculateColumnWidths(otherColumns);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < otherColumns.length; i++) {
            roughlyEqual(otherColumns[i].style.width, otherColumns[i].offsetWidth + PX, 1);
        }
    });

    module("editor column resizing resizingInProgress", {
        setup: function() {
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be false on resize start", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();

        triggerBorderHover(cell);

        ok(columnResizing.resizingInProgress() === false);
    });

    test("should be true during resizing", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();

        triggerResize(cell, initialWidth, initialWidth + 10);
    
        ok(columnResizing.resizingInProgress() === true);
    });

    test("should be false after resize end", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();

        resizeColumn(cell, initialWidth, initialWidth + 10);

        ok(columnResizing.resizingInProgress() === false);
    });

    module("editor column resizing in percentages", {
        setup: function() {
            tableElement = $(TABLE_WITH_COLUMNS_IN_PERCENTAGES).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
            cell = $(columnResizing.element).find(SECOND_COLUMN);
            cellIndex = cell.index();
            rows = $(columnResizing.element).find(ROW);
            initialWidthInPixels = cell.outerWidth();
            tableBodyWidth = $(tableElement).children(TBODY).outerWidth();
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should resize column in percentages", function() {
        var differenceInPixels = 20;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        roughlyEqual(cell[0].style.width, ((initialWidthInPixels + differenceInPixels) / tableBodyWidth * 100) + PERCENTAGE, 0.001);
    });

    test("column width should not be greater than the sum of column and adjacent column width", function() {
        var adjacentColumnWidth = cell.next().outerWidth();

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + MAX);

        roughlyEqual(cell[0].style.width, ((initialWidthInPixels + adjacentColumnWidth - options.min) / tableBodyWidth * 100)  + PERCENTAGE, 0.0001);
    });

    test("column width should not be lower than min", function() {
        var minInPercentages = (options.min / $(tableElement).children(TBODY).outerWidth()) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        roughlyEqual(cell[0].style.width, minInPercentages + PERCENTAGE, 0.001);
    });

    test("all columns with the same index in other rows should be resized", function() {
        var differenceInPixels = 20;
        var initialAdjacentColumnWidths = $(tableElement).children(TBODY).children(ROW).children(COLUMN)
            .filter(function() {
                return ($(this).index() === cellIndex);
            })
            .map(function() {
                return $(this).outerWidth();
            });

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex].style.width,
                ((initialAdjacentColumnWidths[i] + differenceInPixels) / tableBodyWidth * 100) + PERCENTAGE, 0.001);
        }
    });

    test("all columns to the right in other rows should be resized", function() {
        var differenceInPixels = 20;
        var differenceInPercentages = (differenceInPixels /  $(tableElement).outerWidth()) * 100;
        var initialAdjacentColumnWidths = getColumnWidths(tableElement, cellIndex + 1);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);
        
        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex + 1].style.width, (initialAdjacentColumnWidths[i] - differenceInPercentages) + PERCENTAGE, 1.5);
        }
    });

    test("width of all columns with the same index should not be greater than the sum of column and adjacent column width", function() {
        var differenceInPixels = 20;
        var initialAdjacentColumnWidths = $(tableElement).children(TBODY).children(ROW).children(COLUMN)
            .filter(function() {
                return ($(this).index() === cellIndex);
            })
            .map(function() {
                return $(this).outerWidth();
            });

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + MAX);

        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex].style.width,
                ((initialWidthInPixels + initialAdjacentColumnWidths[i] - options.min) / tableBodyWidth * 100) + PERCENTAGE, 1);
        }
    });

    test("width of all columns with the same index should not be lower than 0", function() {
        var minInPercentages = (options.min / $(tableElement).outerWidth()) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex].style.width, minInPercentages + PERCENTAGE, 0.21);
        }
    });

    test("width of all columns to the right should not be greater than the sum of column and adjacent column width", function() {
        var initialWidthInPercentages = parseFloat(cell[0].style.width);
        var initialAdjacentColumnWidths = getColumnWidths(tableElement, cellIndex + 1);
        var minInPercentages = (options.min / $(tableElement).outerWidth()) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);
        
        for (var i = 0; i < rows.length; i++) {
        roughlyEqual($(rows[i]).children()[cellIndex + 1].style.width,
            (initialWidthInPercentages + initialAdjacentColumnWidths[i] - minInPercentages) + PERCENTAGE, 2.5);
        }
    });

    test("width of all columns to the right should not be lower than min", function() {
        var minInPercentages = (options.min / $(tableElement).outerWidth()) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + MAX);

        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex + 1].style.width, minInPercentages + PERCENTAGE, 0.21);
        }
    });

    test("all columns with different index in other rows should not be resized", function() {
        var otherColumns = $(columnResizing.element).find(COLUMN).filter(function() {
            return $(this).index() !== cellIndex && $(this).index() !== (cellIndex + 1);
        });
        var columnWidths = calculateColumnWidths(otherColumns);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + 20);

        for (var i = 0; i < otherColumns.length; i++) {
            roughlyEqual(otherColumns[i].style.width, columnWidths[i] + PERCENTAGE, 1.5);
        }
    });

    module("editor column resizing in mixed units", {
        setup: function() {
            tableElement = $(TABLE_WITH_COLUMNS_IN_PIXELS_AND_PERCENTAGES).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
            rows = $(columnResizing.element).find(ROW);
            cell = $(columnResizing.element).find(SECOND_COLUMN);
            cellIndex = cell.index();
            initialWidthInPixels = cell.outerWidth();
            tableBodyWidth = $(tableElement).children(TBODY).outerWidth();
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("column width in percentages should be resized in percentages", function() {
        var differenceInPixels = 20;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        roughlyEqual(cell[0].style.width, ((initialWidthInPixels + differenceInPixels) / tableBodyWidth * 100) + PERCENTAGE, 0.75);
    });

    test("top and bottom columns width in percentages should be resized in percentages", function() {
        var differenceInPixels = 20;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex].style.width,
                ((initialWidthInPixels + differenceInPixels) / tableBodyWidth * 100) + PERCENTAGE, 1.5);
        }
    });

    test("adjacent columns in pixels should be resized in pixels", function() {
        var differenceInPixels = 20;
        var initialAdjacentColumnWidths = getColumnWidths(tableElement, cellIndex + 1, true);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex + 1].style.width, (initialAdjacentColumnWidths[i] - differenceInPixels) + PX, 1);
        }
    });

    test("adjacent columns in percentages should be resized in percentages", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var cellIndex = cell.index();
        var differenceInPixels = 20;
        var differenceInPercentages = (differenceInPixels / $(tableElement).outerWidth()) * 100;
        var initialWidthInPixels = cell.width();
        var initialAdjacentColumnWidths= getColumnWidths(tableElement, cellIndex + 1);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex + 1].style.width, (initialAdjacentColumnWidths[i] - differenceInPercentages) + PERCENTAGE, 1.5);
        }
    });

    module("editor column resizing without explicit dimensions", {
        setup: function() {
            wrapper = $("<div id='wrapper'></div>").appendTo(QUnit.fixture).css({ width: "400px" });
            tableElement = $(TABLE_HTML).appendTo(wrapper);
            columnResizing = new ColumnResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
            cell = $(columnResizing.element).find(FIRST_COLUMN);
            cellIndex = cell.index();
            initialWidthInPixels = cell.outerWidth();
            adjacentColumnWidthInPixels = cell.next().outerWidth();
            rows = $(columnResizing.element).find(ROW);
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set computed style width in pixels to its element", function() {
        var width = tableElement.outerWidth();

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + 10);

        equal(tableElement[0].style.width, width + PX);
    });

    test("should override style width", function() {
        tableElement[0].style.width = "1px";
        var width = tableElement.outerWidth();

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + 10);

        equal(tableElement[0].style.width, width + PX);
    });

if (kendo.support.browser.mozilla) {
    test("should set computed style width in percentages to its element", function() {
        tableElement[0].style.width = "1%";

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + 20);

        roughlyEqual(tableElement[0].style.width, "40%", 5.5);
    });
}
else {
    test("should set computed style width in percentages to its element", function() {
        tableElement[0].style.width = "1%";

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + 20);

        roughlyEqual(tableElement[0].style.width, "40%", 1.5);
    });
}

    module("editor column resizing without explicit dimensions", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture);
            columnResizing = new ColumnResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
            cell = $(columnResizing.element).find(FIRST_COLUMN);
            cellIndex = cell.index();
            initialWidthInPixels = cell.outerWidth();
            adjacentColumnWidthInPixels = cell.next().outerWidth();
            rows = $(columnResizing.element).find(ROW);
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("cell width should be increased when resizing", function() {
        var differenceInPixels = 10;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        equal(cell[0].style.width, (initialWidthInPixels + differenceInPixels + PX));
    });

    test("cell width should be decreased when resizing", function() {
        var differenceInPixels = (-1) * 10;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        roughlyEqual(cell[0].style.width, (initialWidthInPixels + differenceInPixels) + PX, 2);
    });

    test("cell width should not be lower than min", function() {
        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        equal(cell[0].style.width, options.min + PX);
    });

    test("cell width should not be greater than the sum of column and adjacent column width", function() {
        var differenceInPixels = MAX;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        equal(cell[0].style.width, (initialWidthInPixels + adjacentColumnWidthInPixels - options.min) + PX, 2);
    });

    test("all columns with the same index in other rows should be resized", function() {
        var differenceInPixels = 10;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            roughlyEqual($(rows[i]).children()[cellIndex].style.width, (initialWidthInPixels + differenceInPixels) + PX, 1);
        }
    });

    test("all columns to the right in other rows should be decreased", function() {
        var differenceInPixels = 10;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, (adjacentColumnWidthInPixels - differenceInPixels) + PX);
        }
    });

    test("all columns to the right in other rows should be increased", function() {
        var differenceInPixels = (-1) * 10;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, (adjacentColumnWidthInPixels - differenceInPixels) + PX);
        }
    });

    test("width of all columns to the right in other rows should not be lower than min", function() {
        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + MAX);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, options.min + PX);
        }
    });

    test("width of all columns to the right in other rows should not be greater than the sum of column and adjacent column width", function() {
        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width,
                (initialWidthInPixels + adjacentColumnWidthInPixels - options.min) + PX);
        }
    });

    test("all columns with different index in other rows should not be resized", function() {
        var differenceInPixels = 20;
        var otherColumns = $(columnResizing.element).find(COLUMN).filter(function() {
            return $(this).index() !== cellIndex && $(this).index() !== (cellIndex + 1);
        });
        var columnWidths = calculateColumnWidths(otherColumns, true);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < otherColumns.length; i++) {
            //due to setting the size of the table in Chromium and Firefox, works in Chrome
            roughlyEqual($(otherColumns[i]).outerWidth(), columnWidths[i], 5);
        }
    });

    module("editor column resizing rtl", {
        setup: function() {
            var wrapper = $("<div id='wrapper' class='k-rtl' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(wrapper);
            columnResizing = new ColumnResizing(tableElement[0], {
                rtl: true,
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });
    
    test("hovering the border of the first cell should create resize handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell, { rtl: true });

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    test("hovering the border of the last cell should not create resize handle", function() {
        var cell = $(columnResizing.element).find(LAST_COLUMN);

        triggerBorderHover(cell, { rtl: true });

        equal($(columnResizing.options.rootElement).children(HANDLE_SELECTOR).length, 0);
    });

    module("editor column resizing rtl", {
        setup: function() {
            wrapper = $("<div id='wrapper' class='k-rtl' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(wrapper);
            columnResizing = new ColumnResizing(tableElement[0], {
                rtl: true,
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("resize handle left offset should be set", function() {
        var cell = $(columnResizing.element).find(SECOND_COLUMN);
        var leftOffset = cell.offset().left;

        triggerBorderHover(cell, { rtl: true });

        roughlyEqual(columnResizing.resizeHandle.css("left"), leftOffset - (options.handle.width / 2) + PX, 1);
    });

    test("resize handle left offset should be increased while resizing", function() {
        var cell = $(columnResizing.element).find(SECOND_COLUMN);
        var leftOffset = cell.offset().left;
        var differenceInPixels = 10;

        triggerResize(cell, 0, differenceInPixels, { rtl: true });

        roughlyEqual(columnResizing.resizeHandle.css("left"), leftOffset + differenceInPixels - (options.handle.width / 2) + PX, 1);
    });

    test("resize handle left offset should be decreased while resizing", function() {
        var cell = $(columnResizing.element).find(SECOND_COLUMN);
        var leftOffset = cell.offset().left;
        var differenceInPixels = (-1) * 10;

        triggerResize(cell, 0, differenceInPixels, { rtl: true });

        roughlyEqual(columnResizing.resizeHandle.css("left"), leftOffset + differenceInPixels - (options.handle.width / 2) + PX, 1);
    });
    test("resize handle left offset should not be lower than min", function() {
        var cell = $(columnResizing.element).find(SECOND_COLUMN);
        var leftOffset = cell.offset().left;
        var adjacentColumnWidth = cell.next().outerWidth();

        triggerResize(cell, 0, (-1) * MAX, { rtl: true });

        roughlyEqual(columnResizing.resizeHandle.css("left"), leftOffset - adjacentColumnWidth + options.min + PX, 1);
    });

    test("resize handle left offset should not be greater than max", function() {
        var cell = $(columnResizing.element).find(SECOND_COLUMN);
        var initialWidth = cell[0].offsetWidth;
        var leftOffset = cell.offset().left;

        triggerResize(cell, 0, MAX, { rtl: true });

        roughlyEqual(columnResizing.resizeHandle.css("left"), leftOffset + initialWidth - options.handle.width - options.min + PX, 1);
    });

    test("resize handle top offset should be set", function() {
        var cell = $(columnResizing.element).find(SECOND_COLUMN);

        triggerBorderHover(cell, { rtl: true });

        equal(columnResizing.resizeHandle.css("top"), $(tableElement).find(TBODY).position().top + PX);
    });

    module("editor column resizing rtl", {
        setup: function() {
            var wrapper = $("<div id='wrapper' class='k-rtl' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_IN_PIXELS_WITH_COLUMNS_IN_PIXELS).appendTo(wrapper);
            columnResizing = new ColumnResizing(tableElement[0], {
                rtl: true,
                rootElement: QUnit.fixture
            });
            options = columnResizing.options;
            cell = $(columnResizing.element).find(FIRST_COLUMN);
            initialWidthInPixels = cell.outerWidth()
        },

        teardown: function() {
            columnResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("cell width should be increased when resizing", function() {
        var differenceInPixels = (-1) * 60;

        resizeColumn(cell, 0, differenceInPixels, { rtl: true });

        equal(cell[0].style.width, (initialWidthInPixels + (-1) * differenceInPixels) + PX);
    });

    test("cell width should be decreased when resizing", function() {
        var differenceInPixels = 60;

        resizeColumn(cell, 0, differenceInPixels, { rtl: true });

        equal(cell[0].style.width, (initialWidthInPixels + (-1) * differenceInPixels) + PX);
    });

    test("cell width should not be lower than min", function() {
        resizeColumn(cell, 0, MAX, { rtl: true });

        equal(cell[0].style.width, options.min + PX);
    });

    test("cell width should not be greater than the sum of column and adjacent column width", function() {
        var adjacentColumnWidthInPixels = cell.next().outerWidth();

        resizeColumn(cell, 0, (-1) * MAX, { rtl: true });

        equal(cell[0].style.width, (initialWidthInPixels + adjacentColumnWidthInPixels - options.min) + PX);
    });

    editor_module("editor column resizing initialization", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.columnResizing = null;
            $(editor.body).append($(CONTENT_HTML)[0]);
            $(TABLE_HTML).attr("id", "table2").appendTo(editor.body)[0];
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.columnResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a table should initialize column resizing", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        ok(editor.columnResizing instanceof kendo.ui.editor.ColumnResizing);
    });

    test("hovering a table should initialize column resizing with table element", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(editor.columnResizing.element, table);
    });

    test("hovering a table should initialize column resizing with custom options", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(editor.columnResizing.options.rtl, false);
        equal(editor.columnResizing.options.rootElement, editor.body);
    });

    test("hovering a different table should destroy current column resizing", function() {
        var table = $(editor.body).find("#table")[0];
        var anotherTable = $(editor.body).find("#table2")[0];
        var columnResizing = editor.columnResizing = new ColumnResizing(table, {});
        trackMethodCall(columnResizing, "destroy");

        triggerEvent(anotherTable, { type: MOUSE_ENTER });

        equal(columnResizing.destroy.callCount, 1);
    });

    test("hovering the same table twice should not destroy current column resizing", function() {
        var table = $(editor.body).find("#table")[0];
        var columnResizing = editor.columnResizing = new ColumnResizing(table, {});
        trackMethodCall(columnResizing, "destroy");

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(columnResizing.destroy.callCount, 0);
    });

    test("leaving a table should not destroy column resizing", function() {
        var table = $(editor.body).find("#table")[0];
        var columnResizing = editor.columnResizing = new ColumnResizing(table, {});
        editor.columnResizing.resizingInProgress = function() { return false; };
        var mock = editor.columnResizing;
        trackMethodCall(mock, "destroy");

        triggerEvent(table, { type: MOUSE_LEAVE });

        equal(mock.destroy.callCount, 0);
        notEqual(editor.columnResizing, null);
    });

    test("leaving a table should not destroy table resizing if resizing is in progress", function() {
        var table = $(editor.body).find("#table")[0];
        var columnResizing = editor.columnResizing = new ColumnResizing(table, {});
        editor.columnResizing.resizingInProgress = function() { return false; };
        var mock = editor.columnResizing;
        trackMethodCall(mock, "destroy");

        triggerEvent(table, { type: MOUSE_LEAVE });

        equal(editor.columnResizing.destroy.callCount, 0);
    });

    editor_module("editor column resizing nested table initialization", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.columnResizing = null;
            tableElement = $(NESTED_TABLE_HTML).appendTo(editor.body)[0];
            nestedTable = $(tableElement).find("#nestedTable")[0];
            nestedTableCell = $(nestedTable).find(FIRST_COLUMN);
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.columnResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a nested table should stop event propagation", function() {
        var enterEvent = $.Event({ type: MOUSE_ENTER });
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        $(nestedTable).trigger(enterEvent);

        equal(enterEvent.isPropagationStopped(), true);
    });

    test("hovering a nested table should init new table resizing", function() {
        editor.columnResizing = new ColumnResizing(tableElement, {});
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        ok(editor.columnResizing instanceof kendo.ui.editor.ColumnResizing);
        equal(editor.columnResizing.element, nestedTable);
    });

    test("hovering a nested table should destroy current table resizing", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.columnResizing, "destroy");

        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("leaving a nested table should stop event propagation", function() {
        var nestedTable = $(tableElement).find("#nestedTable")[0];
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        $(nestedTable).trigger(leaveEvent);

        equal(leaveEvent.isPropagationStopped(), true);
    });

    test("leaving a nested table should init new table resizing with parent table", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        triggerEvent(nestedTable, { type: MOUSE_LEAVE });

        ok(editor.columnResizing instanceof kendo.ui.editor.ColumnResizing);
        equal(editor.columnResizing.element, tableElement);
    });

    test("leaving a nested table should not init new row resizing when leaving a column", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        triggerEvent(nestedTableCell, { type: MOUSE_LEAVE });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, nestedTable);
    });

    editor_module("editor column resizing initialization resizing in progress", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.columnResizing = null;
            tableElement = $(TABLE_HTML).appendTo(editor.body)[0];
            anotherTable = $(TABLE_HTML).attr("id", "table2").appendTo(editor.body)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.columnResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering another table while resizing is in progress should not destroy current column resizing", function() {
        var enterEvent = $.Event({ type: MOUSE_ENTER });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.columnResizing, "destroy");
        editor.columnResizing.resizingInProgress = function() { return true; };

        $(anotherTable).trigger(enterEvent);

        equal(destroySpy.calls("destroy"), 0);
    });

    test("hovering another table while resizing is not in progress should destroy current column resizing", function() {
        var enterEvent = $.Event({ type: MOUSE_ENTER });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.columnResizing, "destroy");
        editor.columnResizing.resizingInProgress = function() { return false; };

        $(anotherTable).trigger(enterEvent);

        equal(destroySpy.calls("destroy"), 1);
    });

    editor_module("editor column resizing leaving editor content", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.columnResizing = null;
            tableElement = $(TABLE_HTML).appendTo(editor.body)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.columnResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not destroy column resizing if resizing is in progress", function() {
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.columnResizing, "destroy");
        editor.columnResizing.resizingInProgress = function() { return true; };

        $(editor.body).trigger(leaveEvent);

        equal(destroySpy.calls("destroy"), 0);
    });

    test("should destroy column resizing if resizing is not in progress", function() {
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.columnResizing, "destroy");
        editor.columnResizing.resizingInProgress = function() { return false; };

        $(editor.body).trigger(leaveEvent);

        equal(destroySpy.calls("destroy"), 1);
    });
})();