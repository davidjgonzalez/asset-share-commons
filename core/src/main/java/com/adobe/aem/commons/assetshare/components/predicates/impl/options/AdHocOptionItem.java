package com.adobe.aem.commons.assetshare.components.predicates.impl.options;

import com.adobe.cq.wcm.core.components.models.form.OptionItem;

public class AdHocOptionItem implements OptionItem {
    private final String value;
    private final String text;
    private final boolean disabled;
    private final boolean selected;

    public AdHocOptionItem(String text, String value) {
        this(text, value, false, false);
    }

    public AdHocOptionItem(String text, String value, boolean disabled, boolean selected) {
        this.text = text;
        this.value = value;
        this.disabled = disabled;
        this.selected = selected;
    }

    @Override
    public boolean isSelected() {
        return false;
    }

    @Override
    public boolean isDisabled() {
        return false;
    }

    @Override
    public String getValue() {
        return value;
    }

    @Override
    public String getText() {
        return text;
    }
}