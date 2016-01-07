﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

 <%
     var custom = (string)ViewBag.Direction;
     string[] words = custom.Split(new []{" "}, StringSplitOptions.RemoveEmptyEntries);
     if (words.Length == 1)
     {
         custom = "top left";
     }
 %>

<div class="demo-section k-content">
    <%= Html.Kendo().Menu()
          .Name("Menu")
          .Items(items =>
          {
              items.Add()
                  .Text("Men's")
                  .Items(children =>
                   {
                       children.Add().Text("Footwear")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("Leisure Trainers");
                                   innerChildren.Add().Text("Running Shoes");
                                   innerChildren.Add().Text("Outdoor Footwear");
                                   innerChildren.Add().Text("Sandals/Flip Flops");
                                   innerChildren.Add().Text("Footwear Accessories");
                               });

                       children.Add().Text("Leisure Clothing")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("T-Shirts");
                                   innerChildren.Add().Text("Hoodies & Sweatshirts");
                                   innerChildren.Add().Text("Jackets");
                                   innerChildren.Add().Text("Pants");
                                   innerChildren.Add().Text("Shorts");
                               });

                       children.Add().Text("Sports Clothing")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("Football");
                                   innerChildren.Add().Text("Basketball");
                                   innerChildren.Add().Text("Golf");
                                   innerChildren.Add().Text("Tennis");
                                   innerChildren.Add().Text("Swimwear");
                               });

                       children.Add().Text("Accessories");
                   });

              items.Add().Text("Women's")
                   .Items(children =>
                   {
                       children.Add().Text("Footwear")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("Leisure Trainers");
                                   innerChildren.Add().Text("Running Shoes");
                                   innerChildren.Add().Text("Outdoor Footwear");
                                   innerChildren.Add().Text("Sandals/Flip Flops");
                                   innerChildren.Add().Text("Footwear Accessories");
                               });

                       children.Add().Text("Leisure Clothing")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("T-Shirts");
                                   innerChildren.Add().Text("Jackets");
                               });

                       children.Add().Text("Sports Clothing")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("Basketball");
                                   innerChildren.Add().Text("Golf");
                                   innerChildren.Add().Text("Tennis");
                                   innerChildren.Add().Text("Swimwear");
                               });

                       children.Add().Text("Accessories");
                   });

              items.Add()
                  .Text("Boy's")
                  .Items(children =>
                  {
                      children.Add().Text("Footwear")
                              .Items(innerChildren =>
                              {
                                  innerChildren.Add().Text("Leisure Trainers");
                                  innerChildren.Add().Text("Running Shoes");
                                  innerChildren.Add().Text("Outdoor Footwear");
                                  innerChildren.Add().Text("Sandals/Flip Flops");
                                  innerChildren.Add().Text("Footwear Accessories");
                              });

                      children.Add().Text("Leisure Clothing")
                              .Items(innerChildren =>
                              {
                                  innerChildren.Add().Text("T-Shirts");
                                  innerChildren.Add().Text("Hoodies & Sweatshirts");
                                  innerChildren.Add().Text("Jackets");
                                  innerChildren.Add().Text("Pants");
                                  innerChildren.Add().Text("Shorts");
                              });

                      children.Add().Text("Sports Clothing")
                              .Items(innerChildren =>
                              {
                                  innerChildren.Add().Text("Football");
                                  innerChildren.Add().Text("Basketball");
                                  innerChildren.Add().Text("Golf");
                                  innerChildren.Add().Text("Tennis");
                                  innerChildren.Add().Text("Swimwear");
                              });

                      children.Add().Text("Accessories");
                  });

              items.Add().Text("Girl's")
                   .Items(children =>
                   {
                       children.Add().Text("Footwear")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("Leisure Trainers");
                                   innerChildren.Add().Text("Running Shoes");
                                   innerChildren.Add().Text("Outdoor Footwear");
                                   innerChildren.Add().Text("Sandals/Flip Flops");
                                   innerChildren.Add().Text("Footwear Accessories");
                               });

                       children.Add().Text("Leisure Clothing")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("T-Shirts");
                                   innerChildren.Add().Text("Jackets");
                               });

                       children.Add().Text("Sports Clothing")
                               .Items(innerChildren =>
                               {
                                   innerChildren.Add().Text("Basketball");
                                   innerChildren.Add().Text("Golf");
                                   innerChildren.Add().Text("Tennis");
                                   innerChildren.Add().Text("Swimwear");
                               });

                       children.Add().Text("Accessories");
                   });
          })
          .Direction(ViewBag.Direction)
    %>
 </div>
<% using (Html.BeginForm("Direction", "Menu", FormMethod.Post))
  {%>
  <div class="box">
    <h4>Animation Settings</h4>
    <ul class="options">
        <li>
            <%= Html.RadioButton("direction", "bottom") %>
            <%= Html.Label("default", "default / bottom") %>            
        </li>
        <li>
            <%= Html.RadioButton("direction", "left") %>
            <%= Html.Label("left", "left") %>
        </li>
        <li>
            <%= Html.RadioButton("direction", "right") %>
            <%= Html.Label("right", "right") %>            
        </li>
          <li>
            <%= Html.RadioButton("direction", "top") %>
            <%= Html.Label("top", "top") %>            
        </li>
         <li>
            <%= Html.RadioButton("direction", custom, new { @id ="custom" })%>
            <%= Html.Label("custom", "custom") %>
            <%= Html.TextBox("customValue", custom, new { @class = "k-textbox" }) %>
            

        </li>
    </ul>

    <input type="hidden" id="directionString" name="directionString" />
    <button class="k-button" onclick="clicked()">Apply</button>
  </div>
  <% }
%>
<script type="text/javascript">
    function clicked() {
        $("#directionString").val(getDirection());
    }

    var getDirection = function () {
        var checked = $("input[type=radio]:checked")[0];
        if (checked.id == "custom") {
            return $("#customValue").val();
        }
        return checked.value;
    };
</script>
</asp:Content>
