
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorCategoryAxisItemNotesDataTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        data = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> data;

    public List<Map<String, Object>> data() {
        return data;
    }

    public static String tagName() {
        return "stockChart-navigator-categoryAxisItem-notes-data";
    }

    public void addDataItem(NavigatorCategoryAxisItemNotesDataItemTag value) {
        data.add(value.properties());
    }

//<< Attributes

}