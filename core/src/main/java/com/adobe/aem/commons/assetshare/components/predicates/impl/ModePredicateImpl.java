package com.adobe.aem.commons.assetshare.components.predicates.impl;

import com.adobe.aem.commons.assetshare.components.predicates.AbstractPredicate;
import com.adobe.aem.commons.assetshare.components.predicates.ModePredicate;
import com.adobe.aem.commons.assetshare.components.predicates.impl.options.AdHocOptionItem;
import com.adobe.aem.commons.assetshare.components.predicates.impl.options.SelectedOptionItem;
import com.adobe.aem.commons.assetshare.components.search.SearchConfig;
import com.adobe.aem.commons.assetshare.search.providers.SearchProvider;
import com.adobe.aem.commons.assetshare.search.providers.impl.BrowseSearchProviderImpl;
import com.adobe.aem.commons.assetshare.search.providers.impl.QuerySearchProviderImpl;
import com.adobe.cq.commerce.common.ValueMapDecorator;
import com.adobe.cq.wcm.core.components.models.form.OptionItem;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.adobe.cq.wcm.core.components.models.form.Options;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {ModePredicate.class},
        resourceType = {ModePredicateImpl.RESOURCE_TYPE}
)
public class ModePredicateImpl extends AbstractPredicate implements ModePredicate, Options {

    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/mode-toggle";

    private String valueFromRequest = null;
    private ValueMap valuesFromRequest;

    @Self
    private SlingHttpServletRequest request;

    @Self
    private SearchConfig searchConfig;

    @ValueMapValue
    @Default(values = "Search")
    private String searchLabel;

    @ValueMapValue
    @Default(values = "Browse")
    private String browseLabel;

    public final List<OptionItem> getItems() {
        final List<OptionItem> items = new ArrayList<>();

        // Search
        items.add(new AdHocOptionItem(searchLabel,
                QuerySearchProviderImpl.ID,
                false,
                QuerySearchProviderImpl.ID.equals(getInitialValue())));

        // Browse
        items.add(new AdHocOptionItem(browseLabel,
                BrowseSearchProviderImpl.ID,
                false,
                BrowseSearchProviderImpl.ID.equals(getInitialValue())));

        return items;
    }

    /* Property Predicate Specific */

    @Override
    public String getName() {
        return SearchProvider.SEARCH_PROVIDER_ID;
    }

    @Override
    public boolean isReady() {
        return true;
    }

    @Override
    public String getInitialValue() {
        if (valueFromRequest == null) {
            valueFromRequest = StringUtils.defaultIfEmpty(request.getParameter(SearchProvider.SEARCH_PROVIDER_ID), searchConfig.getSearchProviderId());
        }

        return valueFromRequest;
    }

    @Override
    public ValueMap getInitialValues() {
        if (valuesFromRequest == null) {
            valuesFromRequest = new ValueMapDecorator(new HashMap<>());
            valuesFromRequest.put(getName(), getInitialValue());
        }

        return valuesFromRequest;
    }
}
