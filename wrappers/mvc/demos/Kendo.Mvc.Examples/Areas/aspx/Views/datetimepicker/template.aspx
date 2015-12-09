<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section k-content">
    <h4>Birthday Calendar</h4>
    <%= Html.Kendo().DateTimePicker()
          .Name("datetimepicker")
          .HtmlAttributes(new { style = "width:100%;" })
          .Value(DateTime.Now)
          .Events(e => e.Open("onOpen"))
          .Footer("Today - #=kendo.toString(data, 'd') #")
          .MonthTemplate("# if ($.inArray(+data.date, birthdays) != -1) { #" +
                             "<div class=\"birthday\"></div>" +
                         "# } #" +
                         "#= data.value #")
    %>
</div>
<script>
    var today = new Date(),
        birthdays = [
            +new Date(today.getFullYear(), today.getMonth(), 11),
            +new Date(today.getFullYear(), today.getMonth() + 1, 6),
            +new Date(today.getFullYear(), today.getMonth() + 1, 27),
            +new Date(today.getFullYear(), today.getMonth() - 1, 3),
            +new Date(today.getFullYear(), today.getMonth() - 2, 22)
        ];
</script>
<script>
    function onOpen() {
        var dateViewCalendar = this.dateView.calendar;
        if (dateViewCalendar) {
            dateViewCalendar.element.width(300);
        }
    };
</script>

<style>
    .birthday {
        background: transparent url('<%= Url.Content("~/Content/web/calendar/cake.png") %>') no-repeat 0 50%;
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
    }
</style>
</asp:Content>