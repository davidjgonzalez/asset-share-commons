package com.adobe.aem.commons.assetshare.util.impl;


import com.adobe.aem.commons.assetshare.components.search.impl.SearchConfigImpl;
import com.adobe.aem.commons.assetshare.util.ResourceTypeVisitor;
import com.adobe.granite.resourcestatus.ResourceStatus;
import com.adobe.granite.resourcestatus.ResourceStatusProvider;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.commons.status.EditorResourceStatus;
import org.apache.sling.api.resource.Resource;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Component(service = {ResourceStatusProvider.class})
public class SearchPageConfigurationResourceStatusProvider implements ResourceStatusProvider {
    private static final Logger log = LoggerFactory.getLogger(SearchPageConfigurationResourceStatusProvider.class);

    /**
     * This provider type value is mapped to the Status resource @statusTypes (editor, template-editor) via the
     */
    private static final String STATUS_PROVIDER_TYPE = "asset-share-commmons__search-page-configuration-resource-status";

    public String getType() {
        return STATUS_PROVIDER_TYPE;
    }

    public List<ResourceStatus> getStatuses(final Resource resource) {

        if (!accepts(resource)) {
            return Collections.EMPTY_LIST;
        }

        final List<ResourceStatus> resourceStatuses = new LinkedList<ResourceStatus>();

        EditorResourceStatus.Builder builder = new EditorResourceStatus.Builder(
                getType(),
                "Missing Search Results Component",
                "A Search Results component is required on this page.");

        builder.setVariant(EditorResourceStatus.Variant.WARNING);
        builder.setIcon("beaker");
        // warning -> 200000
        builder.setPriority(200000);

        builder.addData("shortMessage", "Missing Search Results component");
        resourceStatuses.add(builder.build());

        return resourceStatuses;
    }

    /**
     * A method to check if the resource has a status to report by this provider.
     *
     * @param resource a resource that is part of the page that is to be checked.
     * @return true if this resource's page is a candidate for the status.
     */
    private boolean accepts(Resource resource) {
        final PageManager pageManager = resource.getResourceResolver().adaptTo(PageManager.class);
        final Page page = pageManager.getContainingPage(resource);

        if (!page.getContentResource().isResourceType("asset-share-commons/components/structure/search-page")) {
            return false;
        }

        final ResourceTypeVisitor visitor = new ResourceTypeVisitor(new String[]{SearchConfigImpl.RESOURCE_TYPE});
        visitor.accept(page.getContentResource());

        return visitor.getResources().size() == 0;
    }
}
