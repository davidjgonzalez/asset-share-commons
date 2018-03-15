/*
 * Asset Share Commons
 *
 * Copyright (C) 2017 Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.adobe.aem.commons.assetshare.components.predicates.impl;

import com.adobe.aem.commons.assetshare.components.predicates.AbstractPredicate;
import com.adobe.aem.commons.assetshare.components.predicates.SortPredicate;
import com.adobe.aem.commons.assetshare.components.predicates.impl.options.AdHocOptionItem;
import com.adobe.aem.commons.assetshare.components.predicates.impl.options.SelectedOptionItem;
import com.adobe.aem.commons.assetshare.components.search.SearchConfig;
import com.adobe.aem.commons.assetshare.util.PredicateUtil;
import com.adobe.cq.commerce.common.ValueMapDecorator;
import com.adobe.cq.wcm.core.components.models.form.OptionItem;
import com.adobe.cq.wcm.core.components.models.form.Options;
import com.day.cq.search.Predicate;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {SortPredicate.class},
        resourceType = {SortPredicateImpl.RESOURCE_TYPE}
)
public class SortPredicateImpl extends AbstractPredicate implements SortPredicate {
    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/sort";

    protected ValueMap valuesFromRequest = null;

    @Self
    @Required
    private SlingHttpServletRequest request;

    @Self
    @Required
    private Options coreOptions;

    @Self
    private SearchConfig searchConfig;

    @ValueMapValue
    @Default(values = "Ascending")
    private String ascendingLabel;

    @ValueMapValue
    @Default(values = "Descending")
    private String descendingLabel;

    @PostConstruct
    protected void init() {
        initPredicate(request, coreOptions);
    }

    @Override
    @Deprecated
    public List<OptionItem> getItems() {
        return getSortByItems();
    }

    @Override
    public List<OptionItem> getSortByItems() {
        final ValueMap initialValues = getInitialValues();
        final List<OptionItem> processedOptionItems = new ArrayList<>();

        for (final OptionItem optionItem : coreOptions.getItems()) {
            if (StringUtils.equals(optionItem.getValue(), initialValues.get(Predicate.ORDER_BY, String.class))) {
                processedOptionItems.add(new SelectedOptionItem(optionItem));
            } else {
                processedOptionItems.add(optionItem);
            }
        }

        return processedOptionItems;
    }

    @Override
    public List<OptionItem> getSortByDirectionItems() {
        final ValueMap initialValues = getInitialValues();
        final List<OptionItem> processedOptionItems = new ArrayList<>();

        // Ascending
        processedOptionItems.add(new AdHocOptionItem(ascendingLabel, Predicate.SORT_ASCENDING, false,
                Predicate.SORT_ASCENDING.equals(initialValues.get(Predicate.PARAM_SORT, String.class))));

        // Descending
        processedOptionItems.add(new AdHocOptionItem(descendingLabel, Predicate.SORT_DESCENDING, false,
                Predicate.SORT_DESCENDING.equals(initialValues.get(Predicate.PARAM_SORT, String.class))));

        return processedOptionItems;
    }

    @Override
    public String getName() {
        return "orderby";
    }

    @Override
    public boolean isReady() {
        return getSortByItems().size() > 0;
    }

    @Override
    public ValueMap getInitialValues() {
        if (valuesFromRequest == null) {
            valuesFromRequest = new ValueMapDecorator(new HashMap<>());

            final String orderBy = PredicateUtil.getParamFromQueryParams(request, Predicate.ORDER_BY);
            if (StringUtils.isNotBlank(orderBy)) {
                valuesFromRequest.put(Predicate.ORDER_BY, orderBy);
            } else {
                // When unavailable in query params; use the Search Results component configuration.
                valuesFromRequest.put(Predicate.ORDER_BY, searchConfig.getOrderBy());
            }

            final String orderBySort = PredicateUtil.getParamFromQueryParams(request, Predicate.PARAM_SORT);
            if (StringUtils.isNotBlank(orderBySort)) {
                valuesFromRequest.put(Predicate.PARAM_SORT, orderBySort);
            } else {
                // When unavailable in the query params; use the Search Results component configurations.
                valuesFromRequest.put(Predicate.PARAM_SORT, searchConfig.getOrderBySort());
            }
        }

        return valuesFromRequest;
    }
}
