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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import com.adobe.aem.commons.assetshare.components.predicates.AbstractPredicate;
import com.adobe.aem.commons.assetshare.components.predicates.SortPredicate;
import com.adobe.aem.commons.assetshare.components.options.OptionItem;
import com.adobe.aem.commons.assetshare.components.options.Options;
import com.adobe.aem.commons.assetshare.components.options.impl.SortOptionItem;
import com.adobe.aem.commons.assetshare.components.search.SearchConfig;
import com.adobe.aem.commons.assetshare.util.PredicateUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.search.Predicate;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {SortPredicate.class, ComponentExporter.class},
        resourceType = {SortPredicateImpl.RESOURCE_TYPE}
)
@Exporter(
    name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class SortPredicateImpl extends AbstractPredicate implements SortPredicate {
    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/sort";

    private static final String NN_ITEMS = "items";
    private static final String PN_TEXT = "text";
    private static final String PN_ORDER_BY_CASE = "orderByCase";

    protected ValueMap valuesFromRequest = null;

    private static final String UNKNOWN_SORT_BY = "Default";

    private List<OptionItem> items;

    @Self
    @Required
    private SlingHttpServletRequest request;

    @Self
    private Options options;

    @Self
    @Optional
    private SearchConfig searchConfig;

    @ValueMapValue
    @Default(values = UNKNOWN_SORT_BY)
    private String unknownSortBy;

    @ValueMapValue
    @Default(values = "ASC")
    private String ascendingLabel;

    @ValueMapValue
    @Default(values = "DESC")
    private String descendingLabel;

    @Override
    public List<OptionItem> getItems() {

        if (items == null) {
            ArrayList<SortOptionItem> sortOptionItems = new ArrayList<>();

            Resource childItem = request.getResource().getChild(NN_ITEMS);
            if (childItem != null) {
                childItem.getChildren().forEach(r -> {

                    ValueMap properties = r.getValueMap();
                    SortOptionItem sortOptionItem = new SortOptionItem(properties.get(PN_TEXT, String.class),
                            properties.get("value", String.class), properties.get(PN_ORDER_BY_CASE, true));
                    sortOptionItems.add(sortOptionItem);

                });
            }

            final ValueMap initialValues = getInitialValues();

            this.items = sortOptionItems.stream().map(sortOptionItem -> {
                final boolean selected = PredicateUtil.isOptionInInitialValues(sortOptionItem.getValue(), initialValues);

                sortOptionItem.setSelected(selected);

                return sortOptionItem;
            }).collect(Collectors.toList());
        }

        return items;
    }

    @Override
    public String getOrderByLabel() {
        String label = unknownSortBy;
        for (final OptionItem optionItem : getItems()) {
            if (optionItem instanceof SortOptionItem) {
                SortOptionItem sortOptionItem = (SortOptionItem) optionItem;
                if (sortOptionItem.isSelected()) {
                    label = sortOptionItem.getText();
                    break;
                }
            }
        }

        return label;
    }

    @Override
    public String getOrderBySortLabel() {
        if (isAscending()) {
            return ascendingLabel;
        } else {
            return descendingLabel;
        }
    }

    @Override
    public String getAscendingLabel() {
        return ascendingLabel;
    }

    @Override
    public String getDescendingLabel() {
        return descendingLabel;
    }

    @Override
    public boolean isAscending() {
        final String orderBySort = getInitialValues().get(Predicate.PARAM_SORT, String.class);
        return Predicate.SORT_ASCENDING.equalsIgnoreCase(orderBySort);
    }

    @Override
    public String getName() {
        return "orderby";
    }

    @Override
    public boolean isReady() {
        return searchConfig != null && !getItems().isEmpty();
    }

    @Override
    public ValueMap getInitialValues() {
        if (valuesFromRequest == null) {
            valuesFromRequest = new ValueMapDecorator(new HashMap<>());

            String orderBy = PredicateUtil.getParamFromQueryParams(request, Predicate.ORDER_BY);
            if (StringUtils.isBlank(orderBy)) {
                orderBy = searchConfig.getOrderBy();
            }
            valuesFromRequest.put(Predicate.ORDER_BY, orderBy);

            calculateOrderParameter(Predicate.PARAM_SORT, searchConfig.getOrderBySort());

            calculateOrderParameter(Predicate.PARAM_CASE, searchConfig.isOrderByCase() ? "" : Predicate.IGNORE_CASE);
        }

        return valuesFromRequest;
    }

    private void calculateOrderParameter(String paramCase, String paramValue) {
        String orderParam = PredicateUtil.getParamFromQueryParams(request, Predicate.ORDER_BY + "." + paramCase);
        if (StringUtils.isBlank(orderParam)) {
            orderParam = paramValue;
        }
        valuesFromRequest.put(paramCase, orderParam);
    }

    @Override
    public String getExportedType() {
        return null;
    }
}