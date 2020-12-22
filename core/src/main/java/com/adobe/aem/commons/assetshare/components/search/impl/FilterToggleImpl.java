package com.adobe.aem.commons.assetshare.components.search.impl;

import com.adobe.aem.commons.assetshare.components.search.FilterToggle;
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
        adapters = {FilterToggle.class, ComponentExporter.class},
        resourceType = {FilterToggleImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(
    name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class FilterToggleImpl implements FilterToggle {
    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/filter-toggle";

    @ValueMapValue
    @Default(booleanValues = false)
    private boolean hideLabels;

    @ValueMapValue
    @Default(booleanValues = false)
    private boolean hideApplyFilterToggle;

    @ValueMapValue
    private String applyFilterLabel;

    @ValueMapValue
    private String resetFilterLabel;

    @Override
    public boolean isHideLabels() {
        return hideLabels;
    }

    @Override
    public boolean isHideApplyFilterToggle() {
        return hideApplyFilterToggle;
    }

    @Override
    public String getApplyFilterLabel() {
        return applyFilterLabel;
    }

    @Override
    public String getResetFilterLabel() {
        return resetFilterLabel;
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
