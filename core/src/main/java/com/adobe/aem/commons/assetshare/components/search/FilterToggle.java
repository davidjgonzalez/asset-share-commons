package com.adobe.aem.commons.assetshare.components.search;

import com.adobe.aem.commons.assetshare.components.Component;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface FilterToggle extends Component {

    public boolean isHideLabels();

    public boolean isHideApplyFilterToggle();

    public String getApplyFilterLabel();

    public String getResetFilterLabel();
}
