using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring EditorFileBrowserSchemaModelFieldsSizeSettings
    /// </summary>
    public partial class EditorFileBrowserSchemaModelFieldsSizeSettingsBuilder
        
    {
        /// <summary>
        /// The name of the field.
        /// </summary>
        /// <param name="value">The value for Field</param>
        public EditorFileBrowserSchemaModelFieldsSizeSettingsBuilder Field(string value)
        {
            Container.Field = value;
            return this;
        }

        /// <summary>
        /// Specifies the function which will parse the field value. If not set default parsers will be used.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public EditorFileBrowserSchemaModelFieldsSizeSettingsBuilder Parse(string handler)
        {
            Container.Parse = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// Specifies the function which will parse the field value. If not set default parsers will be used.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public EditorFileBrowserSchemaModelFieldsSizeSettingsBuilder Parse(Func<object, object> handler)
        {
            Container.Parse = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
    }
}
