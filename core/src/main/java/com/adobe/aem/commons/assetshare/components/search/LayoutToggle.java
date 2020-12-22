package com.adobe.aem.commons.assetshare.components.search;

import com.adobe.aem.commons.assetshare.components.Component;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface LayoutToggle extends Component {
    boolean isShowLabels();
    
    boolean isCardLabel();

    boolean isListLabel();

    boolean isReady();
}
