package com.adobe.aem.commons.assetshare.components.search.impl;

import com.adobe.aem.commons.assetshare.components.search.LayoutToggle;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;


@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {LayoutToggle.class, ComponentExporter.class},
        resourceType = {LayoutToggleImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(
    name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class LayoutToggleImpl implements LayoutToggle {
    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/layout-toggle";

    @ValueMapValue
    @Default(booleanValues = false)
    private boolean showLabels;

    @ValueMapValue
    @Default
    private boolean cardLabel;

    @ValueMapValue
    @Default
    private boolean listLabel;

    public boolean isShowLabels() {
        return showLabels;
    }
    
    public boolean isCardLabel() {
        return cardLabel;
    }

    public boolean isListLabel() {
        return listLabel;
    }

    @Override
    public boolean isReady() {
        return true;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
